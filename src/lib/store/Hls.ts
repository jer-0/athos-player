import type Hls from 'hls.js'

import { writable } from 'svelte/store'

export default (function () {
	const { subscribe, set } = writable<typeof Hls | null>();
	let initializing = false

	async function initialize(): Promise<void> {
		if (initializing) return
		initializing = true
		const hls_module = await import('hls.js')
		set(hls_module.default)
		initializing = false
	} 

	return {
		subscribe,
		initialize
	}
})()