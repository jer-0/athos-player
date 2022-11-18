<script lang="ts">
	import type Video from "$types/video"

  export let paused: Video.Paused
	export let toPause: boolean
	export let muted: Video.Muted
	export let duration: Video.Duration
	export let formattedCurrentTime: string

  import debounce from "just-debounce-it"
	import { createEventDispatcher } from 'svelte'
  import TopBar from "./comps/TopBar.svelte"
  import MiddleBar from "./comps/MiddleBar.svelte"
  import BottomBar from "./comps/BottomBar.svelte"

  const dispatch = createEventDispatcher()

  // binds
  let controlsContainer: HTMLElement
  let controls: HTMLElement

  // Controls state
  export let controlsVisable = true  

  const interactionTimeout = debounce(() => {
    controlsVisable = false
  }, 2300)

  $: if (controlsVisable) {
    if (!(paused || toPause)) {
      interactionTimeout()
    } else {
      interactionTimeout.cancel()
    }
  }

  function onInteraction(e: Event) {
    const target = e.target
    if (target === controlsContainer || target === controls) {
      controlsVisable = !controlsVisable
      // if (controlsVisable) {
      //   if (!paused || !toPause) {
      //     interactionTimeout()
      //   }
      //   return
      // }
    } else {
      if (controlsVisable) {
        // interactionTimeout()
      }
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<plr-mobile-controls
  bind:this={controlsContainer}
  on:click={onInteraction}
	on:touchend|preventDefault={onInteraction}
  class:controls-visable={controlsVisable}
>
  <div 
    bind:this={controls}
    class="plr-mobile-controls"
    class:hide-controls={!controlsVisable}
  >
    <TopBar 
      {muted} 
      on:toggleMute
    />
    <MiddleBar 
      {paused} 
      {toPause} 
      on:togglePlay 
    />
    <BottomBar 
      {duration} 
      {formattedCurrentTime} 
      on:toggleFullscreen
    >
      <slot name="progress-bar" slot="progress-bar"/>
    </BottomBar>
  </div>
</plr-mobile-controls>

<style lang="scss">
  @use '../../scss/vars' as var;

  plr-mobile-controls {
    --ctrl-button-width: 35px;
    --ctrl-button-height: 35px;
    display: grid;
		// position: absolute;
    width: 100%;
    height: 100%;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
    z-index: 2;
    background: rgba(0,0,0,0);
    transition-property: background-color;
    transition-duration: 0.7s;
    &.controls-visable {
      background: rgb(0 0 0 / 60%);
    }
	}

  .plr-mobile-controls {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, minmax(0, 1fr));
    min-width: 0;
    min-height: 0;
    padding: 10px;
    opacity: 1;
    height: 100%;

    &.hide-controls {
      opacity: 0;
      visibility:hidden;
    }
  }
</style>