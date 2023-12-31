<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import SettingsBar from "../lib/SettingsBar.svelte";
  import { topics, appPage, currentTopic, appData } from "../lib/stores/index";

  import * as mqtt from "mqtt/dist/mqtt.min";
  import { LightbulbButton, FanButtons } from "../lib/mqttComponents";

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
  });

  onDestroy(() => client.end());

  let topic: string;
  let deviceType: string;
  $: if (topic) deviceType = topic.split("/")[1];

  const deviceTypeComponents = {
    lamp: LightbulbButton,
    fan: FanButtons,
  };
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
  <svelte:component this={deviceTypeComponents[deviceType]} {client} {topic} />
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
</style>
