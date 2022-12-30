<script lang="ts">
  import type Video from "$types/video"

  export let paused: Video.Paused
  export let toPause: boolean

  import PlayPause from "../../../comps/Buttons/PlayPause.svelte"
</script>

<div class="middle-bar"
>
  <PlayPause 
    {paused} 
    {toPause} 
    viewBox={"6 6 24 24"}
    on:togglePlay 
  />
</div>

<style lang="scss">
  .middle-bar {
    grid-row-start: 2;
    grid-row-end: 3;
    display: flex;
    justify-self: center;
    align-self: center;
  }

  .middle-bar :global(.plr-play-ctrl-button) {
    width: 45px;
    height: 45px;
  }
</style>