<template>
  <v-app>
    <v-main>
      <p> {{ $t("restartDialogue") }}</p>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>

