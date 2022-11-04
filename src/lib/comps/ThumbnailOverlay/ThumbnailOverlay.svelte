<script lang="ts">
    export let posterUrl: string
    export let visable = false
</script>

<div class="thumbnail-overlay" style="{!visable ? "display:none;": ''}">
    <div class="image" style="background-image: url('{posterUrl}');">
    </div>
</div>

<style lang="scss">
    @use '../../scss/vars' as var;

    .thumbnail-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-position: center;
        background-repeat: no-repeat;
        transition: opacity .25s cubic-bezier(0,0,0.2,1);
        background-size: cover;
        // z-index: map-get(var.$z-index, "plr-thumbnail-overlay")
    }

    .image {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>