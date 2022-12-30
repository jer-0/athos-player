<script>
	export let active
	let _class = ''
	export { _class as class }

	import SpinnerMobile from '../UI/SpinnerMobile.svelte'
</script>

<div 
	class="plr-center-spinner {_class}" 
	class:hide={!active}
	>
	<SpinnerMobile/>
</div>

<style lang="scss">
	.plr-center-spinner {
		display: flex;
	}
	.hide {
		display: none;
	}
</style>