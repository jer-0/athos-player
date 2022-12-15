export {}

declare global {
	type PointerType = 'touch' | 'mouse'
	type VideoMode = 'active' | 'preload' | 'idle'
	type SizeMode = 'small' | 'normal' | 'big'
	type ObjectFit = 'contain' | 'cover'

	interface FullScreenSupport {
		element: 'any' | 'video' | 'unsupported'
	}
}