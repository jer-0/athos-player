/**
* Check whether or not fullscreen mode is available on document and any elements within
* or only available on html video element or not supported.
* @param videoElement - HTML video element
* @returns object
*/
export default function getFullscreenSupport(videoElement: HTMLVideoElement): FullScreenSupport {
	if (document.fullscreenEnabled
		|| document.webkitFullscreenEnabled
		|| document.mozFullScreenEnabled) {
			return { element: 'any' }
	} else if (videoElement.webkitSupportsFullscreen) {
		return { element: 'video' }
	} else {
		// webkitSupportsFullscreen property is false on ios if metadata has not been loaded
		// check if metadata have been loaded
		if(videoElement.readyState < 1) {
			throw Error('Video metadata must be loaded before can check for fullscreen support.')
		}
		
		return { element: 'unsupported' }
	}
}