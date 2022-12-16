<script type="ts">
	import type Video from '$types/video';
	import { tick } from 'svelte'
	import volume from '../../store/volume'

	export let src: Video.Src
	export let poster: Video.Poster | undefined
	export let videoElement: HTMLVideoElement
	export let paused: Video.Paused = true
	export let duration: Video.Duration = 0
	export let currentTime: Video.CurrentTime = 0
	export let muted: Video.Muted = false
	export let metadataLoaded: Video.MetadataLoaded = false
	export let buffering: Video.Buffering = false
	export let ended: Video.Ended = false
	export let loop: Video.Loop = false
	export let autoplay: Video.Autoplay = false
	export let attached: boolean = false
	export let videoMode: VideoMode
	export let objectFit: ObjectFit = 'contain'

	// $: playing = !paused && !ended && videoElement.readyState === 4
	$: playing = !paused && !ended

	$: if (videoElement && attached){
		if (videoMode === 'active') {
			if (autoplay) playVideo()
		} else {
			pauseVideo()
		}
	}

	export let toPause: boolean
	let canPause: boolean

	export async function playVideo() {
		try {
			toPause = false
			if (playing) return
			canPause = false
			await videoElement.play()
			// canPause = true
			if (toPause) {
				videoElement.pause()
				toPause = false
			}
			return true
		} catch (error) {
			canPause = true
			console.log(error)
			return false
		}
	}

	export function pauseVideo() {
		toPause = true
		if (canPause) {
			videoElement.pause()
			toPause = false
		}
	}

	export function togglePlay() {
		paused || toPause ? playVideo() : pauseVideo()
	}

	export function toggleMute() {
		if (muted) {
			unMute()
			if ($volume === 0) {
				volume.set(1)
			}
		} else {
			mute()
		}
	}
	export async function mute() {
		muted = true
		videoElement.setAttribute('muted', '')
		await tick()
	}
	export async function unMute() {
		muted = false
		videoElement.removeAttribute('muted')
		await tick()
	}
	export function adjustVolume(e: CustomEvent) {
		const value = e.detail
		volume.set(value)
		if (value === 0) {
			mute()
		} else {
			unMute()
		}
	}

	// Events 
	function onPlay() {
		canPause = true
	}
	function onWaiting() {
		buffering = true
	}
	function onPlaying() {
		buffering = false
	}
	function onLoadstart() {
		if (!buffering) buffering = true
	}
	function onLoadedmetadata() {
		metadataLoaded = true
		onCanPlay()
	}
	function onCanPlay() {
		// ios don't fire canplay event so loadedmetadata also trigger this.
		if (buffering) buffering = false
	}
</script>

<video
	src={src}
	poster={poster}
	loop={loop}
	preload="auto"
	playsinline
	bind:this={videoElement}
	bind:paused
	bind:duration
	bind:volume={$volume}
	bind:currentTime
	bind:muted
	bind:ended
	on:play={onPlay}
	on:play
	on:pause
	on:timeupdate
	on:waiting={onWaiting}
	on:playing={onPlaying}
	on:loadstart={onLoadstart}
	on:canplay={onCanPlay}
	on:loadedmetadata={onLoadedmetadata} 
	on:ended
	style:object-fit={objectFit}
	>

	<track kind="captions" />
</video>

<style lang="scss">
	// Hide native controls
	video::-webkit-media-controls {
		display: none!important;
	}
	video {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
	:global(.player-container.fit-cover-video) video {
		object-fit: cover;
	}
</style>