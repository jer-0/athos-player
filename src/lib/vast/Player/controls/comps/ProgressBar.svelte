<script>
    import throttle from "just-throttle"

    export let currentTime
    export let duration
    export let currentTimeSecond

    let bar

    // Progress Bar handling
    let currentTimePercentage = 0

    $: updateTimeThrottled(currentTime)

    function updateTime(currentTime) {
        if (!currentTime || !duration) return
        currentTimePercentage = currentTime / duration
        currentTimeSecond = Math.round(currentTime)
    }
    const updateTimeThrottled = throttle(updateTime, 100, { trailing: true })
</script>

<div class="vast-progress-bar-container">
    <div class="vast-progress-bar"
        bind:this={bar} 
        style="left: 0px; transform: scaleX({currentTimePercentage});">
    </div>
</div>

<style lang="scss">
    .vast-progress-bar-container {
        width: 100%;
        height: 4px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgba(255,255,255,0.2);
    }
    .vast-progress-bar {
        width: 100%;
        height: 100%;
        transform-origin: 0px 0px;
        background: #ffcc00;
        transition: transform .1s cubic-bezier(0.4,0.0,1,1);
        pointer-events: none;
    }
</style>