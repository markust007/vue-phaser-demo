<template>

</template>
<script>
import {elementInViewport} from '../utils/viewport.js';
  export default {
    mounted() {
      var self = this
      let section1 = document.getElementById("section1");
      let section2 = document.getElementById("section2");

      self.$store.commit("scormLMS/changeUserLocation", "Section 1");

      window.onscroll = function() {

        if (elementInViewport(section1)) {
          self.$store.commit("scormLMS/changeUserLocation", "Section 1");
        }
        if (elementInViewport(section2)) {
          self.$store.commit("scormLMS/changeUserLocation", "Section 2");
        }
      }
    }
  }

</script>
