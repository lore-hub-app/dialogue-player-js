<template>
  <div class="dialog-player">
    <div class="justify-center mb-6">
      <div class="dialog-card">
        <div v-for="item in content" :key="item.id">
          {{ item.index }} {{ item.value }}
        </div>
      </div>
    </div>

    <div class="justify-center mb-6">
      <button v-if="!this.dialog.finished" @click="next">Next</button>
    </div>
  </div>
</template>

<script>
import { Dialog, DialogNode, DialogTextContent } from "../../../src/index";

export default {
  name: "App",
  data() {
    return {
      dialog: null,
    };
  },
  computed: {
    content() {
      return this.dialog.currentNode.content;
    },
  },
  created() {
    const lastNode = new DialogNode(
      "node-2",
      new DialogTextContent("text-2", "Bye!"),
      null
    );

    const startNode = new DialogNode(
      "node-1",
      new DialogTextContent("text-1", "Hi!"),
      lastNode
    );

    this.dialog = new Dialog("dialog-1", startNode);
  },
  methods: {
    next() {
      this.dialog.currentNode.goNext();
    },
  },
};
</script>

<style>
</style>
