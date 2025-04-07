<script module lang="ts">
	interface SlideTranitionProps {
		direction: 'left' | 'right' | 'up' | 'down';
		reverse: boolean;
	}

	export const transitionType = $state<SlideTranitionProps>({
		direction: 'left',
		reverse: false
	});
</script>

<script lang="ts">
	const { children } = $props();
    
    
	function directionMap({ direction, reverse }: SlideTranitionProps) {
		if (!reverse) {
			return direction;
		}

		switch (direction) {
			case 'up':
				return 'down';
			case 'down':
				return 'up';
			case 'left':
				return 'right';
			case 'right':
				return 'left';

			default:
				return '';
		}
	}
</script>

<div class="transitionWrapper" style="view-transition-name: {directionMap(transitionType)};">
	{@render children()}
</div>

<style>
	.transitionWrapper {
		min-height: 100dvh;
		min-width: 100dvw;
		outline: 5px solid green;
		outline-offset: -5px;
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
