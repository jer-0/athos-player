<script lang="ts">
	import type Video from '$types/video'

	export let paused: Video.Paused
	export let muted: Video.Muted
	export let toPause: boolean
	export let isControlsVisable = true

	import PlayPause from '../../comps/Buttons/PlayPause.svelte'
	import MuteUnmute from "../../comps/Buttons/MuteUnmute.svelte"
	import volume from '../../store/volume'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	let interact: boolean
	let to_togglePlay: boolean

	function onClick_self() {
		interact = true
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
		interact = true
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
	<div class="mute-btn">
		<MuteUnmute {muted} volume={$volume} on:toggleMute/>
	</div>
	{#if interact}
		<div 
			class="play-button" 
			style={!paused ? "display:none;": ''}
			>
			<PlayPause {paused} {toPause} on:togglePlay />
		</div>
	{/if}
</plr-shorts-controls>

<style lang="scss">
	@use '../../scss/vars' as var;

	plr-shorts-controls {
		display: grid;
		grid-template-columns: 100%;
    grid-template-rows: repeat(3,minmax(0, 1fr));
		height: 100%;
		width: 100%;
		padding: 10px;
		z-index: 1;
	}

	.mute-btn {
		// grid-row-start: 3;
    // grid-row-end: 4;
    // display: flex;
    // width: 45px;
    // height: 45px;
    // margin-top: 120px;
		position: absolute;
    bottom: 22%;
		display: flex;
		width: 65px;
    height: 65px;
    padding: 10px 10px 10px 0px;
	}

	.play-button {
		display: flex;
		grid-row-start: 2;
    grid-row-end: 3;
    align-self: center;
		justify-content: center;
		width: 50px;
		margin: auto;
		background: rgba(0, 0, 0, 0.5);
		border: 1px solid transparent;
		border-radius: 50%;
	}
</style>