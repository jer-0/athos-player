export {}

declare global {
	type PointerType = 'touch' | 'mouse'
	type VideoMode = 'active' | 'preload' | 'idle'
	type SizeMode = 'small' | 'normal' | 'big'

	interface FullScreenSupport {
		element: 'any' | 'video' | 'unsupported'
	}
}