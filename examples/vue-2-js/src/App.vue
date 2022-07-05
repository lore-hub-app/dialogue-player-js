<template>
  <div>
    <!-- State -->
    <div style="display:flex">
      <div>
        <h2>State, Variables:</h2>
        <div v-for="variable in variables" :key="variable.id">{{ variable.name }}: {{ variable.currentValue }}</div>
      </div>
      <div>
        <h2>State, Variables:</h2>
        <div>is_arthut_dead: true</div>
        <div>is_arthut_dead: true</div>
      </div>
    </div>

    <!-- FINISH SCREEN -->
    <div v-if="dialog.isFinished">THE END</div>

    <!-- DIALOG -->
    <div v-else class="ff7">
      <div>
        <div v-for="(item, index) in content" :key="index">
          <span v-if="index !== 0">&ldquo;</span>{{ item.text
          }}<span v-if="index !== 0">&ldquo;</span>
        </div>
      </div>
      <div v-if="!dialog.finished">
        <div v-if="dialog.currentNode.options && dialog.currentNode.options.length === 0" class="btn"
          @click="next(dialog.currentNode.nextNode)">
          > Next
        </div>
        <div class="btn" v-for="(option, index) in dialog.currentNode.options" :key="index"
          @click="next(option.nextNode)">
          > {{ option.text }}
        </div>
      </div>
    </div>

    <div>
      <div v-for="(command, index) in commands" :key="index">
        {{ command.toString() }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  Dialogue,
  DialogueNode,
  DialogueTextContent,
  DialogueReferenceContent,
  DialogueNodeOption,
  GoToNextNode,
  convertExportDataToDialogue
} from "../../../lib/src/index";
import json from '../../../lib/tests/examples/scene-01'

export default {
  name: "App",
  data() {
    return {
      dialog: null,
      commands: [],
    };
  },
  computed: {
    currentNode() {
      return this.dialog?.currentNode;
    },
    content() {
      if (this.currentNode) {
        return this.currentNode.content;
      } else {
        return "dd";
      }
    },
    variables() {
      return this.dialog.variables
    }
  },
  created() {
    this.dialog = convertExportDataToDialogue(json);
  },
  methods: {
    next(nextNode) {
      const command = new GoToNextNode(this.dialog, nextNode);
      command.execute();
      this.commands.push(command);
    },
  },
};
</script>
<style>
.btn {
  cursor: pointer;
}

/* Final Fantasy VII Style from https://codepen.io/Kaizzo/pen/aGWwMM */
body {
  background-color: black;
  color: white;
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
  background: -webkit-gradient(linear,
      left top,
      left bottom,
      color-stop(0%, #04009d),
      color-stop(100%, #06004d));
  background: -webkit-linear-gradient(top, #04009d 0%, #06004d 100%);
  background: -o-linear-gradient(top, #04009d 0%, #06004d 100%);
  background: -ms-linear-gradient(top, #04009d 0%, #06004d 100%);
  background: linear-gradient(to bottom, #04009d 0%, #06004d 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#04009d', endColorstr='#06004d', GradientType=0);
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
