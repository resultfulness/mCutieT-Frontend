<script lang="ts">
  import Button from "./Button.svelte";
  import Input from "./Input.svelte";
  import { appData } from "./stores/index";

  let extended: boolean = false;

  function toggleExtended() {
    extended = !extended;
  }

  let { username, password, ip, port } = $appData;

  function handleUpdateSettings() {
    appData.set({ username, password, ip, port });
    window.location.reload();
  }
</script>

<div class:hidden={!extended}>
  <button on:click={toggleExtended} class="extender">
    <h2>Settings</h2>
    <span class="material-icons">
      {extended ? "expand_more" : "expand_less"}
    </span>
  </button>
  <form on:submit|preventDefault={handleUpdateSettings}>
    <Input required bind:value={username} label="Username:" name="username" />
    <Input
      type="password"
      required
      bind:value={password}
      label="Password:"
      name="password"
    />
    <Input required bind:value={ip} label="IP Address:" name="ip" />
    <Input type="number" required bind:value={port} label="Port:" name="port" />
    <Button style="margin-top: 1.5rem;">Save</Button>
  </form>
</div>

<style>
  div {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: var(--clr-bg-secondary);
    transition: transform 400ms ease-out;
  }

  h2 {
    margin: 0;
  }

  button.extender {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 0;
    width: 100%;
    cursor: pointer;
    background-color: transparent;
    color: inherit;
  }

  .hidden {
    transform: translateY(calc(100% - 36px - 2rem));
  }

  form {
    display: grid;
    gap: 0.5rem;
    margin: 2rem auto;
    max-width: 300px;
  }
</style>
