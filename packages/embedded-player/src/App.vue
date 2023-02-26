<template>
  <v-app>
    <v-main>
      <DialoguePlayer v-if="jsonDialogue" :json="jsonDialogue" />
      <div v-else class="pa-8">
        <p>
          Dialogue is not loaded.
        </p>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, Ref } from 'vue';
// import jsonDialogue from '@/assets/example-dialogue-json.json';
import DialoguePlayer from './components/DialoguePlayer.vue';

window.addEventListener("message", (event) => loadJsonFromParent(event));

const jsonDialogue = ref(null)

function loadJsonFromParent(event: MessageEvent<any>) {
  console.log('Received JSON', event.data);
  const asJson = JSON.parse(event.data);
  jsonDialogue.value = asJson;
}
</script>

<style>
</style>
