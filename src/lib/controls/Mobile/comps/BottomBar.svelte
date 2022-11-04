<script lang="ts">
  import type Video from '$types/video'

  export let duration: Video.Duration
  export let formattedCurrentTime: string

  import Fullscreen from "../../../comps/Buttons/Fullscreen.svelte";
  import Time from "../../../comps/Buttons/Time.svelte";
</script>

<div class="bottom-bar-container">
  <div class="bottom-bar">

    <div class="controls-bar">
      <div class="control-left">
        <Time {duration} {formattedCurrentTime} />
      </div>

      <div class="control-right">
        <Fullscreen on:toggleFullscreen />
      </div>
    </div>

    <div class="plr-desktop-progress-bar-container">
      <slot name="progress-bar" />
    </div>

  </div>
</div>

<style lang="scss">
  .bottom-bar-container {
    grid-row-start: 3;
    grid-row-end: 4;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-self: flex-end;
  }

  .bottom-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px 5px 20px;
  }
  .plr-desktop-progress-bar-container {
    width: 100%;
  }

  .controls-bar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .control-left, .control-right {
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