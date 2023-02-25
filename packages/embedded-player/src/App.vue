<template>
  <v-app>
    <v-main>
      <div class="dialog-player">
        <v-row class="justify-center mb-6">
          <v-btn class="ml-4" @click="restartDialogue">
            Restart
          </v-btn>
        </v-row>

        <v-row class="variables-and-metadata-section">
          <div>
            <h2>Current variables values:</h2>
            <div v-for="variable in variables" :key="variable.id">{{ variable.name }}: {{ variable.currentValue }}</div>
          </div>
          <div>
            <h2>Node's meta data:</h2>
            <div v-for="(metaData, index) in metaDataForNode" :key="index">{{ metaData.name }}: {{
              metaData.metaSchemaValue
            }}</div>
          </div>
        </v-row>
        <template v-if="dialogue">
          <v-row v-if="!dialogue.isFinished" class="justify-center mb-6">
            <div class="dialog-card">
              <div v-for="(item, index) in content" :key="index">
                <span> {{ item.text }}</span>
              </div>
            </div>
          </v-row>

          <v-row class="options-section">
            <template v-if="!dialogue.isFinished && dialogue.currentNode">
              <v-btn v-if="dialogue.currentNode.options.length === 0" @click="next(dialogue.currentNode as DialogueNode)">
                <v-icon>mdi-numeric-1-box</v-icon>Next
              </v-btn>
              <v-col cols="12" v-for="(option, index) in dialogue.currentNode.options" :key="option.id.fullValue">
                <v-btn @click="next(option as DialogueNodeOption)" :dark="option.isDisabled"
                  :disabled="option.isDisabled">
                  <v-icon>mdi-numeric-{{ index + 1 }}-box</v-icon> {{ option.text }}
                </v-btn>
                <span v-for="requiredVar in option.requiredVariables" class="ml-4" :key="requiredVar.variableId">
                  Required: <b>{{ getVariableName(requiredVar) }}</b> to be <b>{{ requiredVar.value }}</b>
                </span>
              </v-col>
            </template>
            <div v-else class="pa-2 text-center white--text" style="width:100%">
              <h2>FIN</h2>
            </div>
          </v-row>
        </template>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import {
  BooleanVariable,
  convertExportDataToDialogue,
  Dialogue,
  DialogueNode,
  DialogueNodeOption,
  GoToNextNode,
  RequiredVariable,
} from "@lorehub/dialogue-player"
import jsonDialogue from '@/assets/example-dialogue-json.json';


const dialogueFromJson = convertExportDataToDialogue(jsonDialogue);
const dialogue = ref(dialogueFromJson);

const variables: Ref<BooleanVariable[]> = ref([]);
const metaDataForNode: Ref<any[]> = ref([]);

const content = ref(dialogue.value.currentNode?.content ?? []);

function restartDialogue() {
  const dialogueFromJson = convertExportDataToDialogue(jsonDialogue);
  dialogue.value = dialogueFromJson;
}

function next(selected: DialogueNode | DialogueNodeOption) {
  const command = new GoToNextNode(dialogue.value as Dialogue, selected);
  command.execute();
}

function getVariableName(requiredVar: RequiredVariable) {
  const variable = dialogue.value.variables.find(v => v.id == requiredVar.variableId);
  return variable?.name;
}
</script>

