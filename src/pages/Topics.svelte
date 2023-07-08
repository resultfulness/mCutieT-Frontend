<script lang="ts">
  import Input from "../lib/Input.svelte";

  import { topics, appPage } from "../lib/stores/index";

  let topic: string = "",
    name: string = "";

  function handleDeleteTopic(topic: string) {
    topics.update((prev) => [...prev.filter((t) => t.topic !== topic)]);
  }

  function handleAddTopic() {
    if (!topic) return;
    if (!name) name = topic;

    const newTopic = { topic, name };

    const oldTopic = $topics.find((t) => t.topic === topic);

    if (oldTopic) {
      topics.update((prev) => [
        ...prev.filter((t) => t.topic !== topic),
        newTopic,
      ]);
      return;
    }

    topics.update((prev) => [...prev, newTopic]);
  }
</script>

<div class="container">
  <button on:click={() => ($appPage = "Index")} class="material-icons back">
    arrow_back
  </button>
  <main>
    {#if $topics.length > 0}
      {#each $topics as { topic, name }}
        <div class="topic-entry">
          <span class="name">{name}</span>
          <span class="topic">{topic}</span>
          <form on:submit|preventDefault={() => handleDeleteTopic(topic)}>
            <input
              type="text"
              value={topic}
              style="display:none;"
              name="topic"
            />
            <button class="material-icons delete"> delete </button>
          </form>
        </div>
      {/each}
    {:else}
      <p>You have no topics yet!</p>
    {/if}
  </main>

  <form on:submit|preventDefault={handleAddTopic} class="add">
    <Input bind:value={name} placeholder="Name" name="name" />
    <Input required bind:value={topic} placeholder="Topic" name="topic" />
    <button class="material-icons">add</button>
  </form>
</div>
_

<style>
  .container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100vh;
    height: 100dvh;
  }

  main {
    padding: 1.5rem;
    overflow: scroll;
  }

  .topic-entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.75rem;
    background-color: #121212;
  }

  .topic {
    font-weight: 300;
  }

  button.delete {
    padding: 0;
    border: 0;
    background: var(--clr-btn-gradient);
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  form.add {
    display: flex;
    justify-content: center;
    align-items: end;
    gap: 1rem;
    padding: 1.5rem;
    background-color: var(--clr-bg-secondary);
  }

  form.add > button {
    border: 0;
    border-radius: 50%;
    padding: 0.5rem;
    font-size: 2rem;
    cursor: pointer;
    background: var(--clr-btn-gradient);
  }

  button.back {
    border: 0;
    margin: 1rem;
    background-color: transparent;
    cursor: pointer;
    font-size: 32px;
    text-align: left;
  }
</style>
