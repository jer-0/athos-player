<script lang="ts">
	import isFullscreen from '../../store/isFullscreen'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	function toggleFullscreen() {
		dispatch('toggleFullscreen')
	}

	let corner0 = {
		enter: 'm 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z',
		exit: 'm 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z'
	}
	let corner1 = {
		enter: 'm 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z',
		exit: 'm 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z'
	}
	let corner2 = {
		enter: 'm 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z',
		exit: 'm 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z'
	}
	let corner3 = {
		enter: 'M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z',
		exit: 'm 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z'
	}

	$: title = $isFullscreen ? 'Exit full screen (f)' : 'Full screen (f)'
</script>

<button 
	class="plr-fullscreen-ctrl-button plr-ctrl-button"
	title={title}
	aria-label={title}
	on:click={toggleFullscreen}
	on:touchend|preventDefault={toggleFullscreen}
>

	<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
		<g class="btn-corner-0">
			<path class="plr-svg-fill" d="{$isFullscreen ? corner0.exit : corner0.enter}"></path>
		</g>
		<g class="btn-corner-1">
			<path class="plr-svg-fill" d="{$isFullscreen ? corner1.exit : corner1.enter}"></path>
		</g>
		<g class="btn-corner-2">
			<path class="plr-svg-fill" d="{$isFullscreen ? corner2.exit : corner2.enter}"></path>
		</g>
		<g class="btn-corner-3">
			<path class="plr-svg-fill" d="{$isFullscreen ? corner3.exit : corner3.enter}"></path>
		</g>
	</svg>
</button>

<style lang="scss">
	svg path {
		transition: 0.2s;
	}

	.btn-corner-0,
	.btn-corner-1,
	.btn-corner-2,
	.btn-corner-3 {
		transform: none;
	}
</style>