<script lang="ts">
  import Index from "./pages/Index.svelte";
  import Topics from "./pages/Topics.svelte";

  import { appPage } from "./lib/stores/index";
</script>

{#if $appPage === "Index"}
  <Index />
{:else}
  <Topics />
{/if}

<style></style>
