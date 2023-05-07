<template>
  <!-- each sub component must recive -->
  <v-row justify="center" style="padding-top: 20px">
    <v-card
      v-if="Object.keys($store.state.customWorkflowInfo.template).length != 0"
      height="fit-content"
      width="100%"
      class="mr-4 ml-4 mb-2"
      dark
      elevation="2"
    >
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-card-title
            v-on="on"
            style="justify-content: center; padding: 10px 0px"
            >{{ $store.state.customWorkflowInfo.template.title }}</v-card-title
          >
        </template>
        <span></span>
      </v-tooltip>
      <v-card-text
        class="pr-15 pl-15 pb-2 text-center"
        style="justify-content: center"
        >{{ this.$store.state.customWorkflowInfo.template.description }}<br />
        <a
          :href="this.$store.state.customWorkflowInfo.template.link"
          target="_blank"
          >{{ this.$store.state.customWorkflowInfo.template.link }}</a
        ></v-card-text
      >
      <div style="text-align: right">
        <v-icon
          @click="$store.commit('updateNav', 'header')"
          x-small
          color="blue"
        >
          mdi-pencil</v-icon
        ><v-icon
          style="margin-right: 3px"
          @click="$store.commit('clearInfo')"
          x-small
          color="blue"
        >
          mdi-close</v-icon
        >
      </div>
    </v-card>
    <v-card
      v-else
      height="fit-content"
      width="100%"
      class="mr-4 ml-4 mb-2"
      dark
      elevation="2"
    >
      <v-card-title style="justify-content: center; padding: 10px 0px"
        ><v-btn
          @click="$store.commit('updateNav', 'header')"
          outlined
          class="mt-5 p-0"
          x-large
          fab
          dark
          tile
          color="grey"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn></v-card-title
      >
      <v-card-text
        class="pr-15 pl-15 text-center"
        style="justify-content: center"
        >ADD HEADER<br />
        <a href="https://github.com/pipecraft2/pipecraft" target="_blank"
          >https://github.com/pipecraft2/pipecraft</a
        ></v-card-text
      >
    </v-card>
    <v-expansion-panels dark multiple popout>
      <v-expansion-panel style="expansion-panel-popout-max-width: 0">
        <v-btn
          @click="$store.commit('updateNav', 'step')"
          outlined
          class="m-0 p-0"
          large
          block
          fab
          dark
          tile
          color="grey"
          >ADD STEP
        </v-btn>
      </v-expansion-panel>

      <v-expansion-panel
        v-for="(service, index) in services"
        :key="index"
        :disabled="
          Object.values(inputData).includes(service.disabled) &&
          $store.state.runInfo.active == false
        "
        :class="Object.values(inputData).includes(service.disabled) && hide"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-expansion-panel-header
              v-on="on"
              style="justify-content: left"
              :class="[service.selected]"
              :disabled="Object.values(inputData).includes(service.disabled)"
            >
              <v-checkbox
                :disabled="Object.values(inputData).includes(service.disabled)"
                v-if="service.selected != 'always'"
                hide-details="true"
                @change="check_one($event, index)"
                @click.stop
                v-model="service.selected"
                style="max-width: 34px; padding-top: 0; margin: 0"
              ></v-checkbox>
              {{ service.serviceName.toUpperCase() }}
              <div v-if="service.manualLink" style="text-align: right">
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      right
                      @click.stop
                      @click="openLink(service.manualLink)"
                      >mdi-help-circle-outline</v-icon
                    >
                  </template>
                  <span>Check out the documentation for more info</span>
                </v-tooltip>
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      right
                      @click.stop
                      @click="$store.commit('updateNav', ['step_edit', index])"
                      x-small
                      color="blue"
                    >
                      mdi-pencil</v-icon
                    >
                  </template>
                  <span>edit step</span>
                </v-tooltip>
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      right
                      style="margin-right: 3px"
                      @click.stop
                      @click="
                        $store.commit('clearStep', index),
                          $store.commit('updateNav', 'home')
                      "
                      x-small
                      color="blue"
                    >
                      mdi-close</v-icon
                    >
                  </template>
                  <span>delete step</span>
                </v-tooltip>
              </div>
              <div
                v-if="
                  $store.state.runInfo.active == true &&
                  $store.state.runInfo.type == 'template_workflow' &&
                  index == $store.state.runInfo.step
                "
              ></div>
            </v-expansion-panel-header>
          </template>
          <span>{{ service.tooltip }}</span>
        </v-tooltip>
        <div
          v-if="
            $store.state.runInfo.active == true &&
            $store.state.runInfo.type == 'template_workflow' &&
            index == $store.state.runInfo.step
          "
        >
          <v-progress-linear indeterminate color="#1DE9B6"></v-progress-linear>
        </div>
        <v-expansion-panel-content>
          <v-row justify="center">
            <v-col
              v-for="(input, i) in service.Inputs"
              :key="input.name"
              cols="12"
              :xl="input.type === 'combobox' ? 4 : 2"
              :lg="input.type === 'combobox' ? 6 : 3"
              :md="input.type === 'combobox' ? 8 : 4"
              :sm="input.type === 'combobox' ? 12 : 3"
              style="height: fit-content; width: fit-content"
            >
              <v-container v-if="input.type === 'blank'"
                ><InputBlank
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
              <v-container v-if="input.type === 'numeric'"
                ><InputNumeric
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
              <v-container v-if="input.type === 'link'"
                ><InputLink
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
              <v-container v-if="input.type === 'bool'"
                ><InputBool
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
              <v-container v-if="input.type === 'select'"
                ><InputSelect
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
              <v-container v-if="input.type === 'file'"
                ><InputFile
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
              <v-container v-if="input.type === 'boolfile'"
                ><InputBoolFile
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
              <v-container v-if="input.type === 'boolselect'"
                ><InputBoolSelect
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
              <v-container v-if="input.type === 'chip'"
                ><InputChip
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
              <v-container v-if="input.type === 'slide'"
                ><InputSlide
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
              <v-container v-if="input.type === 'combobox'"
                ><InputCombo
                  :serviceIndex="index"
                  :inputIndex="i"
                  :list="'Inputs'"
              /></v-container>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import InputNumeric from "../components/InputNumeric.vue";
