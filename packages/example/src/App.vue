<template>
  <div>
    <h1>Hello this example</h1>
    <button @click="sendMessage" test-id="load-dialogue-1">Load dialogue #1</button>
    <div>
      <iframe ref="player" test-id="frame" src=" http://localhost:3000" height="500px" width="100%"></iframe>
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

window.addEventListener('message', function (e) {
  const data = e.data;
  if (data.message === "dialogue-player-warnings") {
    console.log(data);
  }
  if (data.message === 'dialogue-player-current-node-id') {
    console.log(data);
  }
});

</script>
