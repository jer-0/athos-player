<script lang="ts">
	import type Video from '$types/video'

	export let paused: Video.Paused
	export let toPause: boolean
	export let viewBox = "0 0 36 36"
	
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	function togglePlay() {
		dispatch('togglePlay')
	}

	const playD = "M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
	const pausedD = "M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"

	$: d = paused || toPause ? playD : pausedD
	$: title = paused || toPause ? 'Play (k)' : 'Pause (k)'
</script>

<button 
	class="plr-play-ctrl-button plr-ctrl-button"
	title={title}
	aria-label={title}
	on:click={togglePlay}
	on:touchend|preventDefault={togglePlay}
>
	<svg version="1.1" viewBox="{viewBox}" width="100%" height="100%">
		<path d={d} class="plr-svg-fill"></path>
	</svg>
</button>

<style lang="scss">
	.plr-play-ctrl-button {
	    display: flex;
	    flex: 0 0 auto;
	}
	svg path {
		transition: 0.14s;
	}
</style>