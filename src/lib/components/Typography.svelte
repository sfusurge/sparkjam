<script>
    import InputBar from "$lib/components/InputBar.svelte";
    import RainbowButton from "./RainbowButton.svelte";

    let fontWeight = $state(400);
    let fontStretch = $state(100);

    function randomize() {
        fontWeight = Math.floor(Math.random() * (900 - 200 +1) + 200);
        fontStretch = Math.floor(Math.random() * (200 - 50 + 1) + 50);
    }
</script>

<div class="w-screen max-w-[1920px] flex flex-col gap-20 md:gap-32 items-center justify-center p-12 md:p-20">
    <div class="max-w-[80rem] grid lg:grid-cols-2 gap-32 lg:gap-20">
        <div class="flex flex-col">
            <span class="text-[#57585B] mb-3 text-xs">WHAT IS YOUR SPARK?</span>
            <span
                style="font-variation-settings: 'wdth' {fontStretch}; font-weight: {fontWeight}; transition: font-stretch 0.2s ease, font-weight 0.2s ease;"
                class="text-[#242424] mb-14 text-4xl text-balance"
                >A spark is what drives you to push the boundaries of your own innovation.</span
            >

            <button class="flex justify-end md:justify-start">
                <a href="" class="group text-[#242424] text-base font-bold flex flex-row gap-1"
                    ><div>WATCH FILM</div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="4"
                        stroke="currentColor"
                        class="mt-1 size-2.5 group-hover:rotate-45 transition-transform"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        ></path>
                    </svg>
                </a>
            </button>
        </div>

        <div class="flex flex-col">
            <span class="text-[#57585B] mb-3 text-xs">WHAT IS YOUR JAM?</span>
            <span
                style="font-variation-settings: 'wdth' {fontStretch}; font-weight: {fontWeight}; transition: font-stretch 0.2s ease, font-weight 0.2s ease;"
                class="text-[#242424] mb-14 text-4xl text-balance"
                >A jam is the unique spark inside you, made visible for everyone to see.</span
            >

            <button class="flex justify-end md:justify-start">
                <a href="" class="group text-[#242424] text-base font-bold flex flex-row gap-1"
                    ><div>WATCH FILM</div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="4"
                        stroke="currentColor"
                        class="mt-1 size-2.5 group-hover:rotate-45 transition-transform"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        ></path>
                    </svg>
                </a>
            </button>
        </div>
    </div>

    <div class="flex flex-col items-center md:flex-row gap-6">
        <InputBar min={200} max={900} bind:value={fontWeight}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6">
            <path stroke-linejoin="round" d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z" />
          </svg>
          </InputBar>
        <InputBar min={50} max={200} bind:value={fontStretch}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 11.9999C15 12.1988 14.921 12.3896 14.7803 12.5302C14.6397 12.6709 14.4489 12.7499 14.25 12.7499H3.61201L7.77001 16.7099C7.84435 16.7773 7.9044 16.859 7.9466 16.9501C7.98881 17.0411 8.0123 17.1398 8.01569 17.2401C8.01908 17.3404 8.00229 17.4404 7.96634 17.5341C7.93038 17.6278 7.87598 17.7133 7.80635 17.7856C7.73673 17.8579 7.6533 17.9155 7.56102 17.955C7.46873 17.9945 7.36945 18.015 7.26908 18.0154C7.16871 18.0158 7.06928 17.996 6.97668 17.9573C6.88408 17.9186 6.8002 17.8616 6.73001 17.7899L1.23001 12.5399C1.15742 12.4699 1.09968 12.386 1.06025 12.2933C1.02081 12.2005 1.00049 12.1007 1.00049 11.9999C1.00049 11.8991 1.02081 11.7993 1.06025 11.7065C1.09968 11.6137 1.15742 11.5298 1.23001 11.4599L6.73001 6.20989C6.8002 6.13814 6.88408 6.08121 6.97668 6.04247C7.06928 6.00374 7.16871 5.98398 7.26908 5.98438C7.36945 5.98478 7.46873 6.00532 7.56102 6.04479C7.6533 6.08425 7.73673 6.14184 7.80635 6.21414C7.87598 6.28644 7.93038 6.37199 7.96634 6.4657C8.00229 6.55941 8.01908 6.65939 8.01569 6.7597C8.0123 6.86002 7.98881 6.95863 7.9466 7.0497C7.9044 7.14077 7.84435 7.22245 7.77001 7.28989L3.61201 11.2499H14.25C14.4489 11.2499 14.6397 11.3289 14.7803 11.4696C14.921 11.6102 15 11.801 15 11.9999Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00048 11.9999C9.00048 12.1988 9.0795 12.3896 9.22015 12.5302C9.3608 12.6709 9.55157 12.7499 9.75048 12.7499H20.3885L16.2305 16.7099C16.1561 16.7773 16.0961 16.859 16.0539 16.9501C16.0117 17.0411 15.9882 17.1398 15.9848 17.2401C15.9814 17.3404 15.9982 17.4404 16.0342 17.5341C16.0701 17.6278 16.1245 17.7133 16.1941 17.7856C16.2638 17.8579 16.3472 17.9155 16.4395 17.955C16.5318 17.9945 16.631 18.015 16.7314 18.0154C16.8318 18.0158 16.9312 17.996 17.0238 17.9573C17.1164 17.9186 17.2003 17.8616 17.2705 17.7899L22.7705 12.5399C22.8431 12.4699 22.9008 12.386 22.9402 12.2933C22.9797 12.2005 23 12.1007 23 11.9999C23 11.8991 22.9797 11.7993 22.9402 11.7065C22.9008 11.6137 22.8431 11.5298 22.7705 11.4599L17.2705 6.20989C17.2003 6.13814 17.1164 6.08121 17.0238 6.04247C16.9312 6.00374 16.8318 5.98398 16.7314 5.98438C16.631 5.98478 16.5318 6.00532 16.4395 6.04479C16.3472 6.08425 16.2638 6.14184 16.1941 6.21414C16.1245 6.28644 16.0701 6.37199 16.0342 6.4657C15.9982 6.55941 15.9814 6.65939 15.9848 6.7597C15.9882 6.86002 16.0117 6.95863 16.0539 7.0497C16.0961 7.14077 16.1561 7.22245 16.2305 7.28989L20.3885 11.2499H9.75048C9.55157 11.2499 9.3608 11.3289 9.22015 11.4696C9.0795 11.6102 9.00048 11.801 9.00048 11.9999Z" fill="black"/>
                </svg>
                
        </InputBar>
        <RainbowButton style="" disableArrow={true}><a class="flex flex-row gap-2" onclick={randomize}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
              </svg>
              <span >RANDOMIZE</span>
            </a>
        </RainbowButton>
    </div>
</div>

<style>
</style>
