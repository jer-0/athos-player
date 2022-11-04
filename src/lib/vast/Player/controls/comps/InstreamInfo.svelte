<script>
    export let durationRemaining
</script>

<div class="instream-info" class:hide={!durationRemaining}>
    <span class="ad-badge">
        <div>Ad • </div>
    </span>
    <span class="duration-remaining">
        <div>{durationRemaining}</div>
    </span>
</div>

<style lang="scss">
    .instream-info {
        display: flex;
        position: absolute;
        bottom: 6px;
        left: 0;
        cursor: default;
        pointer-events: auto;
        font-size: 14px;
        line-height: 28px;
        transition: bottom .1s cubic-bezier(0.4,0,1,1);
        text-shadow: 0 0 4px rgb(0 0 0 / 75%);
    }

    .ad-badge, .duration-remaining {
        opacity: .75;
        text-shadow: 0 0 2px rgb(0 0 0 / 50%);
    }

    .ad-badge {
        margin-left: 5px;
    }

    .duration-remaining {
        margin-left: 3px;
    }
    .hide {
        opacity: 0;
    }
</style>