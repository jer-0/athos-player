<script lang="ts">
	import type VideoAtr from '$types/video'
	import type HlsType from 'hls.js'

	export let videoSrc: string
	export let posterUrl: string | null = null
	export let prerollUrl: string | null = null
	export let playAd: boolean = true
	export let controlsType: 'minimal' | 'desktop' | 'mobile' = 'desktop'
	export let videoMode: VideoMode = 'active'

	import { onMount, onDestroy } from 'svelte'
	import { isSupported as isMediaSourceSupported } from 'hls.js/src/is-supported'

	// components 
	import Vast from './vast/Vast.svelte'
	import Video from './comps/Video/Video.svelte'
	import PlayerContainer from './_PlayerContainer.svelte'
	import ProgressBar from './comps/ProgressBar/ProgressBar.svelte'
	import DesktopControls from './controls/Desktop/Desktop.svelte'
	import MobileControls from './controls/Mobile/Mobile.svelte'
	import ShortControls from './controls/Minimal/Shorts.svelte'
	import Fullscreen from './comps/Fullscreen/Fullscreen.svelte'
	import CenterSpinner from './comps/Loading/CenterSpinner.svelte'
	import ThumbnailOverlay from './comps/ThumbnailOverlay/ThumbnailOverlay.svelte'

	// stores
	import Hls from './store/Hls' 
	import hlsSupport from './store/hlsSupport'

	let initPlay: boolean = true
	let mounted: boolean

	// player container binds
	let athosPlayer: HTMLElement
	let pointerType: PointerType

	// video element binds
	let videoElement: HTMLVideoElement
	let video: Video
	let paused: VideoAtr.Paused = true
	let duration: VideoAtr.Duration
	let currentTime: VideoAtr.CurrentTime
	let muted: VideoAtr.Muted
	let metadataLoaded: VideoAtr.MetadataLoaded
	let buffering: VideoAtr.Buffering
	let toPause: boolean
	export let loop: VideoAtr.Loop = false
	export let autoplay: VideoAtr.Autoplay = false

	let attached: boolean

	// controls binds
	let isControlsVisable: boolean

	// progress bar binds
	let progressBar: ProgressBar
	let isScrubbing: boolean
	let formattedCurrentTime = '00:00'

	// fullscreen binds
	let fullscreen: Fullscreen

	// vast binds
	let vast: Vast
	
	// controls bind
	let controls: DesktopControls | MobileControls | ShortControls

	// Hls
	// let Hls
	let hls: HlsType | undefined
	let nativeHlsSupport = false
	let mediaSourceSupport = false

	function reset() {
		paused = true
		initPlay = true
		currentTime = 0 
		if (progressBar) {
			progressBar.reset()
		} 
	}

	function toggleFullscreen() {
		fullscreen.toggleFullscreen()
	}

	// Events
	function onPlay() {
		if (initPlay) {
			if (playAd) vast.loadAd()
		}
		initPlay = false
	}

	// Vast
	function onAdReady() {
		video.pauseVideo()
		vast.playAd()
	}

	function onAdFinish() {
		video.playVideo()
	}

	function attachHlsSrc() {
		if (hls) {
			videoElement.pause()
			hls.detachMedia()
			hls.destroy()
		} 

		hls = new $Hls()

		hls.loadSource(videoSrc)
		hls.on($Hls.Events.MANIFEST_PARSED, () => {
			hls?.attachMedia(videoElement)
		})
		hls.on($Hls.Events.MEDIA_ATTACHED, () => {
			attached = true
		})
	}

	$: if (videoSrc && mounted && videoElement) {
		attached = false
		if (mediaSourceSupport) {
			attachHlsSrc()
		} else if (nativeHlsSupport) {
			attached = true
		}
		reset()
	}

	onMount(async () => {
		if (!$hlsSupport.mediaSourceSupport && !$hlsSupport.nativeHlsSupport) {
			if (isMediaSourceSupported()) {
				hlsSupport.set({
					nativeHlsSupport: false,
					mediaSourceSupport: true
				})
				await Hls.initialize()

			// } else if (nativeHlsTestVideoElement.canPlayType('application/vnd.apple.mpegurl')) {
			} else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
				hlsSupport.set({
					nativeHlsSupport: true,
					mediaSourceSupport: false
				})
			}  else {
				console.log('MediaSource nor native hls support found.')
			}
		}

		if ($hlsSupport.mediaSourceSupport) {
			mediaSourceSupport = true
		} else if ($hlsSupport.nativeHlsSupport) {
			nativeHlsSupport = true
		}
		mounted = true
	})

	onDestroy(() => {
		if(mediaSourceSupport) {
			hls?.destroy()
		}
	})
