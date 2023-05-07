<template>
  <v-app>
    <v-navigation-drawer app clipped width="350" permanent dark>
      <v-list
        v-if="$store.state.left_nav_mode == 'header'"
        style="margin-top: 0"
      >
        <v-list-item
          v-for="(value, name) in this.header"
          style="margin-top: 10px"
          :key="name"
        >
          <v-text-field
            @change="up($event, name)"
            :v-model="value"
            :label="name"
            hide-details
            outlined
            persistent-hint
            :value="value"
          ></v-text-field>
        </v-list-item>
        <v-list-item style="margin-top: 10px">
          <div class="text-center">
            <v-btn
              @click="
                $store.commit('updateInfo', header),
                  $store.commit('updateNav', 'home')
              "
              small
              class="mr-3"
              outlined
              color="teal accent-2"
              >SAVE</v-btn
            >
            <v-btn
              @click="$store.commit('updateNav', 'home')"
              small
              class="mr-3"
              outlined
              color="pink accent-1"
              >CANCEL</v-btn
            >
          </div>
        </v-list-item>
      </v-list>
      <v-list v-if="$store.state.left_nav_mode.includes('input')">
        <v-list-item style="margin: 10px 0px">
          <v-select
            hide-details
            outlined
            @change="up3($event)"
            :items="types"
            :menu-props="{
              maxHeight: '700',
              dark: true,
              outlined: true,
              nudgeBottom: 10,
            }"
            label="Select input type"
            persistent-hint
          ></v-select>
        </v-list-item>
      </v-list>
      <v-list
        v-if="
          input_type == 'numeric' &&
          $store.state.left_nav_mode.includes('input')
        "
      >
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_inputs.numeric"
          v-if="i < 3"
        >
          <v-text-field
            @change="up4($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-list
        v-if="
          input_type == 'bool' && $store.state.left_nav_mode.includes('input')
        "
      >
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_inputs.bool"
          v-if="i < 3"
        >
          <v-text-field
            @change="up4($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-list
        v-if="
          input_type == 'boolfile' &&
          $store.state.left_nav_mode.includes('input')
        "
      >
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_inputs.boolfile"
          v-if="i < 4"
        >
          <v-text-field
            @change="up4($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-list
        v-if="
          input_type == 'boolselect' &&
          $store.state.left_nav_mode.includes('input')
        "
      >
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_inputs.boolselect"
          v-if="i < 4"
        >
          <v-text-field
            @change="up4($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-list
        v-if="
          input_type == 'chip' && $store.state.left_nav_mode.includes('input')
        "
      >
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_inputs.chip"
          v-if="i < 3"
        >
          <v-text-field
            @change="up4($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-list
        v-if="
          input_type == 'combo' && $store.state.left_nav_mode.includes('input')
        "
      >
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_inputs.combo"
          v-if="i < 4"
        >
          <v-text-field
            @change="up4($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-list
        v-if="
          input_type == 'file' && $store.state.left_nav_mode.includes('input')
        "
      >
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_inputs.file"
          v-if="i < 4"
        >
          <v-text-field
            @change="up4($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-list
        v-if="
          input_type == 'link' && $store.state.left_nav_mode.includes('input')
        "
      >
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_inputs.link"
          v-if="i < 3"
        >
          <v-text-field
            @change="up4($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-list
        v-if="
          input_type == 'select' && $store.state.left_nav_mode.includes('input')
        "
      >
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_inputs.select"
          v-if="i < 4"
        >
          <v-text-field
            @change="up4($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-list
        v-if="
          input_type == 'slide' && $store.state.left_nav_mode.includes('input')
        "
      >
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_inputs.slide"
          v-if="i < 6"
        >
          <v-text-field
            @change="up4($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-list v-if="$store.state.left_nav_mode.includes('input_edit')">
        <v-list-item
          style="margin-top: 10px"
          v-for="(item, value, i) in $store.state.template_workflow[
            $store.state.left_nav_mode[1]
          ].Inputs[$store.state.left_nav_mode[2]]"
          v-if="i < 3"
        >
          <v-text-field
            @change="up5($event, value)"
            :v-model="value"
            :label="value"
            hide-details
            outlined
            persistent-hint
            :value="item"
          ></v-text-field>
        </v-list-item>
        <v-list-item style="margin-top: 10px">
          <div class="text-center">
            <v-btn
              @click="$store.commit('updateNav', 'home')"
              small
              class="mr-3"
              outlined
              color="pink accent-1"
              >CANCEL</v-btn
            >
          </div>
        </v-list-item>
      </v-list>
      <v-list-item
        v-if="$store.state.left_nav_mode.includes('input')"
        style="margin-top: 10px"
      >
        <div class="text-center">
          <v-btn
            @click="
              $store.commit('addInput', input_type),
                $store.commit('updateNav', 'home')
            "
            small
            class="mr-3"
            outlined
            color="teal accent-2"
            >SAVE</v-btn
          >
          <v-btn
            @click="$store.commit('updateNav', 'home')"
            small
            class="mr-3"
            outlined
            color="pink accent-1"
            >CANCEL</v-btn
          >
        </div>
      </v-list-item>
      <v-list v-if="$store.state.left_nav_mode == 'step'" style="margin-top: 0">
        <v-list-item
          v-for="(value, name, i) in this.step"
          v-if="i < 3"
          style="margin-top: 10px"
          :key="name"
        >
          <v-text-field
            @change="up2($event, name)"
            :v-model="value"
            :label="name"
            hide-details
            outlined
            persistent-hint
            :value="value"
          ></v-text-field>
        </v-list-item>
        <v-list-item style="margin-top: 10px">
          <div class="text-center">
            <v-btn
              @click="
                $store.commit('addStep', step),
                  $store.commit('updateNav', 'home')
              "
              small
              class="mr-3"
              outlined
              color="teal accent-2"
              >SAVE</v-btn
            >
            <v-btn
              @click="$store.commit('updateNav', 'home')"
              small
              class="mr-3"
              outlined
              color="pink accent-1"
              >CANCEL</v-btn
            >
          </div>
        </v-list-item>
      </v-list>
      <v-list
        v-if="$store.state.left_nav_mode.includes('step_edit')"
        style="margin-top: 0"
      >
        <v-list-item
          v-for="(value, name, i) in $store.state.template_workflow[
            $store.state.left_nav_mode[1]
          ]"
          v-if="i < 3"
          style="margin-top: 10px"
          :key="name"
        >
          <v-text-field
            @change="up2($event, name)"
            :v-model="value"
            :label="name"
            hide-details
            outlined
            persistent-hint
            :value="value"
          ></v-text-field>
        </v-list-item>
        <v-list-item style="margin-top: 10px">
          <div class="text-center">
            <v-btn
              @click="
                $store.commit('editStep', step),
                  $store.commit('updateNav', 'home')
              "
              small
              class="mr-3"
              outlined
              color="teal accent-2"
              >SAVE</v-btn
            >
            <v-btn
              @click="$store.commit('updateNav', 'home')"
              small
              class="mr-3"
              outlined
              color="pink accent-1"
              >CANCEL</v-btn
            >
          </div>
        </v-list-item>
        <v-list-item
          v-if="$store.state.left_nav_mode == 'input'"
          style="margin: 10px 0px"
        >
          <v-select
            hide-details
            outlined
            :items="types"
            :menu-props="{
              maxHeight: '700',
              dark: true,
              outlined: true,
              nudgeBottom: 10,
            }"
            label="Select input type"
            persistent-hint
          ></v-select>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="background: grey">
      <transition name="fade">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    up(value, name) {
      this.header[name] = value;
    },
    up2(value, name) {
      this.step[name] = value;
    },
    up3(value) {
      this.input_type = value;
    },
    up4(value, name) {
      console.log(value, name);
      this.$store.state.template_inputs[this.input_type][name] = value;
    },
    up5(value, name) {
      console.log(value, name);
      this.$store.state.template_workflow[
        this.$store.state.left_nav_mode[1]
      ].Inputs[this.$store.state.left_nav_mode[2]][name] = value;
    },
  },
  name: "App",

  data: () => ({
    input_type: null,
    header: {
      title: null,
      description: null,
      link: null,
    },
    step: {
      serviceName: null,
      tooltip: null,
      manualLink: null,
      scriptName: null,
      imageName: null,
      disabled: null,
      selected: null,
      showExtra: false,
      Inputs: [
        {
          name: "add_input",
          value: 0,
          disabled: "never",
          tooltip: "Customize and add an input",
          type: "blank",
          rules: [(v) => v >= 0 || "ERROR: specify values >= 0"],
        },
      ],
      extraInputs: {},
    },
    types: [
      "numeric",
      "select",
      "bool",
      "boolfile",
      "boolselect",
      "chip",
      "combo",
      "file",
      "link",
      "slide",
    ],
  }),
};
</script>
