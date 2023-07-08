<script lang="ts">
  export let onClick: () => void = () => {};
  export let formaction: string | null = null;
  export let style: string = "";
</script>

<button on:click={onClick} {formaction} {style}><slot /></button>

<style>
  button {
    border: 0;
    border-radius: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    background: var(--clr-btn-gradient);
    font-weight: 900;
  }
</style>
