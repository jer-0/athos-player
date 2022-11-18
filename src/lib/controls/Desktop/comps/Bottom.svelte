<script lang="ts">
  import type Video from "$types/video";

  export let sizeMode: SizeMode
  export let paused: Video.Paused
  export let muted: Video.Muted
  export let duration: Video.Duration
  export let toPause: boolean
  export let formattedCurrentTime: string
  export let isScrubbing: boolean

  import PlayPause from "../../../comps/Buttons/PlayPause.svelte";
  import Volume from "../../../comps/Buttons/Volume.svelte";
  import Fullscreen from "../../../comps/Buttons/Fullscreen.svelte";
  import Time from "../../../comps/Buttons/Time.svelte";
</script>

<div class="bottom-container">
  <div class="bottom" size-mode={sizeMode}>
    <div class="plr-desktop-progress-bar-container">
      <slot name="progress-bar" />
    </div>

    <div class="control-bar">
      <div class="control-left">
        <PlayPause {paused} {toPause} on:togglePlay />
        <Volume {muted} bind:isScrubbing on:adjustVolume on:toggleMute />
        <Time {duration} {formattedCurrentTime} />
      </div>

      <div class="control-right">
        <Fullscreen on:toggleFullscreen />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .bottom-container {
    grid-row-start: 3;
    grid-row-end: 4;
    align-self: flex-end;
    width: 100%;
    height: auto;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.65));
  }

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1px 9px;
  }
  .plr-desktop-progress-bar-container {
    width: 100%;
  }
  .control-bar {
    display: flex;
    width: 100%;
    height: 40px;
    margin-top: 1px;
  }
  .control-left,
  .control-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }
  .control-right {
    margin-left: auto;
  }
  .control-bar :global(.plr-ctrl-button) {
    display: inline-block;
    width: 40px;
    opacity: 0.9;
    transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
    overflow: hidden;
  }
  .control-bar :global(.plr-ctrl-button:hover) {
    opacity: 1;
  }
  .control-bar :global(.plr-play-ctrl-button) {
    width: 46px;
  }

  // Small mode
  .bottom[size-mode="small"] {
    padding: 1px 15px;

    .control-bar {
      height: 36px;
      margin-top: 3px;
    }
    :global(.plr-desktop-progress-bar-container) {
      width: 98%;
    }
  }

  // Big mode
  .bottom[size-mode="big"] {
    padding: 1px 24px;

    .control-bar {
      height: 54px;
    }
    .control-bar :global(.plr-ctrl-button) {
      width: 54px;
    }
  }
</style>
