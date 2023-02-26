<template>
  <div>
    <h1>Hello this example</h1>
    <button @click="sendMessage">Start</button>
    <div>
      <iframe ref="player" src=" http://localhost:3000" height="500px" width="100%"></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import jsonDialogue from '../assets/example-dialogue-json.json';
import { ref } from 'vue';

const player = ref(null);


function sendMessage() {
  if (player.value == null) return;
  const playerDom = player.value as HTMLIFrameElement;
  playerDom.contentWindow?.postMessage(JSON.stringify(jsonDialogue), "*");
}

</script>
