<script>
    export let display
</script>

<plr-spinner style="{display ? "display: block;" : "display: none;"}">
    <div class="plr-spinner-container">
        <div class="plr-spinner-rotator">
            <div class="plr-spinner-left">
                <div class="plr-spinner-circle"></div>
            </div>
            <div class="plr-spinner-right">
                <div class="plr-spinner-circle"></div>
            </div>
        </div>
    </div>
</plr-spinner>

<style lang="scss">
    @use '../../scss/vars' as var;

    plr-spinner {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 64px;
        margin-left: -32px;
        pointer-events: none;
        // z-index: map-get(var.$z-index, "plr-spinner")
    }
    .plr-spinner-container {
        pointer-events: none;
        position: absolute;
        width: 100%;
        padding-bottom: 100%;
        top: 50%;
        left: 50%;
        margin-top: -50%;
        margin-left: -50%;
        animation: ytp-spinner-linspin 1568.2352941176ms linear infinite;
        -webkit-animation: ytp-spinner-linspin 1568.2352941176ms linear infinite;
    }
    .plr-spinner-rotator {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-animation: ytp-spinner-easespin 5332ms cubic-bezier(0.4,0,0.2,1) infinite both;
        animation: ytp-spinner-easespin 5332ms cubic-bezier(0.4,0,0.2,1) infinite both;
    }
    .plr-spinner-left {
        right: 49%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        overflow: hidden;
        .plr-spinner-circle {
            left: 0;
            right: -100%;
            border-right-color: transparent;
            -webkit-animation: ytp-spinner-left-spin 1333ms cubic-bezier(0.4,0,0.2,1) infinite both;
            animation: ytp-spinner-left-spin 1333ms cubic-bezier(0.4,0,0.2,1) infinite both;
        }
    }
    .plr-spinner-right {
        left: 49%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        .plr-spinner-circle {
            left: -100%;
            right: 0;
            border-left-color: transparent;
            -webkit-animation: ytp-right-spin 1333ms cubic-bezier(0.4,0,0.2,1) infinite both;
            animation: ytp-right-spin 1333ms cubic-bezier(0.4,0,0.2,1) infinite both;
        }
    }
    .plr-spinner-circle  {
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 100%;
        border-style: solid;
        border-color: #ddd #ddd transparent;
        border-radius: 50%;
        border-width: 6px;
    }

    @-webkit-keyframes ytp-spinner-linspin {
        to {
            -webkit-transform: rotate(360deg)
        }
    }
    @keyframes ytp-spinner-linspin {
        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg)
        }
    }
    @-webkit-keyframes ytp-spinner-easespin {
        12.5% {
            -webkit-transform: rotate(135deg)
        }
        25% {
            -webkit-transform: rotate(270deg)
        }
        37.5% {
            -webkit-transform: rotate(405deg)
        }
        50% {
            -webkit-transform: rotate(540deg)
        }
        62.5% {
            -webkit-transform: rotate(675deg)
        }
        75% {
            -webkit-transform: rotate(810deg)
        }
        87.5% {
            -webkit-transform: rotate(945deg)
        }
        to {
            -webkit-transform: rotate(1080deg)
        }
    }
    @keyframes ytp-spinner-easespin {
        12.5% {
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg)
        }
        25% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg)
        }
        37.5% {
            -webkit-transform: rotate(405deg);
            transform: rotate(405deg)
        }
        50% {
            -webkit-transform: rotate(540deg);
            transform: rotate(540deg)
        }
        62.5% {
            -webkit-transform: rotate(675deg);
            transform: rotate(675deg)
        }
        75% {
            -webkit-transform: rotate(810deg);
            transform: rotate(810deg)
        }
        87.5% {
            -webkit-transform: rotate(945deg);
            transform: rotate(945deg)
        }
        to {
            -webkit-transform: rotate(1080deg);
            transform: rotate(1080deg)
        }
    }
    @-webkit-keyframes ytp-spinner-left-spin {
        0% {
            -webkit-transform: rotate(130deg)
        }
        50% {
            -webkit-transform: rotate(-5deg)
        }
        to {
            -webkit-transform: rotate(130deg)
        }
    }
    @keyframes ytp-spinner-left-spin {
        0% {
            -webkit-transform: rotate(130deg);
            transform: rotate(130deg)
        }
        50% {
            -webkit-transform: rotate(-5deg);
            transform: rotate(-5deg)
        }
        to {
            -webkit-transform: rotate(130deg);
            transform: rotate(130deg)
        }
    }
    @-webkit-keyframes ytp-right-spin {
        0% {
            -webkit-transform: rotate(-130deg)
        }
        50% {
            -webkit-transform: rotate(5deg)
        }
        to {
            -webkit-transform: rotate(-130deg)
        }
    }
    @keyframes ytp-right-spin {
        0% {
            -webkit-transform: rotate(-130deg);
            transform: rotate(-130deg)
        }
        50% {
            -webkit-transform: rotate(5deg);
            transform: rotate(5deg)
        }
        to {
            -webkit-transform: rotate(-130deg);
            transform: rotate(-130deg)
        }
    }
</style>