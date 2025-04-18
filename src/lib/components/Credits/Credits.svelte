<script lang="ts">
  import CreditsItem from "./CreditsItem.svelte";
</script>

<div class="flex flex-col w-full items-center">
  <div class="w-full flex border-solid border-black border-b-1 px-12 py-4">
    <span class="text-[#57585B] block max-w-[80rem] w-full mx-auto"
      >(CREDITS)</span
    >
  </div>

  <div
    class="px-12 w-full px-12 py-8"
  >
    <div class="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-y-20 max-w-[80rem] w-full mx-auto xl:pr-80">
      <CreditsItem
        title="LOGISTICS"
        items={[
          "Keyaan Vegdani",
          "Christina Raganit",
          "Matthew Wong",
          "Angela Lim",
        ]}
      />
      <CreditsItem
        title="ART DIRECTION"
        items={["Keyaan Vegdani", "Sandra Cao", "Maggie Chang", "Jaden Lee"]}
      />
      <CreditsItem
        title="DEVELOPMENT"
        items={[
          "Brendan Shen",
          "Christina Raganit",
          "Philip Ho",
          "Ray Gong",
          "Jason Cai",
          "Scott Lai",
        ]}
      />
      <CreditsItem
        title="PRODUCT DESIGN"
        items={[
          "Christina Raganit",
          "Michael Dresler",
          "Kasey Le",
          "Kelvin Kwan",
          "Duc Ngo",
        ]}
      />
      <CreditsItem
        title="EXTERNAL RELATIONS"
        items={["Andrew Kim", "Phil Mbappa", "Victor S."]}
      />
      <CreditsItem
        title="MERCHANDISE"
        items={["Vicky Xu", "Ethan Lauritzen", "Brendan Shen"]}
      />
      <CreditsItem
        title="MARKETING"
        items={["Victor S.", "Josie Trinh", "Kaia Do"]}
      />
      <CreditsItem
        title="PHOTOGRAPHY"
        items={["Anton Panfilonek", "Melody Oh", "Macenzie Scholz"]}
      />
    </div>
  </div>
</div>
