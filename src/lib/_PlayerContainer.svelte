<script lang="ts"> 
	export let athosPlayer: HTMLElement
	export let pointerType: PointerType

	function onMouseDown(e: MouseEvent) {
		pointerType = 'mouse'
	}
	function onTouchStart(e: TouchEvent) {
		pointerType = 'touch'
	}
</script>

<athos-player
	bind:this={athosPlayer}
	on:mousedown={onMouseDown}
	on:touchstart={onTouchStart}
>
	<div 
		class="html5-video-player"
		class:plr-touch-mode={pointerType === 'touch'}
		class:plr-mouse-mode={pointerType === 'mouse'}
	>
		<slot name="video" />
		<slot />
	</div>
</athos-player>

<style lang="scss">
	@use './scss/vars' as var;

	athos-player {
		display: block;
		width: 100%;
		height: 100%;
		color: #fff;
		font-size: var.$plr-font-size;
		font-family: inherit;
		background-color: #000;
	}

	@media (max-width: 600px) {
		athos-player {
			font-size: 9px;
		}
	}

	.html5-video-player {
		// display: flex;
		// justify-content: center;
		// position: relative;
		display: grid;
		place-items: center;
		isolation: isolate;
		width: 100%;
		height: 100%;
		grid-template-rows: max-content 1fr max-content;
	}
	:global(.html5-video-player > *) {
		grid-column: 1 / -1;
		grid-row: 1 / -1;
	}
</style>