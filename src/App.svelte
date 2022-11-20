<script lang="ts">
  import Player from "./lib/Player.svelte";

  let video = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  let video2 = 'https://srv1.sadio.li/videos/2021/12/bonnlvfPPxC/hls/hls_master_h264.m3u8'
  let video3 = 'https://srv1.sadio.li/videos/2022/9/qLDP2KlilBA/hls/hls_master_h264.m3u8'

  let src = video

  function changeSrc() {
    if (src === video) {
      src = video2
    } else if (src === video2) {
      src = video3
    } else {
      src = video
    }
  }

  function multiplePlayer() {

  }
</script>

<!-- <main>
  <Player 
		videoSrc={src}
    controlsType={'desktop'}
	/>
</main> -->

<main class="clip">
  <Player 
		videoSrc={src}
    controlsType={'minimal'}
	/>
  <Player 
		videoSrc={video2}
    controlsType={'minimal'}
	/>
</main>

<div class="controls">
  <button on:click={changeSrc}>Change src</button>
  <button on:click={multiplePlayer}>Multiple Players</button> 
</div>

<style>
  main {
    width: 100%;
    height: 100%;
    margin-top: 40px;
  }
  .clip {
    aspect-ratio: 9/16;
    height: 70vh;
    width: auto;
  }

  .controls {
    position: absolute;
    top: 0;
  }
</style>