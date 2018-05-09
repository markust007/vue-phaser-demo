<template>
  <section id="section1">

    <page1 v-show="location === 1" @showLead="showLead" @addUser="addUser" :signin="signin"></page1>
    <leaderboard :leaderboard="leaders" v-if="lead" @showLead="showLead"></leaderboard>
    <page2 v-if="location === 2" @newScore="newScore"></page2>


  </section>
</template>

<script>
import leaderboard from '../../components/Leaderboard.vue'
import page1 from './pages/Page1.vue'
import page2 from './pages/Page2.vue'

import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyC9A6-Tmg2xY3OaGrn-x9IwSOxvp4efBUM",
  authDomain: "phaser-demo-leaderboard.firebaseapp.com",
  databaseURL: "https://phaser-demo-leaderboard.firebaseio.com",
  projectId: "phaser-demo-leaderboard",
  storageBucket: "phaser-demo-leaderboard.appspot.com",
  messagingSenderId: "1048288255308"
}

let app = firebase.initializeApp(config)
// let leaderboard = app.database().ref('leadeboard').orderByChild('score');
let leader = app.database().ref('leadeboard').orderByChild('score')
// let leads = leader.on('value', function(snapshot) {return snapshot.val();});
let users = app.database().ref('leadeboard')

  export default {
    data: function () {
      return {
        lead: false,
        signin: false,
        user: null,
        name: null
      }
    },
    computed: {
      location () {
        return this.$store.state.scormLMS.location
      },
      leaders() {
        return this.leaderboard.reverse();
        this.$forceUpdate()
      }
    },
    firebase: {
      leaderboard: leader
   },
    methods: {
      showLead() {
        this.lead = !this.lead
      },
      addUser(payload) {
        if(payload < 2) {
          alert("Please enter your name")
        } else {
          this.name = payload
          let $index = payload.indexOf(" ")
          // let $userFirst = payload.slice(0, $index);
          // let $userLast = payload.slice($index + 1)
          // let $newUser = $userFirst.toLowerCase() + $userLast.toLowerCase()
          let $user = payload.replace(" ", "");
          let $newUser = $user.toLowerCase();
          this.user = $newUser
          // users.child("" + $newUser + "").set({
          //   name: payload
          // });
          this.signin = true
        }
      },
      newScore(payload) {
        var self = this;
        let $score = users.child("" + this.user + "").once('value').then(function(snapshot) {
          var user = snapshot.val()
          if(!user || !user.score || payload > user.score) {
            users.child("" + self.user + "").set({
              name: self.name,
              score: payload
            });
          }
        });
        this.$forceUpdate();
      }
    },
    mounted() {

    },
    components: {
      page1, page2, leaderboard
    },
    props: []
  }
</script>

<style scoped>

</style>
