<script lang="ts">
  export let currentTimePercentage: number;
</script>

<div
  class="play-progress"
  style="left: 0px; transform: scaleX({currentTimePercentage});"
/>

<style lang="scss">
  .play-progress {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ef0857;
    transform-origin: 0px 0px;
  }
</style>
