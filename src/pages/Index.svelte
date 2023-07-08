<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import SettingsBar from "../lib/SettingsBar.svelte";
  import { topics, appPage, currentTopic, appData } from "../lib/stores/index";

  import * as mqtt from "mqtt/dist/mqtt.min";

  let client: mqtt.MqttClient;

  onMount(async () => {
    topic = $currentTopic;

    client = mqtt.connect(`wss://${$appData.ip}:${$appData.port}`, {
      username: $appData.username,
      password: $appData.password,
    });

    client.on("connect", () => {
      client.subscribe(topic);
    });

    client.on("message", (receivedTopic, msg) => {
      if (topic === receivedTopic) on = msg.toString() === "1";
    });
  });

  onDestroy(() => client.end());

  let on: boolean;

  let topic: string;

  function toggleTopicMessage() {
    client.publish(topic, on ? "0" : "1", {
      retain: true,
      qos: 2,
    });
  }
</script>

<div class="topic-selection">
  <select
    bind:value={topic}
    name="topics"
    on:change={() =>
      currentTopic.update((prev) => {
        client.unsubscribe(prev);
        client.subscribe(topic);
        return topic;
      })}
  >
    {#each $topics as { topic, name }}
      <option value={topic}>{name}</option>
    {/each}
  </select>
  <button class="link material-icons" on:click={() => ($appPage = "Topics")}>
    settings
  </button>
</div>

<main>
  <button class="switch material-icons" class:on on:click={toggleTopicMessage}>
    <span>lightbulb</span>
  </button>
</main>

<SettingsBar />

<style>
  .topic-selection {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    margin: 3rem auto;
    max-width: 300px;
  }

  select {
    border: 0;
    border-bottom: 2px solid #666;
    padding: 0.75rem 0.75rem 0.75rem 0;
    background-color: transparent;
    font-size: 1.2rem;
  }

  button.link {
    display: grid;
    place-items: center;
    color: inherit;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  main {
    display: grid;
    place-items: center;
    height: 100vh;
    height: 100dvh;
  }

  button.switch {
    position: relative;
    border-radius: 50%;
    border: 0;
    padding: 3rem;
    aspect-ratio: 1;
    cursor: pointer;
    background-color: #666;
    font-size: 6rem;
  }

  button.switch::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: 50%;
    opacity: 0;
    background: var(--clr-btn-gradient);
    transition: opacity 200ms;
  }

  button.switch.on::after {
    opacity: 1;
  }

  button.switch > span {
    position: relative;
    z-index: 2;
  }
</style>
