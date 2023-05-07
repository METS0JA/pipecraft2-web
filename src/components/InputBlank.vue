<template>
  <v-card
    outlined
    elevation="2"
    :disabled="
      Object.values(inputData).includes(input.disabled) ||
      $store.state.runInfo.active == true
    "
  >
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-card-text
          style="height: 100%"
          class="d-flex align-center justify-center"
        >
          <v-btn
            v-on="on"
            @click="$store.commit('updateNav', ['input', $attrs.serviceIndex])"
            outlined
            x-large
            class="mx-25"
            fab
            dark
            tile
            color="grey"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-card-text>
      </template>
      <span>{{ input.tooltip }}</span>
    </v-tooltip>
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
