<template>
  <div>
    <div id='gameScreen'></div>
    <div class="score">
      <img src="media/section1/coin_bar.png" />
      <div class="bar">
        <div class="bar-inner" :style="{width: score + 'px'}"></div>
      </div>
      <p>SCORE: {{this.score}}</p>
    </div>
    <div class="scene" v-show="scene">
      <div class="holder">
        <h2>Game Over</h2>
        <button class="button" @click="replay">Replay</button>
        <button class="button" @click="back">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;
var jumpButton;

  export default {
    data() {
      return {
        game: null,
        width: 1010,
        height: 650,
        scene: false,
        score: 0,
        timer: 15
      }
    },
    methods: {
      back() {
        this.$store.commit('scormLMS/locationMinus');
      },
      preload () {
        this.game.load.image('sky', 'media/section1/sky.png');
        this.game.load.image('ground', 'media/section1/platform.png');
        this.game.load.image('bottom', 'media/section1/ground.png');
        this.game.load.image('star', 'media/section1/coin.png');
        this.game.load.spritesheet('dude', 'media/section1/dude.png', 32, 48);
      },
      create (phaser) {
        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our this.game
        this.game.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, this.game.world.height - 64, 'bottom');

        //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
        ground.scale.setTo(1, 1);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = platforms.create(610, 400, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(0, 250, 'ground');
        ledge.body.immovable = true;

        // The player and its settings
        player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //  Finally some stars to collect
        stars = this.game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 20; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 52, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        //  The score
        scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: 'transparent' });

        //  Our controls.
        cursors = this.game.input.keyboard.createCursorKeys();
        jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    		this.game.time.events.add(Phaser.Timer.SECOND * 15, this.stopGame, this)
      },
      update (phaser) {
        var self = this
        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(player, platforms);
        this.game.physics.arcade.collide(stars, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.game.physics.arcade.overlap(player, stars, this.collectStar, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
        {
            player.body.velocity.y = -350;
        }
    		this.game.debug.text("Time until event: " + this.game.time.events.duration, 800, 32);
      },
      stopGame() {
        // this.game.destroy();
        this.game.paused = true;
        this.scene = true
        this.$emit("newScore", this.score)
      },
      collectStar(player, star) {
        star.kill();

        //  Add and update the score
        this.score += 10;
        scoreText.text = 'Score: ' + this.score;

        var self = this
    		if (this.score == 200) {
    			self.scene = true
    		} else {
    		}
      },
      replay() {
        this.score = 0
        this.scene = false
        this.game.destroy()
        this.game = null
        let self = this
        if (this.game == null) {
          this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, this.$el, {
            preload: function preload () {
              self.preload(this)
            },
            create: function create () {
              self.create(this)
            },
            update: function update () {
              self.update(this)
            }
          })
        }
      }
    },
    mounted() {
      let self = this
      if (this.game == null) {
        this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, this.$el, {
          preload: function preload () {
            self.preload(this)
          },
          create: function create () {
            self.create(this)
          },
          update: function update () {
            self.update(this)
          }
        })
      }
    },
    components: {},
    props: ['items']
  }

</script>

<style scoped>
.scene {
  position: absolute;
  top: 0;
  left: 0;
  width: 1010px;
  height: 650px;
  /* background: rgba(0, 0, 0, 0.5); */
  z-index: 2;
}
.holder {
  width: 500px;
  height: 300px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  margin: 135px auto 0;
  border: 8px solid rgba(255,255,255,0.5);
  padding: 1px;
  webkit-box-shadow: 0px 15px 32px -14px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 15px 32px -14px rgba(0,0,0,0.75);
  box-shadow: 0px 15px 32px -14px rgba(0,0,0,0.75);
  background: rgb(255,246,229);
background: -moz-radial-gradient(center, ellipse cover, rgba(255,246,229,1) 43%, rgba(244,200,95,1) 100%);
background: -webkit-radial-gradient(center, ellipse cover, rgba(255,246,229,1) 43%,rgba(244,200,95,1) 100%);
background: radial-gradient(ellipse at center, rgba(255,246,229,1) 43%,rgba(244,200,95,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fff6e5', endColorstr='#f4c85f',GradientType=1 );
}
h2 {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: 'Chewy', cursive;
  color: #dc6432;
  font-size: 3.5rem;
  letter-spacing: 3px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
}
.button {
  width: 150px;
  background: rgb(249,238,199);
  border: 4px solid #dc6432;
  border-radius: 12px;
font-family: 'Chewy', cursive;
color: #dc6432;
font-size: 2rem;
text-shadow: 1px 1px 1px rgba(0,0,0,0.7);
background: -moz-radial-gradient(center, ellipse cover, rgba(249,238,199,1) 29%, rgba(255,207,76,1) 100%);
background: -webkit-radial-gradient(center, ellipse cover, rgba(249,238,199,1) 29%,rgba(255,207,76,1) 100%);
background: radial-gradient(ellipse at center, rgba(249,238,199,1) 29%,rgba(255,207,76,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f9eec7', endColorstr='#ffcf4c',GradientType=1 );
}
.button:hover {
  font-size: 2.25rem;
}
.score {
  position: absolute;
  top: 10px;
  left: 10px;
}
.score img {
  width: 45px;
  position: absolute;
  z-index: 1;
}
.score p {
  position: absolute;
  top: 35px;
  left: 65px;
  width: 125px;
  font-size: 0.75rem;
}
.score .bar {
  position: absolute;
  width: 200px;
  height: 25px;
  top: 5px;
  left: 25px;
  border-radius: 9px;
  overflow: hidden;
  border: 6px solid #eeb418;
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
  height: 25px;
  transition: all .3s;
  background: rgb(85,112,31);
background: -moz-linear-gradient(top, rgba(85,112,31,1) 0%, rgba(164,219,61,1) 4%, rgba(161,211,80,1) 48%, rgba(133,201,24,1) 56%, rgba(109,163,9,1) 100%);
background: -webkit-linear-gradient(top, rgba(85,112,31,1) 0%,rgba(164,219,61,1) 4%,rgba(161,211,80,1) 48%,rgba(133,201,24,1) 56%,rgba(109,163,9,1) 100%);
background: linear-gradient(to bottom, rgba(85,112,31,1) 0%,rgba(164,219,61,1) 4%,rgba(161,211,80,1) 48%,rgba(133,201,24,1) 56%,rgba(109,163,9,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#55701f', endColorstr='#6da309',GradientType=0 );
}
</style>
