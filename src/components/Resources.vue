<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp"
  >
    <div class="resources">
      <a v-for="item in items.header" :href="item.source" target="_blank" v-show="item.resources">{{item.resources}}</a>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    components: {},
    props: ['items']
  }

</script>

<style scoped>
  .resources {
    position: absolute;
    top: 50px;
    left: 0;
    background: rgba(230, 231, 232, 1);
    min-width: 250px;
    z-index: 999;
  }
  .resources a {
    display: block;
    color: rgba(119, 120, 123, 0.6);
    border-bottom: 2px solid rgba(119, 120, 123, 0.2);
    text-decoration: none;
    padding-bottom: 4px;
    font-size: 1.25rem;
    padding: 12px 15px 7px 15px;
    text-transform: uppercase;
    transition: all .3s;
  }
  .resources a:last-child {
    border-bottom: 0px solid rgba(119, 120, 123, 0.6);
    margin-bottom: 0;
  }
  .resources a:hover {
    background: #000;
    color: #fff;
  }
</style>
