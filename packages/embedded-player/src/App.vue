<template>
  <v-app>
    <v-main>
      <template>
        <div class="dialog-player">

          <v-row class="justify-center mb-6">
            <v-btn class="ml-4" @click="initDialogue">
              {{ $t("EDITOR.dialogs.restart") }}
            </v-btn>
          </v-row>
          <v-row v-if="error" class="justify-center mb-6">
            <server-error :error="error" />
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
                  <span class="font-weight-medium" v-if="item.documentId">{{ item.text }}:</span>
                  <span v-else> {{ item.text }}</span>
                </div>
              </div>
            </v-row>

            <v-row class="options-section">
              <template v-if="!dialogue.isFinished">
                <v-btn v-if="dialogue.currentNode.options.length === 0" @click="next(dialogue.currentNode)">
                  <v-icon>mdi-numeric-1-box</v-icon>{{ $t("EDITOR.dialogs.next") }}
                </v-btn>
                <v-col cols="12" v-for="(option, index) in dialogue.currentNode.options" :key="option.id">
                  <v-btn :key="option.id" @click="next(option)" :dark="option.isDisabled" :disabled="option.isDisabled">
                    <v-icon>mdi-numeric-{{ index + 1 }}-box</v-icon> {{ option.text }}
                  </v-btn>
                  <span v-for="requiredVar in option.requiredVariables" class="ml-4">
                    Required: <b>{{ getVariableName(requiredVar.variableId) }}</b> to be <b>{{ requiredVar.value }}</b>
                  </span>
                </v-col>
              </template>
              <div v-else class="pa-2 text-center white--text" style="width:100%">
                <h2> {{ $t("EDITOR.dialogs.end") }}</h2>
              </div>
            </v-row>
          </template>
        </div>
      </template>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { BooleanVariable, Dialogue, DialogueReferenceContent, DialogueTextContent } from "@lorehub/dialogue-player"

const error = ref({});
const variables: Ref<BooleanVariable[]> = ref([]);
const metaDataForNode: Ref<any[]> = ref([]);
const dialogue: Ref<Dialogue> = ref({});
const content: Ref<(DialogueTextContent | DialogueReferenceContent)[]> = ref([]);


function initDialogue() {

}
</script>

