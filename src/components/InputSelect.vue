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
          style="justify-content: center; padding: 3px 0px"
          >{{ input.name.replace(/_/g, " ") }}</v-card-title
        >
      </template>
      <span>{{ input.tooltip }}</span>
    </v-tooltip>
    <v-card-actions style="justify-content: center">
      <v-row style="justify-content: center"
        ><v-col style="padding: 0" cols="8" offset="0">
          <v-select
            v-model="input.value"
            style="padding-top: 10%"
            @change="inputUpdate(input.value)"
            :items="input.items.split(',')"
            outlined
          ></v-select>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
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
  },
  methods: {
    deleteInput() {
      this.$store.state.template_workflow[
        this.$attrs.serviceIndex
      ].Inputs.splice(this.$attrs.inputIndex, 1);
    },
    inputUpdate(value) {
      if (this.$route.params.workflowName) {
        this.blastSwitch(value);
        this.$store.commit("premadeInputUpdate", {
          workflowName: this.$route.params.workflowName,
          serviceIndex: this.$attrs.serviceIndex,
          inputIndex: this.$attrs.inputIndex,
          listName: this.$attrs.list,
          value: value,
        });
      } else {
        this.blastSwitch2(
          value,
          this.$route.params.order,
          this.$attrs.serviceIndex
        );
        this.$store.commit("inputUpdate", {
          stepIndex: this.$route.params.order,
          serviceIndex: this.$attrs.serviceIndex,
          inputIndex: this.$attrs.inputIndex,
          listName: this.$attrs.list,
          value: value,
        });
      }
    },
    blastSwitch(value) {
      if (value == "blastn" || value == "megablast") {
        this.$store.commit("blastSwitch", value);
      }
    },
    blastSwitch2(value, i1, i2) {
      if (value == "blastn" || value == "megablast") {
        this.$store.commit("blastSwitch2", { value: value, i1: i1, i2: i2 });
      }
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
