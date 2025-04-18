<script lang="ts">
    import { Spring } from "svelte/motion";


    interface Props {
        margin:number, 
        topPadding:number
    }

    const {margin, topPadding}: Props = $props()


    let currentScroll = $state(0);
    let ref: HTMLDivElement | undefined = $state();
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    let snapping = $state(false);
    let spring = new Spring(
        { scroll: 0 },
        {
            precision: 1,
        },
    );

    $effect(() => {
        if (snapping) {
            return;
        }

        if (timer !== undefined) {
            clearTimeout(timer);
        }

        const top = ref?.offsetTop ?? 0;
        const diff = Math.abs(currentScroll - top);

        if (diff < margin && diff > 5) {
            timer = setTimeout(() => {
                snap(top);
                timer = undefined;
            }, 500);
        }
    });

    $effect(() => {
        if (snapping) {
            window.scrollTo({
                top: spring.current.scroll,
            });

            if (Math.abs(spring.current.scroll - spring.target.scroll) < 1) {
                snapping = false;
            }
        }
    });

    function snap(top: number) {
        spring.set(
            { scroll: window.scrollY },
            {
                instant: true,
            },
        );
        spring.set({ scroll: top - topPadding });
        snapping = true;
    }
</script>

<svelte:window bind:scrollY={currentScroll} />

<div bind:this={ref}></div>
