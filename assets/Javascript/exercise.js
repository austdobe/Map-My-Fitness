   // Initialize global variables
   var totalCount = "";
   var limit = "";
   var status = "&status=2";
   var queryURL = "";

   var basicQueryURL = "https://cors-anywhere.herokuapp.com/https://wger.de/api/v2/";

   var endpointEquipment = "equipment";
   var endpointExercise = "exercise";
   var endpointExerciseInfo = "exerciseinfo";
   var endpointExerciseCategory = "exercisecategory";
   var endpointExerciseImage = "exerciseimage";
   var endpointLanguage = "language";
   var endpointMuscle = "muscle";

   var equipmentText = "myEquipment"; 
   var myLocalEquipment = {};
   var exerciseEquipment = "";

   // This is an initial AJAX call to generate and sort the list of equipment used in various exercises
   $.ajax({
    url: "https://cors-anywhere.herokuapp.com/" + basicQueryURL + endpointEquipment,
    method: "GET"
      }).then(function(response) {

      myLocalEquipment = response.results
      console.log(myLocalEquipment);
      myLocalEquipment.sort((a, b) => (a.id > b.id)? 1 : -1);

    });

    // Another initial AJAX call to determine the number of exercises in the database so we can set the proper limit
    $.ajax({
        url: basicQueryURL + endpointExercise + "/?language=2" + status,
        method: "GET"
          }).then(function(response) {
            if (response.count > 20) {
                totalCount = response.count;
                limit = "?limit=" + totalCount;
                console.log(response);
            }
        });

    // This function will do all the necessary work to create the workout cards
    function createWorkoutCard(exerciseName, exerciseEquipment, exerciseDescription, head) {

        var workoutDiv = $("<div>").addClass("card workoutCard");
        var p = $("<p>").text("Name: " + exerciseName);
        var ptwo = $("<p>").text("Equipment: " + exerciseEquipment);
        var demoJSON = {
        field: ("Description: " + exerciseDescription)
        }
        
        var favoriteExercise = $("<button>").addClass("float-right");
        favoriteExercise.text("Add to favorites");
        favoriteExercise.addClass("my-favorite-exercise btn btn-primary");
        favoriteExercise.attr("data-exercise-name", exerciseName);
        favoriteExercise.attr("data-equipment", exerciseEquipment);
        favoriteExercise.attr("data-exercise-description", demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
        
        workoutDiv.append(favoriteExercise)
        workoutDiv.append(p);
        workoutDiv.append(ptwo);
        workoutDiv.append(demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
        head.append(workoutDiv)
        $("#results").prepend(workoutDiv);
    
    } // End of createWorkoutCard Function

    // Function to check if there is an error in the equipment entry in the JSON results
    function errorCheck(tempEquipment) {
               
        // Temporary variable to hold the equipment data point as an integer
        // Only downside is that if there are multiple pieces of equipment used in an exercise, it only returns the first item
        var tempNum = parseInt(tempEquipment);

        // Tests to see if tempNum is Not a Number - helps avoid errors
        if (!isNaN(tempNum)) {
            // new temporary variable to find the proper index in myLocalEquipment object that corresponds to the equipment used in this exercise
            exerciseEquipment = myLocalEquipment[tempNum - 1].name;
        }

    } // End of errorCheck function

    function displayExerciseInfoAbs(){

        $("#workoutSubmit").on("click", function(event){
            event.preventDefault();
            var head = $("<div>").text("Ab Workouts").addClass("workoutTitle")

            $.ajax({
                url: basicQueryURL + endpointExercise + "/" + limit + "&language=2" + status,
                method: "GET"
                }).then(function(response) {
                    var results = response.results;

                    for (var i = 0; i < results.length; i++) {

                        // Variables to pass into function creating the workout cards & error checking
                        var exerciseName = results[i].name;
                        var exerciseDescription = results[i].description
                        var tempEquipment = results[i].equipment;

                        // Checks to see if there are any errors in the equipment output in the JSON results
                        errorCheck(tempEquipment);

                        if (results[i].category == 10) {
                            createWorkoutCard(exerciseName, exerciseEquipment, exerciseDescription, head);
                        }
                    }
                    $("#results").prepend(head)
                });
        }); // closing brackets for on click
    } // End of function displayExerciseInfoAbs

    function displayExerciseInfoArms(){

        $("#workoutSubmit").on("click", function(event){
            event.preventDefault();
            var head = $("<div>").text("Arm Workouts").addClass("workoutTitle")
    
            $.ajax({
                url: basicQueryURL + endpointExercise + "/" + limit + "&language=2" + status,
                method: "GET"
                }).then(function(response) {
                    var results = response.results;
        
                    for (var i = 0; i < results.length; i++) {
        
                        // Variables to pass into function creating the workout cards & error checking
                        var exerciseName = results[i].name;
                        var exerciseDescription = results[i].description
                        var tempEquipment = results[i].equipment;

                        // Checks to see if there are any errors in the equipment output in the JSON results
                        errorCheck(tempEquipment);

                        if (results[i].category == 8) {                        
                            createWorkoutCard(exerciseName, exerciseEquipment, exerciseDescription, head);
                        }
                    }
                    $("#results").prepend(head)
                });
        }); // closing brackets for on click
    } // End of function displayExerciseInfoArms

    function displayExerciseInfoBack(){
    
        $("#workoutSubmit").on("click", function(event){
            event.preventDefault();
            var head = $("<div>").text("Back Workouts").addClass("workoutTitle")

            $.ajax({
                url: basicQueryURL + endpointExercise + "/" + limit + "&language=2" + status,
                method: "GET"
                }).then(function(response) {
                    var results = response.results;
        
                    for (var i = 0; i < results.length; i++) {
            
                        // Variables to pass into function creating the workout cards & error checking
                        var exerciseName = results[i].name;
                        var exerciseDescription = results[i].description
                        var tempEquipment = results[i].equipment;

                        // Checks to see if there are any errors in the equipment output in the JSON results
                        errorCheck(tempEquipment);

                        if (results[i].category == 12) {                           
                            createWorkoutCard(exerciseName, exerciseEquipment, exerciseDescription, head);
                        }
                    }
                    $("#results").prepend(head)
                });
        }); // closing brackets for on click
    } // End of function displayExerciseInfoBack
    
    function displayExerciseInfoCalves(){
      
        $("#workoutSubmit").on("click", function(event){
            event.preventDefault();
            var head = $("<div>").text("Calf Workouts").addClass("workoutTitle")
      
            $.ajax({
                url: basicQueryURL + endpointExercise + "/" + limit + "&language=2" + status,
                method: "GET"
                }).then(function(response) {
                    var results = response.results;
        
                    for (var i = 0; i < results.length; i++) {
        
                        // Variables to pass into function creating the workout cards & error checking
                        var exerciseName = results[i].name;
                        var exerciseDescription = results[i].description
                        var tempEquipment = results[i].equipment;

                        // Checks to see if there are any errors in the equipment output in the JSON results
                        errorCheck(tempEquipment);

                        if (results[i].category == 14) { 
                            createWorkoutCard(exerciseName, exerciseEquipment, exerciseDescription, head);
                        }
                    }
                    $("#results").prepend(head)
                });
        }); // closing brackets for on click
    } // End of function displayExerciseInfoCalves

    function displayExerciseInfoChest(){
        
        $("#workoutSubmit").on("click", function(event){
            event.preventDefault();
            var head = $("<div>").text("Chest Workouts").addClass("workoutTitle")

            $.ajax({
                url: basicQueryURL + endpointExercise + "/" + limit + "&language=2" + status,
                method: "GET"
                }).then(function(response) {
                    var results = response.results;
        
                    for (var i = 0; i < results.length; i++) {
        
                        // Variables to pass into function creating the workout cards & error checking
                        var exerciseName = results[i].name;
                        var exerciseDescription = results[i].description
                        var tempEquipment = results[i].equipment;

                        // Checks to see if there are any errors in the equipment output in the JSON results
                        errorCheck(tempEquipment);

                        if (results[i].category == 11) {                        
                            createWorkoutCard(exerciseName, exerciseEquipment, exerciseDescription, head);
                        }
                    }
                    $("#results").prepend(head)
                });
        }); // closing brackets for on click
    } // End of function displayExerciseInfoChest

    function displayExerciseInfoLegs(){
          
        $("#workoutSubmit").on("click", function(event){
            event.preventDefault();
            var head = $("<div>").text("Leg Workouts").addClass("workoutTitle")
          
            $.ajax({
                url: basicQueryURL + endpointExercise + "/" + limit + "&language=2" + status,
                method: "GET"
                }).then(function(response) {
                    var results = response.results;
        
                    for (var i = 0; i < results.length; i++) {
        
                        // Variables to pass into function creating the workout cards & error checking
                        var exerciseName = results[i].name;
                        var exerciseDescription = results[i].description
                        var tempEquipment = results[i].equipment;

                        // Checks to see if there are any errors in the equipment output in the JSON results
                        errorCheck(tempEquipment);
                
                        if (results[i].category == 9) {         
                            createWorkoutCard(exerciseName, exerciseEquipment, exerciseDescription, head);
                        }
                    }
                    $("#results").prepend(head)
                });
        }); // closing brackets for on click
    } // End of function displayExerciseInfoLegs

    function displayExerciseInfoShoulders(){
    
        //This is a double AJAX call. Each time you submit a request, it comes back with only 20 results.
        //The exercise JSON results returns a lot, so the second query generates all the results back in one JSON file.
        $("#workoutSubmit").on("click", function(event){
            event.preventDefault();
            var head = $("<div>").text("Shoulder Workouts").addClass("workoutTitle")
    
            $.ajax({
                url: basicQueryURL + endpointExercise + "/" + limit + "&language=2" + status,
                method: "GET"
                }).then(function(response) {
                    var results = response.results;
        
                    for (var i = 0; i < results.length; i++) {
        
                        // Variables to pass into function creating the workout cards & error checking
                        var exerciseName = results[i].name;
                        var exerciseDescription = results[i].description
                        var tempEquipment = results[i].equipment;

                        // Checks to see if there are any errors in the equipment output in the JSON results
                        errorCheck(tempEquipment);

                        if (results[i].category == 13) {
                        
                        createWorkoutCard(exerciseName, exerciseEquipment, exerciseDescription, head);

                        }
                    }
                    $("#results").prepend(head)
                });
        }); // closing brackets for on click
    } // End of unction displayExerciseInfoShoulders

    $(document).on("click", "#abs", displayExerciseInfoAbs);
    $(document).on("click", "#arms", displayExerciseInfoArms);
    $(document).on("click", "#back", displayExerciseInfoBack);
    $(document).on("click", "#calves", displayExerciseInfoCalves);
    $(document).on("click", "#chest", displayExerciseInfoChest);
    $(document).on("click", "#legs", displayExerciseInfoLegs);
    $(document).on("click", "#shoulders", displayExerciseInfoShoulders);

    $(document).on("click", "#reset", resetExerciseInfo);

    function resetExerciseInfo() {
        console.log("CLICKED")
        workoutDiv = ("");
        console.clear();
        $("#results").empty();
    }