    //alert("Resetting..Abs");
    
    function displayExerciseInfoAbs(){

        // Initialize global variables
        var totalCount = "";
        var limit = "";
        var status = "&status=2";
        var queryURL = "";
    
        var basicQueryURL = "https://cors-anywhere.herokuapp.com/https://wger.de/api/v2";
    
        var endpointEquipment = "equipment";
        var endpointExercise = "exercise";
        var endpointExerciseInfo = "exerciseinfo";
        var endpointExerciseCategory = "exercisecategory";
        var endpointExerciseImage = "exerciseimage";
        var endpointLanguage = "language";
        var endpointMuscle = "muscle";
        var equipmentText = "myEquipment"; 
        var myLocalEquipment = {};
    
        console.log(basicQueryURL + endpointExerciseCategory);
    
        $.ajax({
          url: "https://cors-anywhere.herokuapp.com/" + basicQueryURL + "/" + endpointEquipment,
          method: "GET"
            }).then(function(response) {
            myLocalEquipment = response.results
            console.log(myLocalEquipment);
            });
    
      function displayObject() {
      // console.log(myLocalEquipment);
      }
      setTimeout(displayObject, 6000);
      // console.log(myLocalEquipment);
    
      function displaySort() {
        myLocalEquipment.sort((a, b) => (a.id > b.id)? 1 : -1);
        // console.log(myLocalEquipment);
        // console.log(myLocalEquipment[0].name);
      }
    
      setTimeout(displaySort, 6000);
        // console.log(myLocalEquipment);
    
        //This is a double AJAX call. Each time you submit a request, it comes back with only 20 results.
        //The exercise JSON results returns a lot, so the second query generates all the results back in one JSON file.
        $("#workoutSubmit").on("click", function(event){
          event.preventDefault();
          var head = $("<div>").text("Ab Workouts").addClass("workoutTitle")
          
    
        $.ajax({
            url: basicQueryURL + "/" + endpointExercise,
            method: "GET"
              }).then(function(response) {
              if (response.count > 20) {
              totalCount = response.count;
              console.log(totalCount);
              limit = "?limit=" + totalCount;
    
              console.log(basicQueryURL + "/" + endpointExercise + "/" + limit + status);
    
              $.ajax({
                url: basicQueryURL + "/" + endpointExercise + "/" + limit + "&language=2" + status,
                method: "GET"
                }).then(function(response) {
                    console.log(response);
                    var results = response.results;
    
                    for (var i = 0; i < results.length; i++) {
    
                    // Temporary variable to hold the equipment data point as an integer
                    // Only downside is that if there are multiple pieces of equipment used in an exercise, it only returns the first item
                    var tempNum = parseInt(results[i].equipment)
    
                    // Tests to see if tempNum is Not a Number - helps avoid errors
                    if (isNaN(tempNum)) {
                        console.log("original: " + results[i].equipment + " - Not a number");
                        } else {
                        console.log("original: " + results[i].equipment + " - Number: " + tempNum + " - Type: " + typeof tempNum);
                        // new temporary variable to find the proper index in myLocalEquipment object that corresponds to the equipment used in this exercise
                        var tempEquipment = myLocalEquipment[tempNum - 1].name;
                      }
                      // if (results[i].equipment) {
                      // var temporaryEquipment = parseInt(results[i].equipment) - 1;
                      // var myEquipment = myLocalEquipment[temporaryEquipment].name;
                      // } else { var myEquipment = 3;}
    
                      if (results[i].category == 10) {
                      
                      var workoutDiv = $("<div>").addClass("card workoutCard");
                      var p = $("<p>").text("Name: " + results[i].name);
                      var ptwo = $("<p>").text("Equipment: " + tempEquipment);
                      //var pthree = $("<p>").text("Description: " + results[i].description);
                      var demoJSON = {
                        field: ("Description: " + results[i].description)
                      }
                      
                      var favoriteExercise = $("<button>").addClass("float-right");
                      favoriteExercise.text("Add to favorites");
                      favoriteExercise.addClass("my-favorite-exercise btn btn-primary");
                      favoriteExercise.attr("data-exercise-name", results[i].name);
                      favoriteExercise.attr("data-equipment", tempEquipment);
                      favoriteExercise.attr("data-exercise-description", demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                      
                      workoutDiv.append(favoriteExercise)
                      workoutDiv.append(p);
                      workoutDiv.append(ptwo);
                      workoutDiv.append(demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                      head.append(workoutDiv)
                      $("#results").prepend(workoutDiv);
                      }
                    }
                    $("#results").prepend(head)
                });
            }
        });
      }); // closing brackets for on click
    }
    
    function displayExerciseInfoArms(){
    
      // Initialize global variables
      var totalCount = "";
      var limit = "";
      var status = "&status=2";
      var queryURL = "";
      
      var basicQueryURL = "https://cors-anywhere.herokuapp.com/https://wger.de/api/v2";
      
      var endpointEquipment = "equipment";
      var endpointExercise = "exercise";
      var endpointExerciseInfo = "exerciseinfo";
      var endpointExerciseCategory = "exercisecategory";
      var endpointExerciseImage = "exerciseimage";
      var endpointLanguage = "language";
      var endpointMuscle = "muscle";
      var equipmentText = "myEquipment"; 
      var myLocalEquipment = {};
      
      console.log(basicQueryURL + endpointExerciseCategory);
      
      $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + basicQueryURL + "/" + endpointEquipment,
        method: "GET"
          }).then(function(response) {
          myLocalEquipment = response.results
          console.log(myLocalEquipment);
          });
      
      function displayObject() {
      // console.log(myLocalEquipment);
      }
      setTimeout(displayObject, 6000);
      // console.log(myLocalEquipment);
      
      function displaySort() {
      myLocalEquipment.sort((a, b) => (a.id > b.id)? 1 : -1);
      // console.log(myLocalEquipment);
      // console.log(myLocalEquipment[0].name);
      }
      
      setTimeout(displaySort, 6000);
      // console.log(myLocalEquipment);
      
      //This is a double AJAX call. Each time you submit a request, it comes back with only 20 results.
      //The exercise JSON results returns a lot, so the second query generates all the results back in one JSON file.
      $("#workoutSubmit").on("click", function(event){
        event.preventDefault();
      var head = $("<div>").text("Arm Workouts").addClass("workoutTitle")
      $.ajax({
          url: basicQueryURL + "/" + endpointExercise,
          method: "GET"
            }).then(function(response) {
            if (response.count > 20) {
            totalCount = response.count;
            console.log(totalCount);
            limit = "?limit=" + totalCount;
      
            console.log(basicQueryURL + "/" + endpointExercise + "/" + limit + status);
      
            $.ajax({
              url: basicQueryURL + "/" + endpointExercise + "/" + limit + "&language=2" + status,
              method: "GET"
              }).then(function(response) {
                  console.log(response);
                  var results = response.results;
      
                  for (var i = 0; i < results.length; i++) {
      
                  // Temporary variable to hold the equipment data point as an integer
                  // Only downside is that if there are multiple pieces of equipment used in an exercise, it only returns the first item
                  var tempNum = parseInt(results[i].equipment)
      
                  // Tests to see if tempNum is Not a Number - helps avoid errors
                  if (isNaN(tempNum)) {
                      console.log("original: " + results[i].equipment + " - Not a number");
                      } else {
                      console.log("original: " + results[i].equipment + " - Number: " + tempNum + " - Type: " + typeof tempNum);
                      // new temporary variable to find the proper index in myLocalEquipment object that corresponds to the equipment used in this exercise
                      var tempEquipment = myLocalEquipment[tempNum - 1].name;
                    }
                    // if (results[i].equipment) {
                    // var temporaryEquipment = parseInt(results[i].equipment) - 1;
                    // var myEquipment = myLocalEquipment[temporaryEquipment].name;
                    // } else { var myEquipment = 3;}
      
                    if (results[i].category == 8) {
                      
                    var workoutDiv = $("<div>").addClass("card workoutCard");
                    var p = $("<p>").text("Name: " + results[i].name);
                    var ptwo = $("<p>").text("Equipment: " + tempEquipment);
                    // var pthree = $("<p>").text("Description: " + results[i].description);
                    var demoJSON = {
                      field: ("Description: " + results[i].description)
                    }
                    
                    var favoriteExercise = $("<button>").addClass("float-right");
                    favoriteExercise.text("Add to favorites");
                    favoriteExercise.addClass("my-favorite-exercise btn btn-primary");
                    favoriteExercise.attr("data-exercise-name", results[i].name);
                    favoriteExercise.attr("data-equipment", tempEquipment);
                    favoriteExercise.attr("data-exercise-description", demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                    workoutDiv.append(favoriteExercise)
                    workoutDiv.append(p);
                    workoutDiv.append(ptwo);
                    workoutDiv.append(demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                    $("#results").prepend(workoutDiv);
                    }
                  }
                  $("#results").prepend(head)
              });
          }
      });
      }); // closing brackets for on click
      }
    
      function displayExerciseInfoBack(){
    
        // Initialize global variables
        var totalCount = "";
        var limit = "";
        var status = "&status=2";
        var queryURL = "";
        
        var basicQueryURL = "https://cors-anywhere.herokuapp.com/https://wger.de/api/v2";
        
        var endpointEquipment = "equipment";
        var endpointExercise = "exercise";
        var endpointExerciseInfo = "exerciseinfo";
        var endpointExerciseCategory = "exercisecategory";
        var endpointExerciseImage = "exerciseimage";
        var endpointLanguage = "language";
        var endpointMuscle = "muscle";
        var equipmentText = "myEquipment"; 
        var myLocalEquipment = {};
        
        
        console.log(basicQueryURL + endpointExerciseCategory);
        
        $.ajax({
          url: "https://cors-anywhere.herokuapp.com/" + basicQueryURL + "/" + endpointEquipment,
          method: "GET"
            }).then(function(response) {
            myLocalEquipment = response.results
            console.log(myLocalEquipment);
            });
        
        function displayObject() {
        // console.log(myLocalEquipment);
        }
        setTimeout(displayObject, 6000);
        // console.log(myLocalEquipment);
        
        function displaySort() {
        myLocalEquipment.sort((a, b) => (a.id > b.id)? 1 : -1);
        // console.log(myLocalEquipment);
        // console.log(myLocalEquipment[0].name);
        }
        
        setTimeout(displaySort, 6000);
        // console.log(myLocalEquipment);
        
        //This is a double AJAX call. Each time you submit a request, it comes back with only 20 results.
        //The exercise JSON results returns a lot, so the second query generates all the results back in one JSON file.
        $("#workoutSubmit").on("click", function(event){
          event.preventDefault();
          var head = $("<div>").text("Back Workouts").addClass("workoutTitle")
        $.ajax({
            url: basicQueryURL + "/" + endpointExercise,
            method: "GET"
              }).then(function(response) {
              if (response.count > 20) {
              totalCount = response.count;
              console.log(totalCount);
              limit = "?limit=" + totalCount;
        
              console.log(basicQueryURL + "/" + endpointExercise + "/" + limit + status);
        
              $.ajax({
                url: basicQueryURL + "/" + endpointExercise + "/" + limit + "&language=2" + status,
                method: "GET"
                }).then(function(response) {
                    console.log(response);
                    var results = response.results;
        
                    for (var i = 0; i < results.length; i++) {
        
                    // Temporary variable to hold the equipment data point as an integer
                    // Only downside is that if there are multiple pieces of equipment used in an exercise, it only returns the first item
                    var tempNum = parseInt(results[i].equipment)
        
                    // Tests to see if tempNum is Not a Number - helps avoid errors
                    if (isNaN(tempNum)) {
                        console.log("original: " + results[i].equipment + " - Not a number");
                        } else {
                        console.log("original: " + results[i].equipment + " - Number: " + tempNum + " - Type: " + typeof tempNum);
                        // new temporary variable to find the proper index in myLocalEquipment object that corresponds to the equipment used in this exercise
                        var tempEquipment = myLocalEquipment[tempNum - 1].name;
                      }
                      // if (results[i].equipment) {
                      // var temporaryEquipment = parseInt(results[i].equipment) - 1;
                      // var myEquipment = myLocalEquipment[temporaryEquipment].name;
                      // } else { var myEquipment = 3;}
        
                      if (results[i].category == 12) {
                        
                      var workoutDiv = $("<div>").addClass("card workoutCard");
                      var p = $("<p>").text("Name: " + results[i].name);
                      var ptwo = $("<p>").text("Equipment: " + tempEquipment);
                      var pthree = $("<p>").text("Description: " + results[i].description);
                      let demoJSON = {
                        field: ("Description: " + results[i].description)
                      }
                      
                      var favoriteExercise = $("<button>").addClass("float-right");
                      favoriteExercise.text("Add to favorites");
                      favoriteExercise.addClass("my-favorite-exercise btn btn-primary");
                      favoriteExercise.attr("data-exercise-name", results[i].name);
                      favoriteExercise.attr("data-equipment", tempEquipment);
                      favoriteExercise.attr("data-exercise-description", demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                      workoutDiv.append(favoriteExercise)                    
                      workoutDiv.append(p);
                      workoutDiv.append(ptwo);
                      workoutDiv.append(demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                      $("#results").prepend(workoutDiv);
                      }
                    }
                    $("#results").prepend(head)
                });
            }
        });
        }); // closing brackets for on click
        }
        
        function displayExerciseInfoCalves(){
    
          // Initialize global variables
          var totalCount = "";
          var limit = "";
          var status = "&status=2";
          var queryURL = "";
          
          var basicQueryURL = "https://cors-anywhere.herokuapp.com/https://wger.de/api/v2";
          
          var endpointEquipment = "equipment";
          var endpointExercise = "exercise";
          var endpointExerciseInfo = "exerciseinfo";
          var endpointExerciseCategory = "exercisecategory";
          var endpointExerciseImage = "exerciseimage";
          var endpointLanguage = "language";
          var endpointMuscle = "muscle";
          var equipmentText = "myEquipment"; 
          var myLocalEquipment = {};
          
          
          console.log(basicQueryURL + endpointExerciseCategory);
          
          $.ajax({
            url: "https://cors-anywhere.herokuapp.com/" + basicQueryURL + "/" + endpointEquipment,
            method: "GET"
              }).then(function(response) {
              myLocalEquipment = response.results
              console.log(myLocalEquipment);
              });
          
          function displayObject() {
          // console.log(myLocalEquipment);
          }
          setTimeout(displayObject, 6000);
          // console.log(myLocalEquipment);
          
          function displaySort() {
          myLocalEquipment.sort((a, b) => (a.id > b.id)? 1 : -1);
          // console.log(myLocalEquipment);
          // console.log(myLocalEquipment[0].name);
          }
          
          setTimeout(displaySort, 6000);
          // console.log(myLocalEquipment);
          
          //This is a double AJAX call. Each time you submit a request, it comes back with only 20 results.
          //The exercise JSON results returns a lot, so the second query generates all the results back in one JSON file.
          $("#workoutSubmit").on("click", function(event){
            event.preventDefault();
            var head = $("<div>").text("Calf Workouts").addClass("workoutTitle")
          $.ajax({
              url: basicQueryURL + "/" + endpointExercise,
              method: "GET"
                }).then(function(response) {
                if (response.count > 20) {
                totalCount = response.count;
                console.log(totalCount);
                limit = "?limit=" + totalCount;
          
                console.log(basicQueryURL + "/" + endpointExercise + "/" + limit + status);
          
                $.ajax({
                  url: basicQueryURL + "/" + endpointExercise + "/" + limit + "&language=2" + status,
                  method: "GET"
                  }).then(function(response) {
                      console.log(response);
                      var results = response.results;
          
                      for (var i = 0; i < results.length; i++) {
          
                      // Temporary variable to hold the equipment data point as an integer
                      // Only downside is that if there are multiple pieces of equipment used in an exercise, it only returns the first item
                      var tempNum = parseInt(results[i].equipment)
          
                      // Tests to see if tempNum is Not a Number - helps avoid errors
                      if (isNaN(tempNum)) {
                          console.log("original: " + results[i].equipment + " - Not a number");
                          } else {
                          console.log("original: " + results[i].equipment + " - Number: " + tempNum + " - Type: " + typeof tempNum);
                          // new temporary variable to find the proper index in myLocalEquipment object that corresponds to the equipment used in this exercise
                          var tempEquipment = myLocalEquipment[tempNum - 1].name;
                        }
                        // if (results[i].equipment) {
                        // var temporaryEquipment = parseInt(results[i].equipment) - 1;
                        // var myEquipment = myLocalEquipment[temporaryEquipment].name;
                        // } else { var myEquipment = 3;}
          
                        if (results[i].category == 14) {
                          
                        var workoutDiv = $("<div>").addClass("card workoutCard");
                        var p = $("<p>").text("Name: " + results[i].name);
                        var ptwo = $("<p>").text("Equipment: " + tempEquipment);
                        var pthree = $("<p>").text("Description: " + results[i].description);
                        let demoJSON = {
                          field: ("Description: " + results[i].description)
                        }
                        
                        var favoriteExercise = $("<button>").addClass("float-right");
                        favoriteExercise.text("Add to favorites");
                        favoriteExercise.addClass("my-favorite-exercise btn btn-primary");
                        favoriteExercise.attr("data-exercise-name", results[i].name);
                        favoriteExercise.attr("data-equipment", tempEquipment);
                        favoriteExercise.attr("data-exercise-description", demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                        workoutDiv.append(favoriteExercise)
                        workoutDiv.append(p);
                        workoutDiv.append(ptwo);
                        workoutDiv.append(demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                        $("#results").prepend(workoutDiv);
                        }
                      }
                      $("#results").prepend(head)
                  });
              }
          });
          }); // closing brackets for on click
          }
    
          function displayExerciseInfoChest(){
    
            // Initialize global variables
            var totalCount = "";
            var limit = "";
            var status = "&status=2";
            var queryURL = "";
            
            var basicQueryURL = "https://cors-anywhere.herokuapp.com/https://wger.de/api/v2";
            
            var endpointEquipment = "equipment";
            var endpointExercise = "exercise";
            var endpointExerciseInfo = "exerciseinfo";
            var endpointExerciseCategory = "exercisecategory";
            var endpointExerciseImage = "exerciseimage";
            var endpointLanguage = "language";
            var endpointMuscle = "muscle";
            var equipmentText = "myEquipment"; 
            var myLocalEquipment = {};
            
            
            console.log(basicQueryURL + endpointExerciseCategory);
            
            $.ajax({
              url: "https://cors-anywhere.herokuapp.com/" + basicQueryURL + "/" + endpointEquipment,
              method: "GET"
                }).then(function(response) {
                myLocalEquipment = response.results
                console.log(myLocalEquipment);
                });
            
            function displayObject() {
            // console.log(myLocalEquipment);
            }
            setTimeout(displayObject, 6000);
            // console.log(myLocalEquipment);
            
            function displaySort() {
            myLocalEquipment.sort((a, b) => (a.id > b.id)? 1 : -1);
            // console.log(myLocalEquipment);
            // console.log(myLocalEquipment[0].name);
            }
            
            setTimeout(displaySort, 6000);
            // console.log(myLocalEquipment);
            
            //This is a double AJAX call. Each time you submit a request, it comes back with only 20 results.
            //The exercise JSON results returns a lot, so the second query generates all the results back in one JSON file.
            $("#workoutSubmit").on("click", function(event){
              event.preventDefault();
              var head = $("<div>").text("Chest Workouts").addClass("workoutTitle")
            $.ajax({
                url: basicQueryURL + "/" + endpointExercise,
                method: "GET"
                  }).then(function(response) {
                  if (response.count > 20) {
                  totalCount = response.count;
                  console.log(totalCount);
                  limit = "?limit=" + totalCount;
            
                  console.log(basicQueryURL + "/" + endpointExercise + "/" + limit + status);
            
                  $.ajax({
                    url: basicQueryURL + "/" + endpointExercise + "/" + limit + "&language=2" + status,
                    method: "GET"
                    }).then(function(response) {
                        console.log(response);
                        var results = response.results;
            
                        for (var i = 0; i < results.length; i++) {
            
                        // Temporary variable to hold the equipment data point as an integer
                        // Only downside is that if there are multiple pieces of equipment used in an exercise, it only returns the first item
                        var tempNum = parseInt(results[i].equipment)
            
                        // Tests to see if tempNum is Not a Number - helps avoid errors
                        if (isNaN(tempNum)) {
                            console.log("original: " + results[i].equipment + " - Not a number");
                            } else {
                            console.log("original: " + results[i].equipment + " - Number: " + tempNum + " - Type: " + typeof tempNum);
                            // new temporary variable to find the proper index in myLocalEquipment object that corresponds to the equipment used in this exercise
                            var tempEquipment = myLocalEquipment[tempNum - 1].name;
                          }
                          // if (results[i].equipment) {
                          // var temporaryEquipment = parseInt(results[i].equipment) - 1;
                          // var myEquipment = myLocalEquipment[temporaryEquipment].name;
                          // } else { var myEquipment = 3;}
            
                          if (results[i].category == 11) {
                            
                          var workoutDiv = $("<div>").addClass("card workoutCard");
                          var p = $("<p>").text("Name: " + results[i].name);
                          var ptwo = $("<p>").text("Equipment: " + tempEquipment);
                          var pthree = $("<p>").text("Description: " + results[i].description);
                          let demoJSON = {
                            field: ("Description: " + results[i].description)
                          }
                          
                          var favoriteExercise = $("<button>").addClass("float-right");
                          favoriteExercise.text("Add to favorites");
                          favoriteExercise.addClass("my-favorite-exercise btn btn-primary");
                          favoriteExercise.attr("data-exercise-name", results[i].name);
                          favoriteExercise.attr("data-equipment", tempEquipment);
                          favoriteExercise.attr("data-exercise-description", demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                          workoutDiv.append(favoriteExercise)
                          workoutDiv.append(p);
                          workoutDiv.append(ptwo);
                          workoutDiv.append(demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                          $("#results").prepend(workoutDiv);
                          }
                        }
                        $("#results").prepend(head)
                    });
                }
            });
            }); // closing brackets for on click
            }
    
            function displayExerciseInfoLegs(){
    
              // Initialize global variables
              var totalCount = "";
              var limit = "";
              var status = "&status=2";
              var queryURL = "";
              
              var basicQueryURL = "https://cors-anywhere.herokuapp.com/https://wger.de/api/v2";
              
              var endpointEquipment = "equipment";
              var endpointExercise = "exercise";
              var endpointExerciseInfo = "exerciseinfo";
              var endpointExerciseCategory = "exercisecategory";
              var endpointExerciseImage = "exerciseimage";
              var endpointLanguage = "language";
              var endpointMuscle = "muscle";
              var equipmentText = "myEquipment"; 
              var myLocalEquipment = {};
              
              
              console.log(basicQueryURL + endpointExerciseCategory);
              
              $.ajax({
                url: "https://cors-anywhere.herokuapp.com/" + basicQueryURL + "/" + endpointEquipment,
                method: "GET"
                  }).then(function(response) {
                  myLocalEquipment = response.results
                  console.log(myLocalEquipment);
                  });
              
              function displayObject() {
              // console.log(myLocalEquipment);
              }
              setTimeout(displayObject, 6000);
              // console.log(myLocalEquipment);
              
              function displaySort() {
              myLocalEquipment.sort((a, b) => (a.id > b.id)? 1 : -1);
              // console.log(myLocalEquipment);
              // console.log(myLocalEquipment[0].name);
              }
              
              setTimeout(displaySort, 6000);
              // console.log(myLocalEquipment);
              
              //This is a double AJAX call. Each time you submit a request, it comes back with only 20 results.
              //The exercise JSON results returns a lot, so the second query generates all the results back in one JSON file.
              $("#workoutSubmit").on("click", function(event){
                event.preventDefault();
                var head = $("<div>").text("Leg Workouts").addClass("workoutTitle")
              $.ajax({
                  url: basicQueryURL + "/" + endpointExercise,
                  method: "GET"
                    }).then(function(response) {
                    if (response.count > 20) {
                    totalCount = response.count;
                    console.log(totalCount);
                    limit = "?limit=" + totalCount;
              
                    console.log(basicQueryURL + "/" + endpointExercise + "/" + limit + status);
              
                    $.ajax({
                      url: basicQueryURL + "/" + endpointExercise + "/" + limit + "&language=2" + status,
                      method: "GET"
                      }).then(function(response) {
                          console.log(response);
                          var results = response.results;
              
                          for (var i = 0; i < results.length; i++) {
              
                          // Temporary variable to hold the equipment data point as an integer
                          // Only downside is that if there are multiple pieces of equipment used in an exercise, it only returns the first item
                          var tempNum = parseInt(results[i].equipment)
              
                          // Tests to see if tempNum is Not a Number - helps avoid errors
                          if (isNaN(tempNum)) {
                              console.log("original: " + results[i].equipment + " - Not a number");
                              } else {
                              console.log("original: " + results[i].equipment + " - Number: " + tempNum + " - Type: " + typeof tempNum);
                              // new temporary variable to find the proper index in myLocalEquipment object that corresponds to the equipment used in this exercise
                              var tempEquipment = myLocalEquipment[tempNum - 1].name;
                            }
                            // if (results[i].equipment) {
                            // var temporaryEquipment = parseInt(results[i].equipment) - 1;
                            // var myEquipment = myLocalEquipment[temporaryEquipment].name;
                            // } else { var myEquipment = 3;}
              
                            if (results[i].category == 9) {
                              
                            var workoutDiv = $("<div>").addClass("card workoutCard");
                            var p = $("<p>").text("Name: " + results[i].name);
                            var ptwo = $("<p>").text("Equipment: " + tempEquipment);
                            var pthree = $("<p>").text("Description: " + results[i].description);
                            let demoJSON = {
                              field: ("Description: " + results[i].description)
                            }
                            
                            var favoriteExercise = $("<button>").addClass("float-right");
                            favoriteExercise.text("Add to favorites");
                            favoriteExercise.addClass("my-favorite-exercise btn btn-primary");
                            favoriteExercise.attr("data-exercise-name", results[i].name);
                            favoriteExercise.attr("data-equipment", tempEquipment);
                            favoriteExercise.attr("data-exercise-description", demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                            workoutDiv.append(favoriteExercise)
                            workoutDiv.append(p);
                            workoutDiv.append(ptwo);
                            workoutDiv.append(demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                            $("#results").prepend(workoutDiv);
                            }
                          }
                          $("#results").prepend(head)
                      });
                  }
              });
              }); // closing brackets for on click
              }
    
              function displayExerciseInfoShoulders(){
    
                // Initialize global variables
                var totalCount = "";
                var limit = "";
                var status = "&status=2";
                var queryURL = "";
                
                var basicQueryURL = "https://cors-anywhere.herokuapp.com/https://wger.de/api/v2";
                
                var endpointEquipment = "equipment";
                var endpointExercise = "exercise";
                var endpointExerciseInfo = "exerciseinfo";
                var endpointExerciseCategory = "exercisecategory";
                var endpointExerciseImage = "exerciseimage";
                var endpointLanguage = "language";
                var endpointMuscle = "muscle";
                var equipmentText = "myEquipment"; 
                var myLocalEquipment = {};
                
                
                console.log(basicQueryURL + endpointExerciseCategory);
                
                $.ajax({
                  url: "https://cors-anywhere.herokuapp.com/" + basicQueryURL + "/" + endpointEquipment,
                  method: "GET"
                    }).then(function(response) {
                    myLocalEquipment = response.results
                    console.log(myLocalEquipment);
                    });
                
                function displayObject() {
                // console.log(myLocalEquipment);
                }
                setTimeout(displayObject, 6000);
                // console.log(myLocalEquipment);
                
                function displaySort() {
                myLocalEquipment.sort((a, b) => (a.id > b.id)? 1 : -1);
                // console.log(myLocalEquipment);
                // console.log(myLocalEquipment[0].name);
                }
                
                setTimeout(displaySort, 6000);
                // console.log(myLocalEquipment);
                
                //This is a double AJAX call. Each time you submit a request, it comes back with only 20 results.
                //The exercise JSON results returns a lot, so the second query generates all the results back in one JSON file.
                $("#workoutSubmit").on("click", function(event){
                  event.preventDefault();
                  var head = $("<div>").text("shoulder Workouts").addClass("workoutTitle")
                $.ajax({
                    url: basicQueryURL + "/" + endpointExercise,
                    method: "GET"
                      }).then(function(response) {
                      if (response.count > 20) {
                      totalCount = response.count;
                      console.log(totalCount);
                      limit = "?limit=" + totalCount;
                
                      console.log(basicQueryURL + "/" + endpointExercise + "/" + limit + status);
                
                      $.ajax({
                        url: basicQueryURL + "/" + endpointExercise + "/" + limit + "&language=2" + status,
                        method: "GET"
                        }).then(function(response) {
                            console.log(response);
                            var results = response.results;
                
                            for (var i = 0; i < results.length; i++) {
                
                            // Temporary variable to hold the equipment data point as an integer
                            // Only downside is that if there are multiple pieces of equipment used in an exercise, it only returns the first item
                            var tempNum = parseInt(results[i].equipment)
                
                            // Tests to see if tempNum is Not a Number - helps avoid errors
                            if (isNaN(tempNum)) {
                                console.log("original: " + results[i].equipment + " - Not a number");
                                } else {
                                console.log("original: " + results[i].equipment + " - Number: " + tempNum + " - Type: " + typeof tempNum);
                                // new temporary variable to find the proper index in myLocalEquipment object that corresponds to the equipment used in this exercise
                                var tempEquipment = myLocalEquipment[tempNum - 1].name;
                              }
                              // if (results[i].equipment) {
                              // var temporaryEquipment = parseInt(results[i].equipment) - 1;
                              // var myEquipment = myLocalEquipment[temporaryEquipment].name;
                              // } else { var myEquipment = 3;}
                
                              if (results[i].category == 13) {
                                
                              var workoutDiv = $("<div>").addClass("card workoutCard");
                              var head= $("<h1>").text("Shoulders")
                              var p = $("<p>").text("Name: " + results[i].name);
                              var ptwo = $("<p>").text("Equipment: " + tempEquipment);
                              var pthree = $("<p>").text("Description: " + results[i].description);
                              let demoJSON = {
                                field: ("Description: " + results[i].description)
                              }
                              var favoriteExercise = $("<button>").addClass("float-right");
                              favoriteExercise.text("Add to favorites");
                              favoriteExercise.addClass("my-favorite-exercise btn btn-primary");
                              favoriteExercise.attr("data-exercise-name", results[i].name);
                              favoriteExercise.attr("data-equipment", tempEquipment);
                              favoriteExercise.attr("data-exercise-description", demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                              workoutDiv.append(favoriteExercise)
                              workoutDiv.append(p);
                              workoutDiv.append(ptwo);
                              workoutDiv.append(demoJSON.field.replace(/(<([^>]+)>)/ig, ""));
                              $("#results").prepend(workoutDiv);
                              }
                            }
                            $("#results").prepend(head)
                        });
                    }
                });
                }); // closing brackets for on click
                }   
    
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