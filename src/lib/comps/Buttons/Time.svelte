<script lang="ts">
	import type Video from '$types/video'
	import secondsToDuration from 'seconds-to-duration'

	export let formattedCurrentTime: string
	export let duration: Video.Duration
</script>

<div class="time-display">
	{#if duration}
		<span>
			{ formattedCurrentTime }
		</span>
		<span> / </span>
		<span>{ duration ? secondsToDuration(duration) : '00:00' }</span>
	{/if}
</div>

<style lang="scss">
	.time-display {
		font-size: 1.23em;
		font-family: inherit;
		display: inline-block;
		vertical-align: top;
		padding: 0 5px;
		white-space: nowrap;
		line-height: 39px;
		touch-action: none;
		user-select: none;
		-webkit-user-select: none;
		-webkit-touch-callout:none;
		opacity: 0.9;
	}
</style>