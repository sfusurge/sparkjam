<script lang="ts">
    import type {
        CanvasController,
        UserData,
    } from "$lib/components/canvas/canvas_controller.svelte";
    import MultiplayerCanvas from "$lib/components/canvas/MultiplayerCanvas.svelte";
    import CanvasToolBar from "$lib/components/canvas/picker/CanvasToolBar.svelte";
    import { onMount } from "svelte";


    let userdata: UserData = $state({
        username: "",
        penInfo: {
            color: "",
            layer: -1,
            name: "",
            size: -1,
            smooth: false,
        },
    });

    let canvasController = $state<CanvasController | undefined>();
    let innerWidth = $state(0);
    let innerHeight = $state(0);

    let wrapperDiv: HTMLDivElement | undefined = $state();
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    let resizing = $state(false);

    onMount(() => {
        window.addEventListener("resize", () => {
            canvasController?.forceRender();
            resizing = true;
            innerWidth = wrapperDiv?.clientWidth ?? 0;
            innerHeight = wrapperDiv?.clientHeight ?? 0;

            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                resizing = false;
            }, 100);
        });

        innerWidth = wrapperDiv?.clientWidth ?? 0;
        innerHeight = wrapperDiv?.clientHeight ?? 0;
    });
</script>

<div bind:this={wrapperDiv} class="canvasWrapper" class:hiddenCanvas={resizing}>
    <MultiplayerCanvas
        maxLayers={2}
        size={{ height: innerHeight, width: innerWidth }}
        {userdata}
        bind:canvasController
    />

    <CanvasToolBar bind:userdata bind:canvasController />
</div>

<style>
    .canvasWrapper {
        width: 100%;
        height: 100%;
        position: relative;
        opacity: 1;
        filter: opacity(1);
        transition: opacity 200ms ease-out;
    }
    .hiddenCanvas {
        filter: opacity(0);
        opacity: 0;
    }
</style>
