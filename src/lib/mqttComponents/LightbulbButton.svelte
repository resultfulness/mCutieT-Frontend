<script lang="ts">
  import type { MqttClient } from "mqtt/dist/mqtt.min";
  import { onMount } from "svelte";
  import ActionButton from "../ActionButton.svelte";

  export let topic: string;
  export let client: MqttClient;

  function sendTopicMessage() {
    client.publish(topic, isOn ? "0" : "1", {
      retain: true,
      qos: 2,
    });
  }

  function useCurrentState(receivedTopic: string, msg: string) {
    if (topic === receivedTopic) isOn = msg.toString() === "1";
  }

  onMount(() => {
    client.on("message", useCurrentState);
  });

  let isOn: boolean;
</script>

<ActionButton {isOn} onClick={sendTopicMessage} iconLabel label="lightbulb" />