</script>

<PlayerContainer 
	bind:athosPlayer={athosPlayer}
	bind:pointerType
>   
	<div slot="video" class="html5-video-container">
		<Video
			{autoplay}
			{attached}
			{videoMode}
			src={videoSrc}
			bind:this={video}
			bind:videoElement
			bind:paused
			bind:duration
			bind:currentTime
			bind:muted
			bind:metadataLoaded
			bind:buffering
			bind:toPause
			bind:loop
			on:play={onPlay}
		/>
	</div>

	<CenterSpinner class="plrd-center-spinner" active={buffering || !attached}/>

	{#if posterUrl}
		<ThumbnailOverlay visable={initPlay} posterUrl={posterUrl}/>
	{/if}

	{#if videoElement && attached}

		{#if controlsType === 'desktop'}
			<DesktopControls
				{paused}
				{toPause}
				{muted}
				{duration}
				{isScrubbing}
				{formattedCurrentTime}
				bind:this={controls}
				bind:isControlsVisable
				on:togglePlay={video.togglePlay}
				on:toggleMute={video.toggleMute}
				on:adjustVolume={video.adjustVolume}
				on:toggleFullscreen={toggleFullscreen}
			>
				<ProgressBar
					slot="progress-bar"
					mode={'desktop'}
					{videoElement}
					{duration} 
					{paused}
					{toPause}
					{isControlsVisable}
					{pointerType}
					scrubberAlwaysOn={pointerType === 'touch'}
					bind:this={progressBar}
					bind:isScrubbing
					bind:formattedCurrentTime
					on:play={video.playVideo}
					on:pause={video.pauseVideo}
				/>
			</DesktopControls>

		{:else if controlsType === 'mobile'}

		<MobileControls
			{paused}
			{toPause}
			{muted}
			{duration}
			{formattedCurrentTime}
			bind:this={controls}
			bind:controlsVisable = {isControlsVisable}
			on:togglePlay={video.togglePlay}
			on:toggleMute={video.toggleMute}
			on:toggleFullscreen={toggleFullscreen}
		>
			<ProgressBar
				slot="progress-bar"
				mode={'mobile'}
				{videoElement}
				{duration} 
				{paused}
				{toPause}
				{isControlsVisable}
				{pointerType}
				scrubberAlwaysOn={true}
				bind:this={progressBar}
				bind:isScrubbing
				bind:formattedCurrentTime
				on:play={video.playVideo}
				on:pause={video.pauseVideo}
				/>
		</MobileControls>

		{:else if controlsType === 'minimal'}
			<ShortControls
				{paused}
				{toPause}
				{buffering}
				bind:isControlsVisable
				on:togglePlay={video.togglePlay}
				on:pause={video.pauseVideo}
			>
			</ShortControls>
		{/if}

	{/if}

	<Vast 
		adUrl={prerollUrl}
		bind:this={vast}
		on:adReady={onAdReady}
		on:adFinish={onAdFinish}
	/>
</PlayerContainer>

{#if videoElement && metadataLoaded}
	<Fullscreen bind:this={fullscreen} playerWrapper={athosPlayer} {videoElement} />
{/if}

<style lang="scss" global>
	@use './scss/globals';
	@use './scss/vars' as var;

	.html5-video-container {
		display: block;
		width: 100%;
		height: 100%;
	}
	.native-hls-test-video {
		display: none;
	}
	// :global(.plr-center-spinner.plrd-center-spinner) {
	//     z-index: map-get(var.$z-index, "plrd-center-spinner")
	// }
</style>