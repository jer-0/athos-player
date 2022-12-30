<!-- <div class="spinner">
</div> -->

<span class="loader"></span>

<style lang="scss">
	.loader {
    width: 60px;
    height:60px;
    border: 4px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	} 

	// .spinner {
	// 	display: block;
	// 	-webkit-box-sizing: border-box;
	// 	box-sizing: border-box;
	// 	margin: 12px auto;
	// 	width: 80px;
	// 	height: 80px;
	// 	-webkit-border-radius: 50%;
	// 	border-radius: 50%;
	// 	border: 2px solid #eee;
	// 	border-top-color: #666;
	// 	-webkit-animation: spinner .8s linear infinite;
	// 	-webkit-animation: spinner .8s linear infinite;
	// 	animation: spinner .8s linear infinite;
	// }

	// @keyframes spinner {
	// 	0% {
	// 		-webkit-transform: rotate(0deg);
	// 		transform: rotate(0deg);
	// 	}
	// 	100% {
	// 		-webkit-transform: rotate(360deg);
	// 		transform: rotate(360deg);
	// 	}
	// }
</style>