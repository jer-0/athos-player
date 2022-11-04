<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    function visitAd(e) {
        dispatch('visitAd')
    }
</script>

<div class="visit-ad" 
    on:click={visitAd}
    on:touchend|preventDefault={visitAd}
>
    <button class="vist-ad-btn">
        <span class="vist-ad-btn-text">Visit ad</span>
        <span class="vist-ad-btn-icon">
            <svg fill="#fff" height="100%" version="1.1" viewBox="0 0 48 48" width="100%">
                <path d="M0 0h48v48H0z" fill="none"></path>
                <path d="M38 38H10V10h14V6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V24h-4v14zM28 6v4h7.17L15.51 29.66l2.83 2.83L38 12.83V20h4V6H28z"></path></svg>
        </span>
    </button>
</div>

<style lang="scss">
    .visit-ad {
        position: absolute;
        top: 10px;
        right: 0;
    }
    .vist-ad-btn {
        background-color: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255,255,255,0.25);
        border-radius: 5px 0 0 5px;
        padding: 8px 7px 8px 8px;
        width: auto;
        text-align: center;
        cursor: pointer;
    }
    .vist-ad-btn-text {
        font-family: "Helvetica Neue Light",arial,sans-serif;
        font-size: 13px;
        line-height: normal;
        padding: 0 4px;
        text-shadow: 1px 1px 1px rgb(0 0 0 / 75%);
        color: #fff;
        text-decoration: none;
    }
    .vist-ad-btn-icon {
        display: inline-block;
        width: 10px;
        height: 10px;
        opacity: .75;
    }
</style>