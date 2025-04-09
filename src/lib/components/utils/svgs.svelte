<script lang="ts" module>
	export { PenSvg, BrushSvg, EraserSvg, MoveSvg };
</script>

{#snippet PenSvg(strokeColor: string, fillColor: string)}
	<svg
		viewBox="0 0 15 20"
		fill={fillColor}
		xmlns="http://www.w3.org/2000/svg"
		style="width: 100%; height:auto; aspect-ratio:1;"
		><path
			d="M6.922 4.129L8.567 1.34C10.313.41 14 1.34 14 4.686l-1.552 2.662m-5.526-3.22L1 14.168 2.164 19l4.463-1.673 5.82-9.98M6.923 4.13l5.526 3.219"
			stroke={strokeColor}
			stroke-width="1.5"
		/></svg
	>
{/snippet}

{#snippet BrushSvg(strokeColor: string, fillColor: string)}
	<svg viewBox="0 0 24 24" fill={fillColor} xmlns="http://www.w3.org/2000/svg"
		><path
			d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0c1.896-1.198 5.503-3.25 8.151-6.268 1.8-2.051 3.876-5.814 3.876-5.814a1.15 1.15 0 00-1.597-1.597S16.197 4.52 14.146 6.32c-3.02 2.65-5.072 6.261-6.271 8.157M9.977 11.201a5.532 5.532 0 012.792 2.792"
			stroke={strokeColor}
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/></svg
	>
{/snippet}

{#snippet EraserSvg(strokeColor: string)}
	<svg
		viewBox="0 0 16 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style="width: 100%; height:auto; aspect-ratio:1;"
		><mask id="prefix__a" fill="#fff"
			><path
				d="M6.644 1.694a2 2 0 012.758-.631l5.11 3.206a2 2 0 01.632 2.757l-4.29 6.839-2.355 3.753L0 12.286l2.317-3.693 4.327-6.899z"
			/></mask
		><path
			d="M1.923 9.231l8.537 5.272.788-1.276L2.71 7.955l-.788 1.276zm6.576 8.387l-.797 1.27 1.27.798.798-1.27-1.27-.798zM0 12.286l-1.27-.797-.798 1.271 1.27.797.798-1.27zm8.604-9.953l5.111 3.206L15.31 3 10.2-.209 8.604 2.333zm.692 14.014L.797 11.016l-1.594 2.541 8.5 5.332 1.593-2.542zm-8.025-3.264L3.588 9.39 1.046 7.796l-2.317 3.693 2.542 1.595zM3.588 9.39l4.327-6.899L5.374.897 1.046 7.796 3.588 9.39zM13.873 6.23l-4.29 6.839 2.541 1.594 4.29-6.84-2.54-1.593zm-4.29 6.839L7.229 16.82l2.54 1.594 2.355-3.753-2.541-1.594zm4.132-7.529a.5.5 0 01.158.69l2.541 1.594a3.5 3.5 0 00-1.105-4.825L13.715 5.54zM10.2-.208A3.5 3.5 0 005.374.897l2.541 1.594a.5.5 0 01.69-.158l1.594-2.54z"
			fill={strokeColor}
			mask="url(#prefix__a)"
		/></svg
	>
{/snippet}

{#snippet MoveSvg(strokeColor: string)}
	<svg
		style="width: 100%; height:auto; aspect-ratio:1; transform: scale(0.8);"
		viewBox="-30 -30 299 303"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		><path
			d="M145.666 146.966l-3.498.679-.81 3.47-24.076 103.157c-3.758 16.1-26.225 17.283-31.654 1.668L6.547 28.435C1.923 15.135 15.013 2.527 28.13 7.647l224.377 87.562c15.401 6.011 13.376 28.418-2.854 31.569l-103.987 20.188z"
			stroke={strokeColor}
			stroke-width="25"
			stroke-linecap="round"
			stroke-linejoin="round"
		/></svg
	>
{/snippet}
