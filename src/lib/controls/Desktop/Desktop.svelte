<script lang="ts">
	import type Video from "$types/video"

	export let paused: Video.Paused
	export let toPause: boolean
	export let muted: Video.Muted
	export let duration: Video.Duration
	export let isScrubbing: boolean
	export let formattedCurrentTime: string

	import throttle from 'just-throttle'
	import debounce from "just-debounce-it"
	import { createEventDispatcher } from 'svelte'
	import Bottom from "./comps/Bottom.svelte"
	import isFullscreen from "../../store/isFullscreen"

	const dispatch = createEventDispatcher()

	export let isControlsVisable = false

	let isMouseOver: boolean

	// Size mode
	let sizeMode: SizeMode
	$: sizeMode = $isFullscreen ? 'big' : 'normal'

	// Controls state
	let isControlsIdle = false
	let touched = false

	$: isControlsVisable = ((isMouseOver || touched) && !isControlsIdle) || paused || toPause || isScrubbing

	const controlsIdleTimeOut = 
		debounce(() => isControlsIdle = true, 3000)
	
	const touchedTimeout = debounce(() => touched = false, 3000)

	export function triggerActivity() {
		isControlsIdle = false
		controlsIdleTimeOut()
	}
	export function triggerTouchActivity() {
		touched = true
		touchedTimeout()
		triggerActivity()
	}
	function onClick_self() {
		dispatch('togglePlay')
	}
	function onTouchEnd_self() {
		if (isControlsVisable) {
			dispatch('togglePlay')
		} 
	}

	function onClick() {
		triggerActivity()
	}
	function onTouchEnd(e:TouchEvent) {
		if (e.cancelable) e.preventDefault()
		triggerTouchActivity()
	}
	function onMouseEnter() {
		isMouseOver = true
		triggerActivity()
	}
	function onMouseLeave() {
		isMouseOver = false
		triggerActivity()
	}
	const onMouseMove_throttled = throttle(() => {
			triggerActivity()
	}, 1000, { leading: true })
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<plrd-controls
	on:click={onClick}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	on:mousemove={onMouseMove_throttled}
	on:touchend={onTouchEnd}
	>
	<div
		class="plrd-controls"
		class:hide-controls={!isControlsVisable}
		on:click|self={onClick_self}
		on:touchend|preventDefault|self={onTouchEnd_self}
	>
		<Bottom
			{sizeMode}
			{paused} 
			{toPause}
			{muted}
			{duration}
			{formattedCurrentTime}
			bind:isScrubbing
			on:togglePlay
			on:toggleMute
			on:adjustVolume
			on:toggleFullscreen
			on:triggerTouchActivity={triggerTouchActivity}
		>
			<slot name="progress-bar" slot="progress-bar"/>
		</Bottom>
	</div>
</plrd-controls>

<style lang="scss">
	@use '../../scss/vars' as var;

	plrd-controls {
		position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
	}

	.plrd-controls {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		opacity: 1;
		transition: opacity .1s cubic-bezier(0.4,0.0,1,1);
		background: transparent;
		// z-index: map-get(var.$z-index, "plrd-controls")
	}

	.plrd-controls.hide-controls {
		height: 0;
		width: 0;
		opacity: 0;
		visibility:hidden;
	}
</style>