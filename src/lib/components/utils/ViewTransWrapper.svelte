<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { tick } from 'svelte';
	import { transitionType, type SlideTranitionProps } from './ViewTransitionState.svelte.ts';

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
		animation: slideLeftIn 400ms ease-out;
	}

	::view-transition-old(left) {
		animation: slideLeftOut 400ms ease-out;
	}

	::view-transition-new(right) {
		animation: slideLeftOut 400ms ease-out reverse;
	}

	::view-transition-old(right) {
		animation: slideLeftIn 400ms ease-out reverse;
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
		animation: slideUpIn 400ms ease-out both;
	}

	::view-transition-old(up) {
		animation: slideUpOut 400ms ease-out both;
	}

	::view-transition-new(down) {
		animation: slideUpOut 400ms ease-out both reverse;
	}

	::view-transition-old(down) {
		animation: slideUpIn 400ms ease-out both reverse;
	}

	@keyframes slideLeftFadeIn {
		from {
			transform: translate(-75px, 0);
			opacity: 0;
		}

		to {
			transform: translate(0, 0);
			opacity: 1;
		}
	}

	@keyframes slideRightFadeIn {
		from {
			transform: translate(75px, 0);
			opacity: 0;
		}

		to {
			transform: translate(0, 0);
			opacity: 1;
		}
	}

	@keyframes slideUpFadeIn {
		from {
			transform: translate(0, -75px);
			opacity: 0;
		}

		to {
			transform: translate(0, 0);
			opacity: 1;
		}
	}

	@keyframes slideDownFadeIn {
		from {
			transform: translate(0, -75px);
			opacity: 0;
		}

		to {
			transform: translate(0, 0);
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	::view-transition-old(fadeLeft),
	::view-transition-old(fadeRight),
	::view-transition-old(fadeDown),
	::view-transition-old(fadeUp) {
		animation: fadeOut 400ms ease-out both;
	}

	::view-transition-new(fadeLeft) {
		animation: slideLeftFadeIn 400ms ease-out both;
	}

	::view-transition-new(fadeRight) {
		animation: slideRightFadeIn 400ms ease-out both;
	}
	::view-transition-new(fadeDown) {
		animation: slideDownFadeIn 400ms ease-out both;
	}
	::view-transition-new(fadeUp) {
		animation: slideUpFadeIn 400ms ease-out both;
	}
</style>
