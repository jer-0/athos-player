<script lang="ts">
  import type Video from "$types/video";

  export let mode: 'desktop' | 'mobile'

  export let videoElement: HTMLVideoElement;
  export let paused: Video.Paused;
  export let toPause: boolean;
  export let duration: Video.Duration;
  export let isControlsVisable: boolean;
  export let scrubberAlwaysOn: boolean = false;
  export let pointerType: PointerType;

  import throttle from "just-throttle";
  import secondsToDuration from "seconds-to-duration";
  import { createEventDispatcher, onDestroy } from "svelte";
  import PlayProgress from "./comps/PlayProgress.svelte";
  import Scrubber from "./comps/Scrubber.svelte";

  const dispatch = createEventDispatcher();

  // Progess bar binds
  let progressBar: HTMLElement;
  let progressBarRect;
  let progressList: HTMLElement;

  export let formattedCurrentTime;
  export let isScrubbing: boolean;
  let currentTimePercentage = 0; // 0 -1
  let scrubberPosition: number;
  let isPointerDown: boolean;
  let wasPausedBeforeInteract: boolean;
  let showScrubber: boolean;

  // Functions

  export function reset() {
    currentTimePercentage = 0;
    formattedCurrentTime = "00:00";
    scrubberPosition = 0;
  }

  const play = () => dispatch("play");
  const pause = () => dispatch("pause");

  function seek(time: number) {
    videoElement.currentTime = time;
    updateTime(time);
  }

  function updateScrubberPosition() {
    progressBarRect = progressBar.getBoundingClientRect();
    scrubberPosition = currentTimePercentage * progressBarRect.width;
  }

  function updateTime(time: number) {
    currentTimePercentage = time / duration;
    formattedCurrentTime = secondsToDuration(time);
    updateScrubberPosition();
  }

  const updateTimeThrottled = throttle(updateTime, 300, { trailing: true });

  function pointerXToTime(clientX: number) {
    progressBarRect = progressBar.getBoundingClientRect();
    const value =
      Math.min(
        Math.max(clientX - progressBarRect.x, 0),
        progressBarRect.width
      ) / progressBarRect.width;
    const time = duration * value;
    return time;
  }

  // Reactive statements

  $: if (videoElement) {
    videoElement.addEventListener("timeupdate", onTimeupdate);
  }

  onDestroy(() => {
    videoElement.removeEventListener("timeupdate", onTimeupdate);
  });

  // Events handling

  function onTimeupdate() {
    if (isControlsVisable && !isScrubbing) {
      updateTimeThrottled(videoElement.currentTime);
    }
  }

  function onPointerMove(clientX: number) {
    if (isPointerDown) {
      const time = pointerXToTime(clientX);
      updateTime(time);
    }
  }
  function onPointerDown(clientX: number) {
    if (!paused && !toPause) {
      wasPausedBeforeInteract = false;
      pause();
    } else {
      wasPausedBeforeInteract = true;
    }
    isPointerDown = true;
    isScrubbing = true;
    const time = pointerXToTime(clientX);
    updateTime(time);
  }
  function onPointerUp(clientX: number) {
    if (isPointerDown) {
      const time = pointerXToTime(clientX);
      seek(time);

      !wasPausedBeforeInteract ? play() : "";
    }
    isPointerDown = false;
    isScrubbing = false;
  }

  // Mouse events
  function onMouseMove(e: MouseEvent) {
    onPointerMove(e.clientX);
  }
  function onMouseDown(e: MouseEvent) {
    if (e.button === 0) {
      onPointerDown(e.clientX);
      window.addEventListener("mousemove", onMouseMove, { passive: false });
    }
  }
  function onMouseUp(e: MouseEvent) {
    onPointerUp(e.clientX);
    window.removeEventListener("mousemove", onMouseMove);
  }
  function onMouseEnter(e: MouseEvent) {
    showScrubber = true;
    progressList.style.transform = "scaleY(0.9)";
  }
  function onMouseLeave(e: MouseEvent) {
    showScrubber = false;
    progressList.style.transform = "scaleY(0.6)";
  }

  // Touch events
  function onTouchMove(e: TouchEvent) {
    e.preventDefault();
    onPointerMove(e.touches[0].clientX);
  }
  function onTouchStart(e: TouchEvent) {
    onPointerDown(e.touches[0].clientX);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
  }
  function onTouchEnd(e: TouchEvent) {
    onPointerUp(e.changedTouches[0].clientX);
    window.removeEventListener("touchmove", onTouchMove);
  }
</script>

<svelte:window on:mouseup={onMouseUp} on:touchend|passive={onTouchEnd} />

<div
  class="plr-progress-bar"
  class:pointer-touch={pointerType === 'touch'}
  bind:this={progressBar}
  on:mousedown|preventDefault={onMouseDown}
  on:mouseenter|stopPropagation={onMouseEnter}
  on:mouseleave|stopPropagation={onMouseLeave}
  on:touchstart|preventDefault={onTouchStart}
>
  <div 
    class="plr-progress-bar-padding" 
    class:plrd-progress-bar-padding={mode === 'desktop'}
    class:plrm-progress-bar-padding={mode === 'mobile'}
  />

  <div class="plr-progress-list" bind:this={progressList}>
    <PlayProgress {currentTimePercentage} />
  </div>

  <Scrubber
    alwaysOn={scrubberAlwaysOn}
    show={showScrubber}
    {scrubberPosition}
  />
</div>

<style lang="scss">
  @use "../../scss/vars" as var;

  .plr-progress-bar {
    position: relative;
    width: 100%;
    height: 5px;
    cursor: pointer;
    touch-action: none; // stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  .plr-progress-list {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 1px;
    transform: scaleY(0.6);
    transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1);
  }
  .plrd-progress-bar-padding {
    position: absolute;
    width: 100%;
    height: 16px;
    bottom: 0;
  }
   .pointer-touch .plr-progress-bar-padding {
    height: 40px;
    bottom: -11px;
  }

  .plrm-progress-bar-padding {
    position: absolute;
    width: 100%;
    padding: 20px 0;
    top: 50%;
    transform: translateY(-50%);
  }
  // :global(.plr-touch-mode .plr-progress-bar-padding) {
  //   height: 40px;
  //   bottom: -11px;
  // }
</style>
