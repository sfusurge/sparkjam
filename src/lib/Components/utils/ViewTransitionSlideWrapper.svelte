<script module lang="ts">
	type SlideDirection = 'left' | 'right' | 'up' | 'down';
	type CrossFadeSlideDirection = 'fadeLeft' | 'fadeRight' | 'fadeUp' | 'fadeDown';
	interface SlideTranitionProps {
		transition: SlideDirection | CrossFadeSlideDirection | 'none';
		reverse: boolean;
	}

	export const transitionType = $state<SlideTranitionProps>({
		transition: 'left',
		reverse: false
	});
</script>

<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { tick } from 'svelte';

	const { children } = $props();

	function directionMap({ transition: direction, reverse }: SlideTranitionProps) {
		if (!reverse) {
			return direction;
		}

		if (reverse) {
			switch (direction) {
				case 'up':
					return 'down';
				case 'down':
					return 'up';
				case 'left':
					return 'right';
				case 'right':
					return 'left';
				case 'fadeDown':
					return 'fadeUp';
				case 'fadeLeft':
					return 'fadeRight';
				case 'fadeRight':
					return 'fadeLeft';
				case 'fadeUp':
					return 'fadeDown';
				default:
					return '';
			}
		}
	}

	onNavigate(async (nav) => {
		// all pages here triggers transition animation
		if (!document.startViewTransition) {
			return; // browser doesnt support view transition api, abort.
		}

		if (nav.type === 'popstate' && nav.delta == -1) {
			transitionType.reverse = true;
			await tick();
		} else {
			transitionType.reverse = false;
			await tick();
		}

		return new Promise((res) => {
			document.startViewTransition(async () => {
				res();
				await nav.complete;
			});
		});
	});
</script>

<div class="transitionWrapper" style="view-transition-name: {directionMap(transitionType)};">
	{@render children()}
</div>

<style>
	.transitionWrapper {
		min-height: 100dvh;
		min-width: 100dvw;
	}

	/* Left */
	@keyframes slideLeftIn {
		from {
			transform: translate(100%, 0);
		}

		to {
			transform: translate(0, 0);
		}
	}

	@keyframes slideLeftOut {
		from {
			transform: translate(0, 0);
		}

		to {
			transform: translate(-100%, 0);
		}
	}

	::view-transition-new(left) {
		animation: slideLeftIn 500ms ease-out;
	}

	::view-transition-old(left) {
		animation: slideLeftOut 500ms ease-out;
	}

	::view-transition-new(right) {
		animation: slideLeftOut 500ms ease-out reverse;
	}

	::view-transition-old(right) {
		animation: slideLeftIn 500ms ease-out reverse;
	}

	/* UP */

	@keyframes slideUpIn {
		from {
			transform: translate(0, 100%);
		}

		to {
			transform: translate(0, 0);
		}
	}

	@keyframes slideUpOut {
		from {
			transform: translate(0, 0);
		}

		to {
			transform: translate(0, -100%);
		}
	}

	::view-transition-new(up) {
		animation: slideUpIn 500ms ease-out both;
	}

	::view-transition-old(up) {
		animation: slideUpOut 500ms ease-out both;
	}

	::view-transition-new(down) {
		animation: slideUpOut 500ms ease-out both reverse;
	}

	::view-transition-old(down) {
		animation: slideUpIn 500ms ease-out both reverse;
	}
</style>
