import { writable } from 'svelte/store';

export default writable({
    nativeHlsSupport: false,
    mediaSourceSupport: false
})