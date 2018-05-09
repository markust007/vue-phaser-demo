<template>
    <button class="jira" @click="launchCollector">Feedback</button>
</template>

<script>
/* ===========================================
                         JIRA STUFF
=============================================*/
// var userLocation = ''


// Optional:
// If you want you can create something to collect the user's name and email.
// Then you can pass it to Jira so they don't have to enter it in every time.
// I usually don't do this because I just tell people to put in their initials and don't worry about entering their email.
// It's not as annoying if you just have to enter your initials every time.
// var userName = "Justin Pille"
// var userEmail = "jpille@alleni.com"


// function launchCollector() {
//
//     // If you happen to have a number symbol in your location it would be interpreted as a hash in the URL.
//     // Just to be safe, replace all hashes with the corresponding URL code.
//     var location = userLocation.replace('#', '%23');
//
//     // I like to use the location as the default summary
//     // This is optional - you don't have to pass in a summary value at all
//     var summary = location;
//
//     var collectorURL = 'collector.html' + '?location=' + location + '&summary=' + summary;
//     var windowName = "_blank";
//     var windowSpecs = "height=727px, width=820px, location=0, menubar=0, scrollbars=0, status=0, titlebar=0, toolbar=0";
//
//     window.open(collectorURL, windowName, windowSpecs);
//
// }

  module.exports = {
    data: function () {
      return {

        }
      },
      computed: {
        userLocation () {
          return this.$store.state.userLocation
        }
      },
      methods: {
        launchCollector: function () {
          var location = this.userLocation.replace('#', '%23');

          // I like to use the location as the default summary
          // This is optional - you don't have to pass in a summary value at all
          var summary = location;

          var collectorURL = 'collector.html' + '?location=' + location + '&summary=' + summary;
          var windowName = "_blank";
          var windowSpecs = "height=727px, width=820px, location=0, menubar=0, scrollbars=0, status=0, titlebar=0, toolbar=0";

          window.open(collectorURL, windowName, windowSpecs);
        }
      }

    }

</script>

<style scoped>
.jira {
  position: fixed;
  bottom: auto;
  left: 0;
  top: 10px;
  color: #fff;
  z-index: 999;
  background-color: #000;
  padding: .4rem .75rem;
  border: 0px;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 1rem;
  border-bottom: 0px solid #666;
}
</style>
