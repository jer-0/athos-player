/// <reference types="svelte" />
/// <reference types="vite/client" />

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		'size-mode': SizeMode
	}
}

interface Document {
  readonly webkitFullscreenElement?: Element;
  readonly mozFullScreenElement?: Element;
  readonly webkitDisplayingFullscreen?: Element;
  readonly webkitFullscreenEnabled?:boolean
  readonly mozFullScreenEnabled?:boolean
  webkitExitFullscreen(): void
  mozCancelFullScreen(): void
}

interface HTMLElement {
  webkitRequestFullscreen(): void
  mozRequestFullScreen(): void
}

interface HTMLVideoElement {
  readonly webkitDisplayingFullscreen?: boolean
  readonly webkitSupportsFullscreen?: boolean
  webkitEnterFullscreen(): void;
  webkitExitFullscreen(): void;
}