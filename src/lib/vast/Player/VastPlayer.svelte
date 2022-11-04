<script>
    export let videoSrc
    export let toPlayAd

    import Video from '../../comps/Video/Video.svelte'
    import Controls from './controls/Controls.svelte'
    import CenterSpinner from '../../comps/Loading/CenterSpinner.svelte'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    // Video binds
    let video
    let videoElement
    let paused = true
    let duration
    let currentTime
    let muted
    let buffering

    let initPlay = true

    async function play() {
        try {
            await videoElement.play()
        } catch (error) {
            console.log(error)
            try {
                await video.mute()
                // videoElement.setAttribute('autoplay', '')
                await videoElement.play()
            } catch (error) {
                console.log(error)
                dispatch('error')
            }
        }
    }

    function pause() {
        videoElement.pause()
    }

    $: if (toPlayAd && videoElement) {
        play()
        toPlayAd = false
    }

    // Events
    function onPlay() {
        if (initPlay) {
            dispatch('trackImpression')
            initPlay = false
        }
        dispatch('trackPlay', { paused: false })
    }
    function onPause() {
        dispatch('trackPause', { paused: true })
    }
    function onTimeupdate() {
        dispatch('trackProgress', { second: currentTime })
    }
    function onEnded() {
        dispatch('ended')
    }
    function onSkip() {
        dispatch('skip')
    }
    function onVisitAd() {
        if (!paused) {
            pause()
            dispatch('clickthrough')
        } else {
            dispatch('clickthrough')
        }
    }
    function onOverlayClick() {
        if (!paused) {
            pause()
            dispatch('clickthrough')
        } else {
            video.playVideo()
        }
    }
</script>

<plr-vast-player>
    <div class="container">
        {#if videoSrc}
            <Video
                src={videoSrc}
                bind:this={video}
                bind:videoElement
                bind:paused
                bind:duration
                bind:currentTime
                bind:muted
                bind:buffering
                on:play={onPlay}
                on:pause={onPause}
                on:timeupdate={onTimeupdate}
                on:ended={onEnded}
            />
        {/if}

        <CenterSpinner class="plr-vast-center-spinner" {buffering}/>

        <Controls
            {paused}
            {duration}
            {currentTime}
            {muted}
            on:togglePlay={video.togglePlay}
            on:skip={onSkip}
            on:visitAd={onVisitAd}
            on:overlayClick={onOverlayClick}
            on:toggleMute={video.toggleMute}
        />
    </div>  
</plr-vast-player>

<style lang="scss">
    @use '../../scss/vars' as var;

    plr-vast-player {
        display: block;
        background-color: #000;
        height: 100%;
        width: 100%;
        // z-index: map-get(var.$z-index, "plr-vast-player")
    }
    .container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    // :global(.plr-center-spinner.plr-vast-center-spinner) {
    //     z-index: map-get(var.$z-index, "plr-vast-center-spinner")
    // }
</style>