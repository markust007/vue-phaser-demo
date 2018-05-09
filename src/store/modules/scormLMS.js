var scorm = pipwerks.SCORM;  //Shortcut
var lmsConnected = false;
var learnername;
var completionstatus;
var lesson_location;

scorm.version = "1.2";

export const scormLMS = {

  namespaced: true,
  state: {
    location: 1,
    progress: 1,
    userLocation: "",
    userName: ""
  },
  getters: {

  },
  mutations: {
    scormInit(state) {
      lmsConnected = scorm.init();
      if(lmsConnected){
        if(scorm.version = "1.2") {
          learnername = scorm.get("cmi.core.student_name");
          var courseLoc = scorm.get("cmi.core.lesson_location");
          var globalLocation = parseInt(courseLoc);
          if (globalLocation) {
            state.location = globalLocation
          } else {
            state.location = 1
          }
        } else {
          learnername = scorm.get("cmi.learner_name");
          var courseLoc = scorm.get("cmi.location");
          var globalLocation = parseInt(courseLoc);
          if (globalLocation) {
            state.location = globalLocation
          } else {
            state.location = 1
          }
        }
         var comma = learnername.indexOf(",");
         var result = learnername.substr(comma + 2) + " " + learnername.substr(0, comma);
         var student = result
         state.userName = student
         return [learnername, globalLocation];
      } else {
         return "Error: Course is not connected to the LMS";
      }
		},
    scormScore(state, value) {
      if(scorm.version = "1.2") {
        scorm.set("cmi.core.score.min", 0);
        scorm.set("cmi.core.score.max", 10);
        scorm.set("cmi.core.score.raw", value);
      } else {
        scorm.set("cmi.score.min", 0);
        scorm.set("cmi.score.max", 10);
        scorm.set("cmi.score.raw", value);
      }
    },
    scormComplete(state) {
      if(scorm.version = "1.2") {
        scorm.set("cmi.core.lesson_status", "passed");
        scorm.save();
        scorm.quit();
      } else {
        scorm.set("cmi.success_status", "passed");
        scorm.save();
        scorm.quit();
      }
		},
    scormExit(state) {
      if(scorm.version = "1.2") {
        scorm.set("cmi.core.lesson_location", state.location);
        scorm.save();
        scorm.quit();
      } else {
        scorm.set("cmi.location", state.location);
        scorm.save();
        scorm.quit();
      }
		},
    changeUserLocation (state, value) {
      state.userLocation = value;
    },
    changeUserName (state, value) {
      state.userName = value;
    },
    increment (state, value) {
      state.location = value;
    },
    locationPlus (state) {
      state.location += 1;
    },
    locationMinus (state) {
      state.location -= 1;
    },
    incrementProgress (state) {
      if(state.location === state.progress) {
        state.progress += 1
      }
    }
  }
}
