<template>
  <div class="page1 animated fadeIn">
    <div class="container">

      <div class="auth" v-show="!signin">
        <input type="text" placeholder="Enter Your Name" v-model="name" />
        <input type="submit" class="button" value="Submit" @click.prevent="addUser">
      </div>
      <button class="button animated bounceIn" @click="next" v-show="signin">Play</button>

      <p class="instructions animated fadeInUp">
        Use the <i class="fas fa-caret-left"></i> <i class="fas fa-caret-right"></i> arrows on your keyboard to move<br />
        Use the spacebar to jump<br />
        Collect as many coins as you can before time runs out.
      </p>
      <button class="button" @click="$emit('showLead')">Leaderboard</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null
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
    next() {
      this.$store.commit('scormLMS/locationPlus');
    },
    addUser() {
      this.$emit("addUser", this.name)
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
    setTimeout(() => {

    }, 50);

  },
  beforeDestroy() {
    //BOILERPLATE FOR RUNNING AN INTERVAL
    clearInterval(this.interval);
  },
  components: {},
  props: ['signin']
};
</script>

<style scoped>
.container {
  margin: 115px auto 0;
}
.auth {
  width: 100%;
  text-align: center;
}
input[type="text"] {
  font-family: 'Chewy', cursive;
  font-size: 2rem;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.3);
  background: rgba(255,255,255,0.7);
  -webkit-box-shadow: 0px 15px 32px -14px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 15px 32px -14px rgba(0,0,0,0.75);
  box-shadow: 0px 15px 32px -14px rgba(0,0,0,0.75);
  color: rgba(0,0,0,0.7);
}
input::placeholder {
  color: rgba(0,0,0,0.3);
}
input:focus {
  outline: none;
}
input[type="submit"] {
  cursor: pointer;
  transition: all .3s;
}
input:hover[type="submit"] {

}
.instructions {
  font-family: 'Chewy', cursive;
  color: #dc6432;
  font-size: 2rem;
}
</style>
