<template>
  <v-card
    light
    elevation="2"
    :disabled="
      Object.values(inputData).includes(input.disabled) ||
      $store.state.runInfo.active == true
    "
  >
    <div style="text-align: right">
      <v-icon
        @click="
          $store.commit('updateNav', [
            'input_edit',
            $attrs.serviceIndex,
            $attrs.inputIndex,
          ])
        "
        x-small
        color="blue"
      >
        mdi-pencil</v-icon
      ><v-icon
        style="margin-right: 3px"
        @click="deleteInput()"
        x-small
        color="blue"
      >
        mdi-close</v-icon
      >
    </div>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-card-title
          v-on="on"
          style="justify-content: center; padding: 6px 0px"
          ><v-checkbox
            @change="toggleActive(input.active)"
            hide-details
            class="ma-0 pa-0"
            style="padding: 0"
            v-model="input.active"
          >
            <template v-slot:label>
              <div style="color: black">
                {{ input.name.replace(/_/g, " ") }}
              </div>
            </template></v-checkbox
          >
        </v-card-title>
      </template>
      <span>{{ input.tooltip }}</span>
    </v-tooltip>
    <v-card-actions style="justify-content: center">
      <v-row>
        <v-col style="padding: 0" cols="8" offset="2">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-text-field
                  disabled
                  style="
                    border-bottom-right-radius: 0;
                    border-bottom-left-radius: 0;
                  "
                  hide-details="true"
                  v-model="fileName"
                  class="centered-input"
                  background-color="transparent"
                  solo
                ></v-text-field>
              </div>
              <v-btn
                elevation="1"
                :disabled="!input.active"
                @click="fileSelect()"
                style="
                  justify-content: center;
                  max-width: 100px;
                  border-top-right-radius: 0;
                  border-top-left-radius: 0;
                "
                block
                >{{ input.btnName }}</v-btn
              >
            </template>
            <span>{{ fileName }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
/* const { dialog } = require("@electron/remote"); */
/* var path = require("path"); */
/* var slash = require("slash"); */
export default {
  computed: {
    input() {
      if (this.$route.params.workflowName) {
        return this.$store.state[this.$route.params.workflowName][
          this.$attrs.serviceIndex
        ][this.$attrs.list][this.$attrs.inputIndex];
      } else {
        return this.$store.state.template_workflow[this.$attrs.serviceIndex][
          this.$attrs.list
        ][this.$attrs.inputIndex];
      }
    },
    inputData() {
      return this.$store.state.data;
    },
    fileName() {
      var filename = this.input.value.base;
      return filename;
    },
  },
  methods: {
    deleteInput() {
      this.$store.state.template_workflow[
        this.$attrs.serviceIndex
      ].Inputs.splice(this.$attrs.inputIndex, 1);
    },
    toggleActive(value) {
      if (this.$route.params.workflowName) {
        this.$store.commit("premadeToggleActive", {
          workflowName: this.$route.params.workflowName,
          serviceIndex: this.$attrs.serviceIndex,
          inputIndex: this.$attrs.inputIndex,
          listName: this.$attrs.list,
          value: value,
        });
      } else {
        this.$store.commit("toggleActive", {
          stepIndex: this.$route.params.order,
          serviceIndex: this.$attrs.serviceIndex,
          inputIndex: this.$attrs.inputIndex,
          listName: this.$attrs.list,
          value: value,
        });
      }
    },
    inputUpdate(value) {
      if (this.$route.params.workflowName) {
        this.$store.commit("premadeInputUpdate", {
          workflowName: this.$route.params.workflowName,
          serviceIndex: this.$attrs.serviceIndex,
          inputIndex: this.$attrs.inputIndex,
          listName: this.$attrs.list,
          value: value,
        });
      } else {
        this.$store.commit("inputUpdate", {
          stepIndex: this.$route.params.order,
          serviceIndex: this.$attrs.serviceIndex,
          inputIndex: this.$attrs.inputIndex,
          listName: this.$attrs.list,
          value: value,
        });
      }
    },
    fileSelect() {
      /*       dialog
        .showOpenDialog({
          title: "Select input files",
          properties: ["openFile", "multiSelections", "showHiddenFiles"],
        })
        .then((result) => {
          if (typeof result.filePaths[0] !== "undefined") {
            let correctedPath = slash(result.filePaths[0]);
            this.inputUpdate(correctedPath);
          }
        })
        .catch((err) => {
          console.log(err);
        }); */
      return this.inputUpdate("file/path");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-text-field {
  ::v-deep input {
    text-align: center !important;
  }
}
.v-text-field input {
  text-align: center;
}
</style>
