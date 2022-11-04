<script>
    export let currentTimeSecond

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let canSkipAd = false
    let skipAdCount = 5
    let countdownToSkip = skipAdCount
    let toStopCount

    function updateCount() {
        countdownToSkip = skipAdCount - currentTimeSecond
        if (countdownToSkip <= 0) {
            canSkipAd = true
            toStopCount = true
        }
    }

    $: if (!toStopCount && currentTimeSecond) {
        updateCount()
    }

    function skip(e) {
        dispatch('skip')
    }
</script>

<div class="skip-ad">
    <div 
        class="pre-skip"
        style="{canSkipAd ? "display:none;": ''}"
    >
        <div class="pre-skip-text">Skip to video in {countdownToSkip}</div>
    </div>

    <button 
        class="ad-skip-button" 
        style="{!canSkipAd ? "display:none;": ''}"
        on:click={skip}
        on:touchend|preventDefault={skip}
    >
        <div class="skip-button-text">Skip Ad</div>
        <span class="skip-button-icon">
            <svg viewBox="0 0 36 36">
                <path class="plr-svg-fill" d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"/>
            </svg>
        </span>
    </button>
</div>

<style lang="scss">
    .skip-ad {
        position: absolute;
        bottom: 19px;
        right: 0;
    }
    .pre-skip {
        transition: opacity .4s cubic-bezier(0,0,0.2,1);
        background: rgba(0,0,0,0.4);
        cursor: default;
        pointer-events: auto;
    }
    .pre-skip-text {
        color: #e6e6e6;
        font-family: "Helvetica Neue Light",arial,sans-serif;
        font-size: 12px;
        padding: 10px 6px;
        text-shadow: 0 0 4px rgb(0 0 0 / 75%);
    }
    .ad-skip-button {
        background-color: rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.25);
        font-family: arial,sans-serif;
        font-size: 13px;
        padding: 11px 6px 11px 11px;
        color: #fff;
        line-height: normal;
        width: auto;
        text-align: center;
        cursor: pointer;
    }
    .ad-skip-button:hover {
        background: rgba(0,0,0,0.9);
        border: 1px solid white;
        border-right: 0;
    }
    .skip-button-text {
        display: inline-block;
    }
    .skip-button-icon {
        height: 36px;
        width: 36px;
        display: inline-block;
        vertical-align: middle;
        margin: -14px -6px -12px -4px;
    }
</style>