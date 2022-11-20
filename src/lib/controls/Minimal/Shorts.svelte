<script lang="ts">
	import type Video from '$types/video'

	export let paused: Video.Paused
	export let toPause: boolean
	export let buffering: Video.Buffering
	export let isControlsVisable = true

	import PlayPause from '../../comps/Buttons/PlayPause.svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	let to_togglePlay: boolean

	function onClick_self() {
		dispatch('togglePlay')
	}
	function onTouchStart_self() {
		to_togglePlay = true
	}
	function onTouchEnd_self(e: TouchEvent) {
		if (e.cancelable) e.preventDefault()
		if (isControlsVisable && to_togglePlay) {
			dispatch('togglePlay')
		}
	}
	function onTouchMove_self() {
		to_togglePlay = false
	}
</script>

<plr-shorts-controls
	on:click|self={onClick_self}
	on:touchstart|self={onTouchStart_self}
	on:touchend|self={onTouchEnd_self}
	on:touchmove|self={onTouchMove_self}
	on:keydown
>
	<div class="play-button" style="{!paused || buffering ? "display:none;": ''}">
		<PlayPause {paused} {toPause} on:togglePlay />
	</div>
</plr-shorts-controls>

<style lang="scss">
	@use '../../scss/vars' as var;

	plr-shorts-controls {
		display: grid;
		grid-template-columns: 1fr;
    grid-template-rows: repeat(3,minmax(0, 1fr));
		height: 100%;
		width: 100%;
		z-index: 2;
	}

	.play-button {
		grid-row-start: 2;
    grid-row-end: 3;
    align-self: center;
		justify-content: center;
		width: 60px;
		margin: auto;
		background: rgba(0, 0, 0, 0.5);
		border: 1px solid transparent;
		border-radius: 50%;
	}
</style>