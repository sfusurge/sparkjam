<script lang="ts">
    import { SvelteDate } from "svelte/reactivity";

    let images = [
        "BigAsterisk.svg",
        "BigOtter.svg",
        "BigPencil.svg",
        "BigSparkle.svg",
        "BigSurge.svg",
    ];
    let currentTime = new SvelteDate();
    let currentImage1 = $state(Math.floor(Math.random() * (4 - 0 + 1)));
    let currentImage2 = $state(Math.floor(Math.random() * (4 - 0 + 1)));

    $effect(() => {
        const interval = setInterval(() => {
            currentTime.setTime(Date.now());
        }, 1000);

        const src = setInterval(() => {
            currentImage1 = Math.floor(Math.random() * (4 - 0 + 1));
            currentImage2 = Math.floor(Math.random() * (4 - 0 + 1));
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(src);
        };
    });
</script>

<div class="sponsorRoot">

    <div class="sponsorsParent">
        <h1 style="font-weight: 400; font-size:40px; margin-bottom: 3rem;">Our Sponsors:</h1>

        <div class="sponsorsContainer">
            <a href="https://indomieonline.ca/" class="sponsor" target="_blank"><img src="Indomie_Logo.png" alt="Indomie logo"></a>
            <a href="https://www.bobatalks.com/" class="sponsor" target="_blank"><img src="BobaTalks_Logo.png" alt="Bobatalks logo"></a>
        </div>
    </div>

    <img src={images[currentImage1]} alt="Big SFU Otter" class="otter" />
    <img src={images[currentImage2]} alt="Big SFU Surge Logo" class="surge" />
</div>

<style>


    .sponsorsParent {
        max-width: 1280px;
    
        margin: 8rem auto;
        margin-top: 6rem;
    }

    .sponsorsContainer {
        display: flex;
        justify-content: space-around;
    }

    .sponsor {
        display: flex ;
        align-items: center;
        max-width: 450px;
        padding: 1rem;
        border: 1px solid transparent;

        transition: 100ms ease-out border-color;
    }

    .sponsor:hover{
        border-color:  var(--black);
    }

    .sponsorRoot {
        
        max-height: 100dvh;
        position: relative;

        border-bottom: 1px solid var(--grey);
        overflow: hidden;
    }

    .otter {
        position: absolute;
        left: -50px;
        bottom: -100px;

        width: 300px;
        max-width: 40dvw;

        @media screen and (max-width: 600px) {
            bottom: -70px;
        }
    }

    .surge {
        position: absolute;
        right: -50px;
        bottom: -100px;

        width: 300px;
        max-width: 40dvw;

        transform: scale(-1, 1);

        @media screen and (max-width: 600px) {
            bottom: -50px;
        }
    }
</style>
