<script lang="ts">
  import Player from "./lib/Player.svelte";
</script>

<main>
  <Player 
		videoSrc={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'}
    controlsType={'desktop'}
	/>
</main>

<!-- <main class="clip">
  <Player 
		videoSrc={'https://srv1.sadio.li/videos/2021/12/bonnlvfPPxC/hls/hls_master_h264.m3u8'}
    controlsType={'minimal'}
	/>
</main> -->

<style>
  main {
    width: 100%;
    height: 100%;
  }
  .clip {
    aspect-ratio: 9/16;
    height: 70vh;
  }
</style>