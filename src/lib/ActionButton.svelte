<script lang="ts">
  export let iconLabel: boolean = false;
  export let label: string;
  export let isOn: boolean;
  export let onClick: () => void;
</script>

<button
  class:material-icons={iconLabel}
  class:on={isOn}
  on:click={onClick}
  class:not-icon={!iconLabel}
>
  <span>{label}</span>
</button>

<style>
  button {
    position: relative;
    border-radius: 50%;
    border: 0;
    padding: 3rem;
    aspect-ratio: 1;
    cursor: pointer;
    background-color: #666;
    font-size: 6rem;
  }

  button.not-icon {
    font-family: "Space Grotesk", sans-serif;
    font-size: 3rem;
    font-weight: 300;
    padding: 0.5rem 2.5rem;
  }

  button::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: 50%;
    opacity: 0;
    background: var(--clr-btn-gradient);
    transition: opacity 200ms;
  }

  button.on::after {
    opacity: 1;
  }

  button > span {
    position: relative;
    z-index: 2;
  }
</style>
