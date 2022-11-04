<script lang="ts">
	import { onMount } from 'svelte'
	import getFullscreenSupport from './getFullscreenSupport'
	import isFullscreen from '../../store/isFullscreen'
	
	export let videoElement: HTMLVideoElement
	export let playerWrapper: HTMLElement

	let fullscreenSupport: FullScreenSupport

	onMount(() => {
		fullscreenSupport = getFullscreenSupport(videoElement)

		document.addEventListener('fullscreenchange', (e) => { isFullscreen.set(isFullscreenActive())})
		document.addEventListener('webkitfullscreenchange', (e) => { isFullscreen.set(isFullscreenActive())})
		document.addEventListener('mozfullscreenchange', (e) => { isFullscreen.set(isFullscreenActive())})
	})

	export function toggleFullscreen() {
		if (isFullscreenActive()) {
			exitFullscreen()
		} else {
			enterFullscreen()
		}
	}
	
	function isFullscreenActive() {
		if (
			document.webkitFullscreenElement ||
			document.fullscreenElement || 
			document.mozFullScreenElement ||
			videoElement.webkitDisplayingFullscreen // ios
		) {
			return true
		} else {
			return false
		}
	}

	function enterFullscreen() {
		if (fullscreenSupport.element === 'any') {
			if (playerWrapper.webkitRequestFullscreen) {
				playerWrapper.webkitRequestFullscreen()
			} else if (playerWrapper.requestFullscreen) {
				playerWrapper.requestFullscreen()
			} else if (playerWrapper.mozRequestFullScreen) {
				playerWrapper.mozRequestFullScreen()
			}
		} else if (fullscreenSupport.element === 'video') {
			videoElement.webkitEnterFullscreen()
		}
	}
	function exitFullscreen() {
		if (fullscreenSupport.element === 'any') {
			if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen()
			} else if (document.exitFullscreen) {
				document.exitFullscreen()
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
		} else if (fullscreenSupport.element === 'video') {
			videoElement.webkitExitFullscreen()
		}
	}
</script>