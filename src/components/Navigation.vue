<template>
  <nav>
    <button class="nav left" @click="back" :class="{disabled: location === firstPage}"><i class="fas fa-angle-left"></i></button>
    <button class="nav right" @click="next" :class="{disabled: location === lastPage}"><i class="fas fa-angle-right"></i></button>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        firstPage: 1,
        lastPage: 3
      }
    },
    computed: {
      location () {
        return this.$store.state.scormLMS.location
      }
    },
    methods: {
      next() {
        this.$store.commit('scormLMS/locationPlus');
        this.$store.commit('scormLMS/incrementProgress');
      },
      back() {
        this.$store.commit('scormLMS/locationMinus');
      }
    },
    components: {},
    props: ['items']
  }

</script>

<style scoped>
nav {
  position: absolute;
  bottom: 5px;
  right: 10px;
  z-index: 99;
}
.nav {
  background: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.7rem;
  margin: 0 2px;
}
.nav.disabled {
  background: rgba(255,255,255, 0.5);
  pointer-events: none;
  cursor: default;
}

</style>
