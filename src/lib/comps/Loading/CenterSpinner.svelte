<script>
    export let active
    let _class = ''
    export { _class as class }

    import SpinnerMobile from '../UI/SpinnerMobile.svelte'
</script>

<div class="plr-center-spinner {_class}" style="{active ? "display: block;" : "display: none;"}">
    <SpinnerMobile/>
</div>

<style lang="scss">
    .plr-center-spinner {
        // position: absolute;
        // top: 50%;
        // width: 100%;
        display: flex;
        // align-items: center;
        // transform: translateY(-50%);
    }
</style>