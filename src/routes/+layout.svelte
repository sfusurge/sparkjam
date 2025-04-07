<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import ViewTransitionSlideWrapper, {
		transitionType
	} from '$lib/Components/utils/ViewTransitionSlideWrapper.svelte';
	import { tick } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onNavigate(async (nav) => {
		// all pages here triggers transition animation
		if (!document.startViewTransition) {
			return; // browser doesnt support view transition api, abort.
		}
		
		if (nav.type === 'popstate' && nav.delta == -1) {
			transitionType.reverse = true;
			await tick();
		}else{
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

<ViewTransitionSlideWrapper>
	{@render children()}
</ViewTransitionSlideWrapper>
