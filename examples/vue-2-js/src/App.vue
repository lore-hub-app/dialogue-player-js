<template>
  <div class="ff7">
    <div>
      <div v-for="(item, index) in content" :key="item.id">
        <span v-if="index !== 0">&ldquo;</span>{{ item.value
        }}<span v-if="index !== 0">&ldquo;</span>
      </div>
    </div>

    <div>
      <button v-if="!this.dialog.finished" @click="next">Next</button>
    </div>
  </div>
</template>

<script>
import { Dialog, DialogNode, DialogTextContent } from "lorehub-dialog-player";

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
      [
        new DialogTextContent("text-1", "Cloud"),
        new DialogTextContent("text-2", "But it is time to say bye!"),
      ],
      null
    );

    const startNode = new DialogNode(
      "node-1",
      [
        new DialogTextContent("text-3", "Cloud"),
        new DialogTextContent(
          "text-4",
          "No one lives in the slums because they want to. It's like this train. It can't run anywhere except where its rails take it."
        ),
      ],
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
/* Final Fantasy VII Style from https://codepen.io/Kaizzo/pen/aGWwMM */

body {
  background-color: black;
  background-repeat: no-repeat;
  background-position: -150px 0;
}

div.ff7 {
  border: solid 1px #424542;
  box-shadow: 1px 1px #e7dfe7, -1px -1px #e7dfe7, 1px -1px #e7dfe7,
    -1px 1px #e7dfe7, 0 -2px #9c9a9c, -2px 0 #7b757b, 0 2px #424542;
  width: 500px;
  padding: 5px 10px;
  margin: 50px 50px;

  background: #04009d;
  background: -moz-linear-gradient(top, #04009d 0%, #06004d 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #04009d),
    color-stop(100%, #06004d)
  );
  background: -webkit-linear-gradient(top, #04009d 0%, #06004d 100%);
  background: -o-linear-gradient(top, #04009d 0%, #06004d 100%);
  background: -ms-linear-gradient(top, #04009d 0%, #06004d 100%);
  background: linear-gradient(to bottom, #04009d 0%, #06004d 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#04009d', endColorstr='#06004d',GradientType=0 );

  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  border-radius: 7px;
}
div.ff7 * {
  color: #eff1ff;
  text-shadow: 2px 2px #212421, 1px 1px #212021;
  font-family: Verdana, sans-serif;
  font-size: 20px;
  font-weight: normal;
  margin: 5px 0;
}
</style>