import InputLink from "../components/InputLink.vue";
import InputBool from "../components/InputBool.vue";
import InputSelect from "../components/InputSelect.vue";
import InputFile from "../components/InputFile.vue";
import InputBoolFile from "../components/InputBoolFile.vue";
import InputBoolSelect from "../components/InputBoolSelect.vue";
import InputChip from "../components/InputChip.vue";
import InputSlide from "../components/InputSlide.vue";
import InputCombo from "../components/InputCombo.vue";
import InputBlank from "../components/InputBlank.vue";

export default {
  components: {
    InputBlank,
    InputLink,
    InputChip,
    InputNumeric,
    InputBool,
    InputSelect,
    InputFile,
    InputBoolFile,
    InputBoolSelect,
    InputSlide,
    InputCombo,
  },
  computed: {
    hide() {
      return "display_none";
    },
    services() {
      return this.$store.state.template_workflow;
    },
    inputData() {
      return this.$store.state.data;
    },
  },
  methods: {
    openLink(value) {
      console.log(value);
    },
    toggleExtra(index) {
      this.$store.commit("toggleExtraCustomWorkflow", {
        workflowName: "template_workflow",
        serviceIndex: index,
      });
    },
    check_one(value, index) {
      this.$store.commit("checkCustomService", {
        serviceIndex: index,
        selected: value,
        name: "template_workflow",
      });
    },
  },
};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
.v-card {
  height: 145px;
}
span {
  width: 34px;
}
.container {
  padding: 0;
}
.always {
  padding-left: 58px;
}
.display_none {
  display: none;
}
</style>
