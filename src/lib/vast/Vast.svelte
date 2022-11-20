<script>
	export let adUrl
	let toPlayAd

	import { onMount, createEventDispatcher } from 'svelte'
	import Player from './Player/VastPlayer.svelte'

	const dispatch = createEventDispatcher()

	let VASTClient
	let VASTTracker

	let vastClient
	let vastTracker

	onMount( async () => {
		const module = await import('@dailymotion/vast-client')
		VASTClient = module.VASTClient
		VASTTracker = module.VASTTracker
		vastClient = new VASTClient()
	})

	// Ad definition  
	let ad
	let creative
	let videoSrc
	let clickThroughURL
	let adParsed
	
	// send ad video is ready to be played
	function adReady() {
		dispatch('adReady')
	}

	export async function loadAd() {
		await getParseXml(adUrl)

		if (ad && creative && videoSrc) {
			vastTracker = new VASTTracker(vastClient, ad, creative)
			adParsed = true
			adReady()
		} else {
			adParsed = false
		}
	}

	export async function playAd() {
		try {
			toPlayAd = true
		} catch (error) {
			console.log(error)
			destory()
		}
	}

	// reset vast ad 
	export function reset() {
		ad = false
		creative = false
		videoSrc = false
		clickThroughURL = false
		adParsed = false
		toPlayAd = false
	}
	// destory vast ad and send ad is finish
	function destory() {
		reset()
		dispatch('adFinish')
	}

	// Get and parse xml from url
	async function getParseXml(url) {
		try {
			const res = await vastClient.get(url)
			
			if (!res || !res.ads.length || !res.ads[0].creatives.length) {
				throw new Error('Seems there is no ad.')
			}
			else {
				ad = res.ads[0]
				creative = res.ads[0].creatives[0]
				videoSrc = res.ads[0].creatives[0].mediaFiles[0].fileURL
				clickThroughURL = res.ads[0].creatives[0].videoClickThroughURLTemplate.url
			}
		} catch (error) {
			console.log(error)
			destory()
		}
	}

	function clickthrough() {
		window.open(clickThroughURL, "_blank")
	}

	// Vast trackers
	// ---------------------
	// Track Play & pause
	function trackPlayPause(e) { // paused = true or false
		vastTracker.setPaused(e.detail.paused) 
	}
	// Track impression
	function trackImpression() {
		vastTracker.trackImpression()
	}
	// Track progress
	function trackProgress(e) {
		vastTracker.setProgress(e.detail.second);
	}
	function trackComplete(e) {
		vastTracker.complete()
	}
	// Track click
	function trackClick() {
		vastTracker.click()
	}
	// Track skip
	function trackSkip() {
		vastTracker.skip()
	}

	// Events
	function onSkip() {
		destory()
		trackSkip()
	}
	function onEnded() {
		destory()
		trackComplete()
	}
</script>

{#if adParsed}
	<plr-vast class:hide={!toPlayAd}>
		<Player 
			{videoSrc}
			{toPlayAd}
			on:skip={onSkip}
			on:ended={onEnded}
			on:trackPlay={trackPlayPause}
			on:trackPause={trackPlayPause}
			on:trackImpression={trackImpression}
			on:trackProgress={trackProgress}
			on:trackClick={trackClick}
			on:clickthrough={clickthrough}
			on:error={destory}
		/>
	</plr-vast>
{/if}

<style lang="scss">
	@use '../scss/vars' as var;
	plr-vast {
		display: block;
		position: absolute;
		background-color: #000;
		height: 100%;
		width: 100%;
		z-index: 3;
		// z-index: map-get(var.$z-index, "plr-vast")
	}
	.hide {
		display: none;
	}
</style>