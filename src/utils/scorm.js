/*=============================================
         UNUSED IN THIS BOILERPLATE
=============================================*/
var scorm = pipwerks.SCORM;  //Shortcut
var lmsConnected = false;
var learnername;
var completionstatus;
var lesson_location

function handleError(msg){
   console.log(msg);
   //window.close();
}


export function initCourse(){
   lmsConnected = scorm.init();
   if(lmsConnected){
      completionstatus = scorm.get("cmi.core.lesson_status");
      if(completionstatus === "completed" || completionstatus === "passed"){
         handleError("You have already completed this course. You do not need to continue.");
      }
      learnername = scorm.get("cmi.core.student_name");
      lesson_location = parseInt(scorm.get("cmi.core.lesson_location"));
      return [lmsConnected, learnername, lesson_location, pipwerks.SCORM.version];
   } else {
      handleError("Error: Course could not connect with the LMS");
      return "Error: Course is not connected to the LMS";
   }
}

export function scormQuit(){
   console.log("scormSave");
   console.log("lmsConnected="+lmsConnected);
   if(lmsConnected){

      var success = scorm.quit();
      if(success){
         console.log("success");
         return success;
         setTimeout(function(){
            window.close();
         }, 1000);
      } else {
         handleError("Error: Course could not be set to complete!");
         return "Error: Course is not connected to the LMS";
      }

      //window.close();
   } else {
      handleError("Error: Course is not connected to the LMS");
      return "Error: Course is not connected to the LMS";
   }

}

export function scormSave(){
  console.log("scormSave");
   console.log("lmsConnected="+lmsConnected);
   if(lmsConnected){
      var success = scorm.save();
      if(success){
        console.log("success");
        return "success";
      } else {
         handleError("Error: Course could not be saved!");
         return "Error: Course could not be saved!";
      }
   } else {
      handleError("Error: Course is not connected to the LMS");
      return "Error: Course is not connected to the LMS";
   }
}

export function scormSetInteraction(val, str){
   console.log("set " + val + " to " + str);
   if(lmsConnected){

      result = scorm.set(val, str);
      console.log(result);
      return result;
   } else {
      handleError("Error: Course is not connected to the LMS");
      return "Error: Course is not connected to the LMS";
   }

}


export function scormSetLocation(str){
   if(lmsConnected){
      result = scorm.set("cmi.core.lesson_location", str);
      return result;
   } else {
      handleError("Error: Course is not connected to the LMS");
      return "Error: Course is not connected to the LMS";
   }

}

export function scormSetScore(raw,max){
   if(lmsConnected){
      //r1 = scorm.set("cmi.core.score.raw", Number(raw));
      //r2 = scorm.set("cmi.core.score.max", max);
      //r3 = scorm.set("cmi.core.score.min", 0);
      if(pipwerks.SCORM.version == "2004"){
         r0 = scorm.set("cmi.score.scaled", Number(raw)/Number(max));
         r1 = scorm.set("cmi.score.raw", Number(raw));
         r2 = scorm.set("cmi.score.max", max);
         r3 = scorm.set("cmi.score.min", 0);
         return ["scaled result:"+r0,"raw result:"+r1,"max result:"+r2,"min result:"+r3];
      }else{
         r1 = scorm.set("cmi.core.score.raw", Number(raw));
         r2 = scorm.set("cmi.core.score.max", Number(max));
         r3 = scorm.set("cmi.core.score.min", 0);
         return ["raw result:"+r1,"max result:"+r2,"min result:"+r3];
      }


   } else {
      handleError("Error: Course is not connected to the LMS");
      return "Error: Course is not connected to the LMS";
   }

}

export function scormSetStatus(c){
   if(lmsConnected){
      if(pipwerks.SCORM.version == "2004"){
         result = scorm.set("cmi.completion_status", c);
      }else{
         result = scorm.set("cmi.core.lesson_status", c);
      }
      return result;
   } else {
      handleError("Error: Course is not connected to the LMS");
      return "Error: Course is not connected to the LMS";
   }

}

// export default { handleError, initCourse, scormQuit, scormSave, scormSetScore };
