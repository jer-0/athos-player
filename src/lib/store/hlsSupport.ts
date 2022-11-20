import { writable, readable } from 'svelte/store';
import { isSupported as isMediaSourceSupported } from 'hls.js/src/is-supported'

interface Support {
	native: boolean,
	mediaSource: boolean
}

export default (function () {
	const { subscribe, set } = writable<Support | null>();

	function setSupport(videoElement: HTMLVideoElement): void {
		const mediaSource: boolean = isMediaSourceSupported()
		const native: boolean = 
			videoElement.canPlayType('application/vnd.apple.mpegurl') ? true : false
		set({native, mediaSource})
	} 

	return {
		subscribe,
		setSupport
	}
})()