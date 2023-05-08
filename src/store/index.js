import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    left_nav_mode: "home",
    runInfo: {
      active: false,
      type: null,
      step: null,
      nrOfSteps: null,
      containerID: null,
    },
    data: {
      readType: "",
      dataFormat: "",
      fileFormat: "",
    },
    customWorkflowInfo: {
      template: {},
    },
    template_inputs: {
      numeric: {
        name: null,
        tooltip: null,
        value: null,
        rules: null,
        disabled: null,
        type: null,
      },
      bool: {
        name: null,
        tooltip: null,
        value: null,
        rules: null,
        disabled: null,
        type: null,
      },
      boolfile: {
        name: null,
        value: null,
        tooltip: null,
        btnName: null,
        active: null,
        disabled: null,
        type: null,
      },
      boolselect: {
        name: null,
        value: null,
        items: null,
        tooltip: null,
        disabled: null,
        type: null,
      },
      chip: {
        name: null,
        value: null,
        tooltip: null,
        disabled: null,
        type: null,
        iupac: null,
        rules: null,
      },
      combo: {
        name: null,
        items: null,
        value: null,
        tooltip: null,
        disabled: null,
        type: null,
      },
      file: {
        name: null,
        value: null,
        tooltip: null,
        btnName: null,
        disabled: null,
        type: null,
      },
      link: {
        name: null,
        value: null,
        tooltip: null,
        disabled: null,
        type: null,
      },
      select: {
        name: null,
        value: null,
        items: null,
        tooltip: null,
        disabled: null,
        type: null,
      },
      slide: {
        name: null,
        value: null,
        tooltip: null,
        max: null,
        min: null,
        step: null,
        disabled: null,
        type: null,
      },
    },
    template_workflow: [
      {
        tooltip:
          "this is an exmaple to display all the different type of inputs featured in pipecraft (you can remove this after your workflow is finished, refresh to bring it back)",
        scriptName: "",
        imageName: "",
        serviceName: "example step",
        manualLink: "https://github.com/pipecraft2/pipecraft",
        disabled: false,
        selected: false,
        showExtra: false,
        Inputs: [
          {
            name: "add_input",
            value: 0,
            tooltip: "Customize and add an input",
            disabled: "never",
            type: "blank",
            rules: [(v) => v >= 0 || "ERROR: specify values >= 0"],
          },
          {
            name: "file_example",
            value: "undefined",
            tooltip: "example tooltip",
            btnName: "select file",
            type: "file",
            disabled: "never",
          },
          {
            name: "link_example",
            value: "https://webpage.com",
            tooltip: "example tooltip",
            disabled: "never",
            type: "link",
          },
          {
            name: "numeric_exmaple",
            value: 0,
            tooltip: "example tooltip",
            disabled: "never",
            type: "numeric",
            rules: [(v) => v >= 0 || "ERROR: specify values >= 0"],
          },
          {
            name: "bool_example",
            value: true,
            tooltip: "example tooltipe",
            disabled: "never",
            type: "bool",
          },
          {
            name: "boolfile_example",
            value: "undefined",
            tooltip: "example tooltip",
            active: false,
            btnName: "select file",
            disabled: "never",
            type: "boolfile",
          },
          {
            name: "boolselect_example",
            value: "2",
            items: "0, 1, 2, 3, 4",
            tooltip: "example tooltip",
            disabled: "never",
            type: "boolselect",
          },
          {
            name: "select_example",
            value: "2",
            items: "10,22,45,66,9",
            tooltip: "example tooltip",
            disabled: "never",
            type: "select",
          },
          {
            name: "chip_example",
            value: "primer1, primer2",
            tooltip: "example tooltip",
            disabled: "never",
            type: "chip",
            iupac: true,
            rules: [(v) => v.length <= 10 || "10 is maximum number of inputs"],
          },
          {
            name: "combo_example",
            items: "option0, option1, option2, option3",
            value: ["option1"],
            tooltip: "example tooltip",
            disabled: "never",
            type: "combo",
          },
          {
            name: "slide_example",
            value: 0.5,
            tooltip: "example tooltip",
            max: 1,
            min: 0,
            step: 0.01,
            disabled: "never",
            type: "slide",
          },
        ],
      },
    ],
  },
  getters: {},
  mutations: {
    updateInfo(state, payload) {
      state.customWorkflowInfo.template = payload;
    },
    addStep(state, payload) {
      state.template_workflow.push(payload);
    },
    addInput(state, payload) {
      state.template_inputs[payload].type = payload;
      state.template_workflow[state.left_nav_mode[1]].Inputs.push(
        state.template_inputs[payload]
      );
    },
    editStep(state, payload) {
      state.template_workflow[state.left_nav_mode[1]] = payload;
    },
    clearInfo(state) {
      state.customWorkflowInfo.template = {};
    },
    clearStep(state, payload) {
      state.template_workflow.splice(payload, 1);
    },
    updateNav(state, payload) {
      state.left_nav_mode = payload;
    },
  },
  actions: {},
  modules: {},
});
