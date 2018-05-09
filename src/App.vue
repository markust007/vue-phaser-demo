<template>
  <div id="app" v-if="items">
    <!-- JIRA - REMOVE FOR GOLD -->
    <!-- <jira></jira> -->

    <!-- LOADING ICON -->
    <transition name="fade">
      <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw" v-show="loader"></i>
    </transition>

    <!-- MAIN -->
    <top :items="items"></top>
    <resources :items="items" v-show="menu"></resources>
    <section1 v-show="location <= 2"></section1>
    <section2 v-show="location > 2"></section2>
    <bottom :items="items"></bottom>
    <!-- <navigation></navigation> -->

    <!-- JIRA - REMOVE FOR GOLD -->
    <jira-position></jira-position>

  </div>
</template>

<script>
/////////////////////IMPORTS/////////////////////////
/////////////////////////////////////////////////////
import store from './store/index'
import axios from 'axios'

import jira from './components/Jira.vue'
import jiraPosition from './components/JiraPosition.vue'
import top from './components/Top.vue'
import bottom from './components/Bottom.vue'
import navigation from './components/Navigation.vue'
import resources from './components/Resources.vue'
import section1 from './containers/section1/Section1.vue'
import section2 from './containers/section2/Section2.vue'

import {polyfill} from "mobile-drag-drop";
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";
/////////////////////VARIABLES & MISC/////////////////////
/////////////////////////////////////////////////////////
var json = 'data/data.json';

polyfill({
    // use this to make use of the scroll behaviour
    dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});

export default {
  name: 'app',
  store,
  data () {
    return {
      loader: true
    }
  },
  components: {
    jira, jiraPosition, top, bottom, navigation, resources, section1, section2
  },

  computed: {
    location () {
      return this.$store.state.scormLMS.location
    },
    menu () {
      return this.$store.state.menu.menu
    },
    items() {
      return this.$store.state.items
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      axios.get(json)
      .then(response => {
        // JSON responses are automatically parsed.
        this.items = response.data
        this.$store.commit('setItems', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    },
    menuToggle () {
      this.$store.commit('menu/menuToggle')
    }
  },
  mounted() {
    this.loader = false;
    //scorm
    this.$store.commit('scormLMS/scormInit');
  }
}
</script>

<!-- REMOVE 'SCOPED' FOR GLOBAL STYLES -->
<style scoped>

</style>
