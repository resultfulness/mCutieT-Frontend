<script lang="ts">
  import type { MqttClient } from "mqtt/dist/mqtt.min";
  import { onMount } from "svelte";
  import ActionButton from "../ActionButton.svelte";

  export let topic: string;
  export let client: MqttClient;

  type FanLevel = "0" | "1" | "2" | "3";

  function sendTopicMessage(level: FanLevel) {
    client.publish(topic, level, {
      retain: true,
      qos: 2,
    });
  }

  function useCurrentState(receivedTopic: string, msg: string) {
    if (topic === receivedTopic) currentLevel = msg.toString();
  }

  onMount(() => {
    client.on("message", useCurrentState);
  });

  let currentLevel: FanLevel = "0";
</script>

<div class="wrapper">
  {#each { length: 4 } as _, i}
    {@const j = i.toString()}
    <ActionButton
      label={j}
      isOn={currentLevel === j}
      onClick={() => sendTopicMessage(j)}
    />
  {/each}
</div>

<style>
  .wrapper {
    display: grid;
    gap: 0.5rem;
  }
</style>
