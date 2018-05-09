<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
  <div class="leaderboard">
    <div class="leader-holder animated slideInUp">
      <h3>Leaderboard</h3>
      <div class="leader" v-for="(leader, index) in leaderboard">
        <p class="name">{{index + 1}}. {{leader.name}}</p>
        <div class="score">
          <img src="media/section1/coin_bar.png" />
          <div class="bar">
            <div class="bar-inner" :style="{width: leader.score / 2 + '%'}"></div>
          </div>
        </div>
        <p class="points">{{leader.score}}</p>
      </div>
    </div>
    <button class="button animated fadeIn" @click="$emit('showLead')">Close</button>
  </div>
</transition>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      
    },
    methods: {

    },
    mounted() {

    },
    components: {},
    props: ['leaderboard']
  }

</script>

<style scoped>
.leaderboard {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(0,0,0,0.7);
  padding: 10px;
  width: 100%;
}
.leader-holder {
  overflow: auto;
  width: 440px;
  height: 440px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  margin: 30px auto 0;
  border: 8px solid rgba(255,255,255,0.5);
  padding: 30px;
  webkit-box-shadow: 0px 15px 32px -14px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 15px 32px -14px rgba(0,0,0,0.75);
  box-shadow: 0px 15px 32px -14px rgba(0,0,0,0.75);
  background: rgb(255,246,229);
background: -moz-radial-gradient(center, ellipse cover, rgba(255,246,229,1) 43%, rgba(244,200,95,1) 100%);
background: -webkit-radial-gradient(center, ellipse cover, rgba(255,246,229,1) 43%,rgba(244,200,95,1) 100%);
background: radial-gradient(ellipse at center, rgba(255,246,229,1) 43%,rgba(244,200,95,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fff6e5', endColorstr='#f4c85f',GradientType=1 );
}
h3 {
  font-family: 'Chewy', cursive;
  color: #dc6432;
  font-size: 2.5rem;
  margin: 0;
  text-align: center;
  margin-bottom: 10px;
}
.leader {
  margin-bottom: 15px;
  border-bottom: 4px dotted rgba(220,100,50, 0.5);
  padding-bottom: 15px;
}
.leader:last-child {
  border-bottom: 0px dotted #dc6432;
}
.name {
  font-family: 'Chewy', cursive;
  color: rgba(0,0,0,0.7);
  margin: 0;
  font-size: 1.4rem;
}
.points {
  font-family: 'Chewy', cursive;
  color: rgba(0,0,0,0.7);
  display: inline-block;
  margin: 0;
  font-size: 1.25rem;
  margin-left: 50px;
}
.score {
  position: relative;
  width: 333px;
  height: 20px;
  display: inline-block;
}
.score img {
  width: 26px;
  position: absolute;
  z-index: 1;
}
.score .bar {
  position: absolute;
  width: 100%;
  height: 10px;
  top: 4px;
  left: 5px;
  border-radius: 5px;
  overflow: hidden;
  border: 4px solid #eeb418;
  border-left-width: 25px;
  background: rgb(109,69,13);
background: -moz-linear-gradient(top, rgba(109,69,13,1) 0%, rgba(201,156,110,1) 100%);
background: -webkit-linear-gradient(top, rgba(109,69,13,1) 0%,rgba(201,156,110,1) 100%);
background: linear-gradient(to bottom, rgba(109,69,13,1) 0%,rgba(201,156,110,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6d450d', endColorstr='#c99c6e',GradientType=0 );
-webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.6);
-moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.6);
box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.6);
}
.score .bar .bar-inner {
  position: absolute;
  height: 10px;
  transition: all .3s;
  background: rgb(85,112,31);
background: -moz-linear-gradient(top, rgba(85,112,31,1) 0%, rgba(164,219,61,1) 4%, rgba(161,211,80,1) 48%, rgba(133,201,24,1) 56%, rgba(109,163,9,1) 100%);
background: -webkit-linear-gradient(top, rgba(85,112,31,1) 0%,rgba(164,219,61,1) 4%,rgba(161,211,80,1) 48%,rgba(133,201,24,1) 56%,rgba(109,163,9,1) 100%);
background: linear-gradient(to bottom, rgba(85,112,31,1) 0%,rgba(164,219,61,1) 4%,rgba(161,211,80,1) 48%,rgba(133,201,24,1) 56%,rgba(109,163,9,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#55701f', endColorstr='#6da309',GradientType=0 );
}
.button {
  position: absolute;
  bottom: 90px;
  width: 150px;
  left: calc(50% - 75px);
}
</style>
