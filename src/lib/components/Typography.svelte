<script>
    let fontWeight = 400;
    let fontStretch = 100;
</script>

<div class="w-screen flex items-center justify-center my-40">
    <div class="max-w-[80rem] grid lg:grid-cols-2 lg:gap-20">
        <div class="flex flex-col">
            <span class="text-[#57585B] mb-3 text-xs">WHAT IS YOUR SPARK?</span>
            <span style="font-variation-settings: 'wdth' {fontStretch}; font-weight: {fontWeight}; transition: font-stretch 0.2s ease, font-weight 0.2s ease;" class="text-[#242424] mb-15 text-4xl text-balance">A spark is what drives you to push the boundaries of your own innovation.</span>

            <button>
            <a href="" class="group text-[#242424] text-base font-bold flex flex-row gap-1"><div>WATCH FILM</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="mt-1 size-2.5 group-hover:rotate-45 transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  
            </a>
        </button>
        </div>

        <div class="flex flex-col">
            <span class="text-[#57585B] mb-3 text-xs">WHAT IS YOUR JAM?</span>
            <span style="font-variation-settings: 'wdth' {fontStretch}; font-weight: {fontWeight}; transition: font-stretch 0.2s ease, font-weight 0.2s ease;" class="text-[#242424] mb-15 text-4xl text-balance">A jam is the unique spark inside you, made visible for everyone to see.</span>
            
            <button>
            <a href="" class="group text-[#242424] text-base font-bold flex flex-row gap-1"><div>WATCH FILM</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="mt-1 size-2.5 group-hover:rotate-45 transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  
            </a>
            </button>
        </div>

        <div>
            <input type="range" id="range-weight" name="weight" min="200" max="900" bind:value={fontWeight}>
            <input type="range"id="range-stretch" name="stretch" min="50" max="200" bind:value={fontStretch}>
            <p></p>
        </div>
    </div>
</div>