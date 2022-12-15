<script lang="ts">
	import type VideoAtr from '$types/video'
	import type HlsType from 'hls.js'

	interface Config {
		readonly autoplay: VideoAtr.Autoplay
		/** if poster should behave like frame0 */
		readonly frame0poster: boolean
		readonly loop: VideoAtr.Loop
		readonly	objectFit: ObjectFit
	}

	const defaultConfig: Config = {
		autoplay: false,
		frame0poster: false,
		loop: false,
		objectFit: 'contain'
	}

	let userConfig: Partial<Config> = {} 

	export { userConfig as config }
	export let videoSrc: string
	export let posterUrl: string | null = null
	export let prerollUrl: string | null = null
	export let playAd: boolean = true
	export let controlsType: 'minimal' | 'desktop' | 'mobile' = 'desktop'
	export let videoMode: VideoMode = 'active'

	const config: Config = {
		...defaultConfig,
		...userConfig
	} 

	import { onMount, onDestroy } from 'svelte'

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

	let hls: HlsType | undefined

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
		if (!$Hls) throw new Error(`$Hls is typeof ${typeof $Hls}`)

		if (hls) {
			videoElement.pause()
			hls.detachMedia()
			hls.destroy()
		} 

		hls = new $Hls!()

		hls.loadSource(videoSrc)
		hls.on($Hls.Events.MANIFEST_PARSED, () => {
			hls!.attachMedia(videoElement)
		})
		hls.on($Hls.Events.MEDIA_ATTACHED, () => {
			attached = true
		})
	}

	$: if (videoSrc && mounted) {
		attached = false
		if ($hlsSupport!.mediaSource) {
			if ($Hls) {
				attachHlsSrc()
			}
		} else if ($hlsSupport!.native) {
			attached = true
		}
		reset()
	}

	onMount(() => {
		if (!$hlsSupport) {
			hlsSupport.setSupport(videoElement)
		}
		if ($hlsSupport!.mediaSource) {
			if (!$Hls) {
				Hls.initialize()
			}
		} else if ($hlsSupport!.native) {
			
		}
		mounted = true
	})

	onDestroy(() => {
		if(hls) {
			hls.destroy()
		}
	})
</script>

<PlayerContainer 
	bind:athosPlayer={athosPlayer}
	bind:pointerType
>   
	<div slot="video" class="html5-video-container">
		<Video
			autoplay={config.autoplay}
			objectFit={config.objectFit}
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
			bind:loop={config.loop}
			on:play={onPlay}
		/>
	</div>

	<CenterSpinner class="plrd-center-spinner" active={buffering || !attached}/>

	{#if posterUrl}
		<ThumbnailOverlay 
			posterUrl={posterUrl}
			visable={initPlay || config.frame0poster} 
			frame0={config.frame0poster}
			objectFit={config.objectFit}
		/>
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
</style>