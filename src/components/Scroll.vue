<template>
  <button class="scroll animated fadeIn" @click="scroll">
    <i class="fa fa-angle-down" aria-hidden="true"></i>
  </button>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      scroll() {
        this.$emit('scroll')
      }
    },
    components: {},
    props: []
  }

</script>

<style scoped>
button {
  width: 60px;
  height: 30px;
  background: #000;
  position: absolute;
  bottom: 0;
  left: calc(50% - 30px);
  font-size: 2.5rem;
  color: #fff;
  z-index: 999;
  -webkit-box-shadow: 0px -4px 8px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 0px -4px 8px 0px rgba(0,0,0,0.5);
  box-shadow: 0px -4px 8px 0px rgba(0,0,0,0.5);
}
button:hover {
  padding-top: 4px;
}
button i {
  vertical-align: top;
  line-height: .75;
}
</style>
