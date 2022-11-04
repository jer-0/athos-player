<div class="spinner">
</div>

<style lang="scss">
    .spinner {
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 12px auto;
        width: 32px;
        height: 32px;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        border: 2px solid #eee;
        border-top-color: #666;
        -webkit-animation: spinner .8s linear infinite;
        -webkit-animation: spinner .8s linear infinite;
        animation: spinner .8s linear infinite;
    }

    @keyframes spinner {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>