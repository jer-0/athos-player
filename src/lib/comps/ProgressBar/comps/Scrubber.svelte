<script lang="ts">
	export let alwaysOn: boolean
	export let show = false
	export let scrubberPosition: number
</script>

<div 
	class="scrubber-container" 
	style="transform: translateX({scrubberPosition}px);">
	<div 
		class="scrubber-button"
		style="transform:scale({alwaysOn || show ? 1 : 0})"
	>
	</div>
</div>

<style lang="scss">
	.scrubber-container {
		position: absolute;
		top: -4px;
		left: -6.5px;
		// z-index: 43;
	}
	.scrubber-button {
		height: 13px;
		width: 13px;
		border-radius: 6.5px;
		transition: transform .1s cubic-bezier(0.4,0.0,1,1);
		// transform: scale(0);
		background-color: #ef0857;
	}
</style>