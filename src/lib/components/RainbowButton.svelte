<script lang="ts">
    let { children } = $props();
</script>

<button class="btn">
    {@render children()}
    <svg id="pointer" width="8" height="8" viewBox="0 0 8 8"  xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7.5L7.5 1M7.5 1H2.5M7.5 1V6" ></path>
    </svg>
</button>

<style>
    .btn {
        position: relative;
        padding: 0.75rem;
        display: flex;
        align-items: center;
        color: var(--white);
        cursor: pointer;
        pointer-events: auto;
    }

    .btn::before {
        content: "";

        position: absolute;
        z-index: -2;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        border: 2px solid var(--black);
        background: var(--rainbow);
    }

    .btn::after {
        content: "";

        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        background-color: var(--black);
        transition: background-color 100ms ease-out;
    }

    .btn:hover::after {
        background-color: transparent;
    }

    .btn:hover {
        color: var(--black);
    }

    #pointer {
        margin-left: 0.5rem;
        width: 0.75rem;
        height: 0.75rem;
        transform: translate(0, 0rem);
        stroke: var(--white);
        transition: transform 100ms ease-out;
    }

    .btn:hover > #pointer{
        stroke:var(--black);
        transform: rotate(45deg);

    }
</style>
