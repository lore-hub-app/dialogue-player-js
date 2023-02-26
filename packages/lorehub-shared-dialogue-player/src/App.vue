<template>
  <iframe ref="player" src="https://embedded-player.lorehub.app" height="500px" width="100%"></iframe>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const player = ref(null);

onMounted(() => {
  const query = window.location.search.substring(1);
  const queryParams = query.split('&');
  const asObject: any = {
    worldId: null,
    storyId: null,
    dialogueId: null,
    code: null
  }
  for (let i = 0; i < queryParams.length; i++) {
    const param = queryParams[i];
    const split = param.split("=");
    asObject[split[0]] = split[1];
  }
  const baseUrl = 'https://lorehub-webapi-as-westeurope-p.azurewebsites.net';
  axios.get(`${baseUrl}/api/Export/ExportSharedDialogue/${asObject.worldId}/${asObject.storyId}/${asObject.dialogueId}/${asObject.code}`)
    .then(r => {
      window.setTimeout(() => {
        initDialogue(r);
      }, 500)
    })
})

function initDialogue(jsonDialogue: any) {
  if (player.value == null) return;
  const playerDom = player.value as HTMLIFrameElement;
  playerDom.contentWindow?.postMessage(JSON.stringify(jsonDialogue), "*");
}

</script>
