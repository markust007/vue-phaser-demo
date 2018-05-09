<template>
  <div class="page2 animated fadeIn">
    <div class="container">
      <!-- <h3 class="title animated fadeInUp">{{items.s1page2[0].title}}</h3>
      <p v-html="items.s1page2[0].text" class="animated fadeInUp"></p> -->
      <game class="animated fadeInUp" @newScore="newScore"></game>
    </div>
  </div>
</template>

<script>
import game from '../../../components/Game.vue'
export default {
  data() {
    return {

    };
  },

  computed: {
    location() {
      return this.$store.state.scormLMS.location
    },
    items() {
      return this.$store.state.items
    }
  },

  methods: {
    newScore(payload) {
      this.$emit("newScore", payload)
    },
    checkCue() {
      //BOILERPLATE FOR RUNNING AN INTERVAL
      // var self = this
      // if(Math.floor(self.$refs.audio1.currentTime) == 3){
      //   self.vis1 = "visible"
      // }
    },
    runInterval() {
      //BOILERPLATE FOR RUNNING AN INTERVAL
      this.interval = setInterval(this.checkCue, 100);
    }
  },
  mounted() {

  },
  beforeDestroy() {
    //BOILERPLATE FOR RUNNING AN INTERVAL
    clearInterval(this.interval);
  },
  components: {game},
  props: []
};
</script>

<style scoped>

</style>
