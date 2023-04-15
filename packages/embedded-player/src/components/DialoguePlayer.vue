<template>
  <div class="dialog-player pa-12">
    <v-row class="justify-center">
      <v-btn class="ml-4" @click="restartDialogue">
        Restart
      </v-btn>
    </v-row>

    <v-row class="variables-and-metadata-section justify-center">
      <v-col>
        <h3>Current variables values</h3>
        <div v-for="variable in dialogue.variables" :key="variable.id">
          {{ variable.name }}: {{ variable.currentValue }}
        </div>
      </v-col>

      <v-col>
        <h3>Node's meta data</h3>
        <div v-for="(metaData, index) in dialogue.currentNode?.metaData" :key="index">
          {{ getMetaDataName(metaData) }}: {{ metaData.metaSchemaValue }}
        </div>
      </v-col>
      <v-col>
        <h3>This node set variables on start</h3>
        <div v-for="(variable, index) in dialogue.currentNode?.setVariableOnStart" :key="index">
          {{ getVariableName(variable.variableId) }}: {{ variable.value }}
        </div>
      </v-col>
    </v-row>
    <template v-if="dialogue">
      <v-row v-if="!dialogue.isFinished" class="justify-center mb-6">
        <div class="dialog-card">
          <div v-for="(item, index) in dialogue.currentNode?.content" :key="index">
            <span :class="{ 'font-weight-bold': isItDocumentReference(item) }"> {{ item.text }}</span>
          </div>
        </div>
      </v-row>

      <v-row class=" justify-center">
        <div class="options-section">
          <template v-if="!dialogue.isFinished && dialogue.currentNode">
            <v-btn v-if="dialogue.currentNode.options.length === 0" @click="next(dialogue.currentNode as DialogueNode)">
              <v-icon>mdi-numeric-1-box</v-icon>Next
            </v-btn>
            <v-col cols="12" v-for="(option, index) in dialogue.currentNode.options" :key="option.id.fullValue">
              <v-btn @click="next(option as DialogueNodeOption)" :dark="isOptionDisabled(option as DialogueNodeOption)"
                :disabled="isOptionDisabled(option as DialogueNodeOption)">
                <v-icon>mdi-numeric-{{ index + 1 }}-box</v-icon> {{ option.text }}
              </v-btn>
              <span v-for="requiredVar in option.requiredVariables" class="ml-4" :key="requiredVar.variableId">
                Required: <b>{{ getVariableName(requiredVar.variableId) }}</b> to be <b>{{ requiredVar.value }}</b>
              </span>
            </v-col>
          </template>
          <div v-else class="pa-2 text-center white--text" style="width:100%">
            <h2>FIN</h2>
          </div>
        </div>
      </v-row>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import {
  convertExportDataToDialogue,
  Dialogue,
  DialogueNode,
  DialogueNodeOption,
  DialogueReferenceContent,
  GoToNextNode,
  MetaData,
} from "@lorehub/dialogue-player"

const props = defineProps({
  json: Object
})

const result = convertExportDataToDialogue(props.json);
const dialogueFromJson = result.dialogue;
const dialogue = ref(dialogueFromJson);

function isOptionDisabled(option: DialogueNodeOption) {
  return option.isDisabled(dialogue.value.variables);
}

function restartDialogue() {
  const result = convertExportDataToDialogue(props.json);
  const dialogueFromJson = result.dialogue
  dialogue.value = dialogueFromJson;
}

function next(selected: DialogueNode | DialogueNodeOption) {
  const command = new GoToNextNode(dialogue.value as Dialogue, selected);
  command.execute();
}

function getVariableName(variableId: string) {
  const variable = dialogue.value.variables.find(v => v.id == variableId);
  return variable?.name;
}

function getMetaDataName(metaData: MetaData) {
  const metaSchema = dialogue.value.metaSchema.find(s => s.id == metaData.metaSchemaId);
  return metaSchema?.name;
}

function isItDocumentReference(item: any) {
  return item instanceof DialogueReferenceContent
}

window.addEventListener('keyup', (event) => keyboardPress(event));

onBeforeUnmount(() => {
  window.removeEventListener('keyup', (event) => keyboardPress(event))
})

function keyboardPress(event: KeyboardEvent) {
  if (event.code.substring(0, event.code.length - 1) === 'Digit') {
    const number = +event.key
    if (isNaN(number)) return;
    if (dialogue.value.currentNode?.options.length === 0 && number === 1) {
      // press next button
      next(dialogue.value.currentNode as DialogueNode)
      return;
    }
    const tryToFindOption = dialogue.value.currentNode?.options[number - 1]
    if (tryToFindOption == null) return;
    // check if can click
    if (isOptionDisabled(tryToFindOption as DialogueNodeOption)) return;
    // press option
    next(tryToFindOption as DialogueNodeOption)
  }
}
</script>

<style>
.dialog-player {
  color: white;
}

.dialog-card {
  background-color: white;
  color: black;
  padding: 18px;
  width: 700px;
  border-radius: 8px;
  font-size: 1.2em;
}

.options-section {
  width: 700px;
  margin: auto;
}
</style>
