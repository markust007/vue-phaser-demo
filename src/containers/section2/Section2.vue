<template>
  <section id="section2">

    <page1 v-show="location === 3"></page1>

  </section>
</template>

<script>
import page1 from './pages/Page1.vue'

  export default {
    data: function () {
      return {

      }
    },
    computed: {
      location () {
        return this.$store.state.scormLMS.location
      }
    },
    methods: {

    },
    mounted() {

    },
    components: {
      page1
    },
    props: []
  }
</script>

<style scoped>

</style>
