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
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        transition: opacity .25s cubic-bezier(0,0,0.2,1);
        background-size: cover;
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