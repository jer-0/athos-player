import { writable } from 'svelte/store'
import type Hls from 'hls.js'

export default (function () {
    const { subscribe, set } = writable<typeof Hls>();

    async function initialize(): Promise<void> {
        const hls_module = await import('hls.js')
        set(hls_module.default)
    } 

    return {
        subscribe,
        initialize
    }
})()