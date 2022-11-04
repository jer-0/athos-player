<script>
    export let paused
    export let duration
    export let currentTime
    export let muted

    import PlayPause from '../../../comps/Buttons/PlayPause.svelte'
    import ProgressBar from './comps/ProgressBar.svelte'
    import InstreamInfo from './comps/InstreamInfo.svelte'
    import Skip from './comps/Skip.svelte'
    import VisitAd from './comps/VisitAd.svelte'
    import MuteUnmute from '../../../comps/Buttons/MuteUnmute.svelte'
    import secondsToDuration from 'seconds-to-duration'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let currentTimeSecond
    $: durationRemaining = currentTimeSecond && duration ? secondsToDuration(duration - currentTimeSecond) : 0

    function overlayClick(e) {
        dispatch('overlayClick')
    }
</script>

<div class="vast-controls-overlay">

    <div class="vast-controls" 
        on:click|self={overlayClick}
        on:touchend|self|preventDefault={overlayClick}
    >

        <div class="mute-unmute-btn">
            <MuteUnmute {muted} on:toggleMute/>
        </div>

        <VisitAd on:visitAd />

        <div class="play-button" style="{!paused ? "display:none;": ''}">
            <PlayPause {paused} on:togglePlay />
        </div>

        <InstreamInfo {durationRemaining}/>

        <Skip {currentTimeSecond} on:skip/>

        <ProgressBar 
            {duration}
            {currentTime}
            bind:currentTimeSecond
        />

    </div>
</div>

<style lang="scss">
    .vast-controls-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // z-index: 10000000000000;
    }

    .vast-controls {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .play-button {
        width: 90px;
        justify-content: center;
        margin: auto;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid transparent;
        border-radius: 50%;
    }

    .mute-unmute-btn {
        height: 35px;
        width: 35px;
        position: absolute;
        top: 4px;
        left: 4px;
        border-radius: 2px;
        background-color: rgba(0,0,0,0.3);
    }
    .mute-unmute-btn:hover {
        background-color: rgba(0,0,0,0.8);
    }
</style>