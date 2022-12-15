<script lang="ts">
	export let posterUrl: string
	export let visable = false
	export let frame0: boolean
	export let objectFit: ObjectFit
</script>

<div 
	class="thumbnail-overlay" 
	class:frame0={frame0}
	style="{!visable ? "display:none;": ''}"
	>
	<div 
		class="image" 
		style:background-image={`url(${posterUrl})`}
		style:background-size={frame0 ? objectFit : 'cover'}
		>
	</div>
</div>

<style lang="scss">
	@use '../../scss/vars' as var;

	.thumbnail-overlay {
		width: 100%;
		height: 100%;
		transition: opacity .25s cubic-bezier(0,0,0.2,1);
	}

	.frame0 {
		z-index: -1;
	}

	.image {
		background-position: center;
		background-repeat: no-repeat;
		width: 100%;
		height: 100%;
	}
</style>