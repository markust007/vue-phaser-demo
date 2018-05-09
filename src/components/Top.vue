<template>
  <header>
    <!-- <button class="menu" @click="$store.commit('menu/menuToggle')"><i class="fas fa-times" v-if="menu"></i><i class="fas fa-bars" v-else></i></button> -->
    <h3>{{items.header[0].title}}</h3>
    <!-- <button class="exit" @click="quit">{{items.header[0].button}}</button> -->
  </header>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      menu () {
        return this.$store.state.menu.menu
      }
    },
    methods: {
      quit() {
        this.$store.commit('scormLMS/scormScore', 7);
        this.$store.commit('scormLMS/scormComplete');
      }
    },
    components: {},
    props: ['items']
  }

</script>

<style scoped>
button {
  width: 24px;
}
</style>
