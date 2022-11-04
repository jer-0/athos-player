<script lang="ts">
  import type Video from "$types/video";  

  export let muted: Video.Muted

  import volume from '../../../store/volume'
  import MuteUnmute from "../../../comps/Buttons/MuteUnmute.svelte"
</script>

<div class="top-bar">
  
  <div class="left">
    <MuteUnmute {muted} volume={$volume} on:toggleMute/>
  </div>

  <div class="right">

  </div>

</div>

<style lang="scss">
  .top-bar {
    align-self: flex-start;
    grid-row-start: 1;
    grid-row-end: 2;
    display: flex;
    justify-content: space-between;
    // height: 35px;
  }
  .left, .right {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    :global(.plr-ctrl-button) {
      width: var(--ctrl-button-width);
      height: var(--ctrl-button-height);
    }
  }
</style>