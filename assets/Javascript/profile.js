$(document).ready(function(){
    // Links to firebase database
    var database = firebase.database();
    var userLoggedIn;
    // Updates profile info when first loading page
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userLoggedIn = user;
            // Creates user info update modal once logged in and removed new user sign up form due to id conflicts
            createUpdateInfoModal();
            $("#newUserDiv").empty();

            // Updates recipes favorites on login
            favoritesUpdate();

            // Updates workout favorites on login
            favoriteWorkoutsUpdate();

            // Updates profile info on login
            database.ref("/users/"+firebase.auth().currentUser.uid).on("value", function(snapshot) {
                $("#weight").text(snapshot.val().weight);
                $("#height").text(snapshot.val().height);
                $("#age").text(snapshot.val().age);
                $("#activity").text(snapshot.val().activityLevel);
            });
        };
    });
    
    // Updates recipe favorites list div when favorites when called
    function favoritesUpdate() {
        $("#myRecipes").empty();

        // Loops through each child in favorites/recipes section
        database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/recipes").once("value", function(parent) {
            parent.forEach(function(snapshot) {
                var divWrapper = $("<div>");
                divWrapper.addClass("card col-lg-4 recipe-card card-body text-center")
    
                var imageURL = snapshot.val().recipeImageUrl;
    
                var myImage = $("<img>");
                myImage.addClass("card-img justify-content-center")
                myImage.attr("src", imageURL);
                myImage.attr("alt", "my image");
    
                var recipe = $("<p>").text(snapshot.val().recipeName).addClass("text-center");
                var recipeName = $("<a>").append(recipe);
                recipeName.addClass("recipeLink card-text");
                recipeName.attr("href", snapshot.val().recipeUrl).attr('target','_blank');
    
                var recipeCalories = $("<p>").addClass("text-center");
                recipeCalories.text("Calories: " + snapshot.val().recipeCalories + ". ");
    
                var recipeServings = $("<p>").addClass("text-center");
                recipeServings.text("Servings: " + snapshot.val().recipeServings + ".");
    
                // Functionality to save recipe to favorites
                var unFavorite = $("<button>");
                unFavorite.text("Remove from Favorites")
                unFavorite.attr("data-key",snapshot.key);
                unFavorite.attr("class","unFavoriteButton");
    
                // Display recipes on page
                divWrapper.append(myImage, recipeName, recipeCalories, recipeServings, unFavorite);
                $("#myRecipes").append(divWrapper);
                
                let favoriteButton = $(document).find("[data-recipe-url = '" + snapshot.val().recipeUrl.toString()+"']");
                if(favoriteButton) {
                    $(favoriteButton).attr("data-state","favorited");
                    $(favoriteButton).text("Remove");
                    $(favoriteButton).attr("class","my-favorites btn btn-light");
                };
            });
        });
    };

    // Removes recipe from firebase when unfavorite button is clicked. And updates button attributes
    $(document).on('click', '.unFavoriteButton', function(event) {
        event.preventDefault();
        database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/recipes").child($(this).attr("data-key")).remove();

        // If recipe is removed from profile section. This updates the button on the recipe search section as well
        let favoriteButton = $("[data-key = "+ $(this).attr('data-key')+"]");
        $(favoriteButton).text("Add to favorites");
        $(favoriteButton).attr("class","my-favorites btn btn-primary");
        $(favoriteButton).attr("data-state","notFavorited");
        favoritesUpdate();
    });

    // Checks if recipes are already favorited when searching
    $("#submit-recipe").on("click", function(event) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                favoritesUpdate();
            };
        });
    });

    // When favorite/unfavorite button is clicked on recipe search page
    $(document).on("click", ".my-favorites", function(event) {
        // grabs info from button when clicked
        var recipeUrl = $(this).attr("data-recipe-url");
        var recipeName = $(this).attr("data-name");
        var recipeCalories = $(this).attr("data-calories");
        var recipeServings = $(this).attr("data-servings");
        var recipeImageUrl = $(this).attr("data-image-url");
        var favoriteState = $(this).attr("data-state");
        var favoriteButton = $(this);

        // Checks if recipe is already favorited
        if (favoriteState === "favorited") {
            $(this).text("Add to favorites");
            $(this).attr("class","my-favorites btn btn-primary");
            $(this).attr("data-state","notFavorited");

            // Removes recipe from firebase based on key
            database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/recipes").child($(this).attr("data-key")).remove();

            // Updates profile favorites section
            favoritesUpdate();
            
        // Recipe has not yet been favorited
        } else {
            // Add recipe to firebase
            database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/recipes").push({
                recipeUrl: recipeUrl,
                recipeName: recipeName,
                recipeCalories: recipeCalories,
                recipeServings: recipeServings,
                recipeImageUrl: recipeImageUrl
            }).then((snap) => {
                // Grabs child key from firebase and adds to button clicked
                key = snap.key;
                $(favoriteButton).attr("data-key",key);

                // Updates profile favorites section
                favoritesUpdate();
            });
            
            // Updates button attributes
            $(this).attr("data-state","favorited");
            $(this).text("Remove");
            $(this).attr("class","my-favorites btn btn-light");

        };  
    });

    // Updates workout favorites list div when favorites when called
    function favoriteWorkoutsUpdate() {
        $("#myWorkout").empty();

        // Loops through each child in favorites/recipes section
        database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/workouts").once("value", function(parent) {
            parent.forEach(function(snapshot) {
                
                    // Creates workout card and appends to my workout section
                    var workoutDiv = $("<div>").addClass("card workoutCard");
                    var p = $("<p>").text("Name: " + snapshot.val().excerciseName);
                    var ptwo = $("<p>").text("Equipment: " + snapshot.val().excerciseEquipment);
                    var pthree = $("<p>").text(snapshot.val().excerciseDescription)
                    var favoriteExercise = $("<button>").addClass("float-right");
                    favoriteExercise.text("Remove from Favorites");
                    favoriteExercise.addClass("unFavoriteWorkoutButton btn btn-light");
                    favoriteExercise.attr("data-key",snapshot.key);
                    workoutDiv.append(favoriteExercise)
                    workoutDiv.append(p);
                    workoutDiv.append(ptwo);
                    workoutDiv.append(pthree);
                    $("#myWorkout").append(workoutDiv);
                    
            });
        });
    };

    // Removes workout from firebase when unfavorite button is clicked in my workouts section. And updates button attributes
    $(document).on('click', '.unFavoriteWorkoutButton', function(event) {
        event.preventDefault();
        database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/workouts").child($(this).attr("data-key")).remove();

        // If recipe is removed from profile section. This updates the button on the recipe search section as well
        let favoriteButton = $("[data-key = "+ $(this).attr('data-key')+"]");
        $(favoriteButton).text("Add to favorites");
        $(favoriteButton).attr("class","my-favorite-exercise btn btn-primary float-right");
        $(favoriteButton).attr("data-state","notFavorited");
        favoriteWorkoutsUpdate();
    });

    // Checks if workouts are already favorited when searching. 10 second timeout added due to long API search time
    $("#workoutSubmit").on("click", function(event) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setTimeout(function() {
                    database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/workouts").once("value", function(parent) {
                        parent.forEach(function(snapshot) {
                            let favoriteButton = $(document).find("[data-exercise-name = '" + snapshot.val().excerciseName.toString()+"']");
                            if(favoriteButton) {
                                $(favoriteButton).attr("data-state","favorited");
                                $(favoriteButton).text("Remove");
                                $(favoriteButton).attr("class","my-favorites btn btn-light float-right");
                            };
                        });
                    });
                },10000);
            };
        });
    });

    // When favorite/unfavorite button is clicked on workout search page
    $(document).on("click", ".my-favorite-exercise", function(event) {
        // grabs info from button when clicked
        var excerciseName = $(this).attr("data-exercise-name");
        var excerciseEquipment = $(this).attr("data-equipment");
        var excerciseDescription = $(this).attr("data-exercise-description");
        var favoriteButton = $(this);
        var favoriteState = $(this).attr("data-state");

        // Checks if workout is already favorited
        if (favoriteState === "favorited") {
            $(this).text("Add to favorites");
            $(this).attr("class","my-favorite-exercise btn btn-primary float-right");
            $(this).attr("data-state","notFavorited");

            // Removes workout from firebase based on key
            database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/workouts").child($(this).attr("data-key")).remove();

            // Updates profile favorites section
            favoriteWorkoutsUpdate();
            
        // Workout has not yet been favorited
        } else {
            // Add workout to firebase
            database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/workouts").push({
                excerciseName: excerciseName,
                excerciseEquipment: excerciseEquipment,
                excerciseDescription: excerciseDescription
            }).then((snap) => {
                // Grabs child key from firebase and adds to button clicked
                key = snap.key;
                $(favoriteButton).attr("data-key",key);

                // Updates profile favorites section
                favoriteWorkoutsUpdate();
            });
            
            // Updates button attributes
            $(this).attr("data-state","favorited");
            $(this).text("Remove");
            $(this).attr("class","my-favorite-exercise btn btn-light float-right");

        };  
    });

    // Grabs user info from firebase when user info modal is opened
    $(document).on("click", "#updateUserInfo", function(event) {
        event.preventDefault();
        $(".updateInfoForm").removeAttr("style","background-color");
        database.ref("/users/"+firebase.auth().currentUser.uid).once("value", function(snapshot) {
            $("#validationCustom01").val(snapshot.val().firstName);
            $("#validationCustom02").val(snapshot.val().lastName);
            $("#gender").val(snapshot.val().gender);
            $("#ageInput").val(snapshot.val().age);
            $("#heightInput").val(snapshot.val().height);
            $("#weightInput").val(snapshot.val().weight);
            $("#goalsInput").val(snapshot.val().goals);
            $("#activityLevelInput").val(snapshot.val().activityLevel);
            $("#customSwitch1").attr("checked",snapshot.val().nutritionToPlan);

            $(document).on("change", ".updateInfoForm", function(event) {
                event.preventDefault();
                $(this).css("background-color","#e8f0fe");
            });
            $(document).on("keydown", ".updateInfoForm", function(event) {
                $(this).css("background-color","#e8f0fe");
            });

            // Updates diet button display
            if (snapshot.val().dietLevel === "Good"){
                $("#dietButton1").attr("class","btn btn-primary dietButtons");
            } else if (snapshot.val().dietLevel === "Just Ok"){
                $("#dietButton2").attr("class","btn btn-primary dietButtons");
            } else if (snapshot.val().dietLevel === "Let's not talk about it!"){
                $("#dietButton3").attr("class","btn btn-primary dietButtons");
            };
        });
    });

    // Function to create user info modal once signed in
    function createUpdateInfoModal() {
        $(document.body).append(
            `<div class="modal fade" id="UpdateUserInfoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div id="updateInfoDiv">
                                <h3>Update Info</h3>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <form action="" style="margin: auto" class="needs-validation" novalidate>
                                            <div class="form-row">
                                                <div class="col-md-4 mb-3">
                                                    <label for="validationCustom01">First name</label>
                                                    <input type="text" class="form-control updateInfoForm" id="validationCustom01" placeholder="Mark" required>
                                                    <div class="valid-feedback">
                                                        Looks good!
                                                    </div>
                                                    <div id="firstNameValidation" class="invalid-feedback">
                                                        Please enter first name
                                                    </div>
                                                </div>
                                                <div class="col-md-4 mb-3">
                                                    <label for="validationCustom02">Last name</label>
                                                    <input type="text" class="form-control updateInfoForm" id="validationCustom02" placeholder="Otto" required>
                                                    <div class="valid-feedback">
                                                    Looks good!
                                                    </div>
                                                    <div id="lastNameValidation" class="invalid-feedback">
                                                        Please enter last name
                                                    </div>
                                                </div>
                                                <div class="col-md-4 mb-3">
                                                    <label for="Gender">Gender</label>
                                                    <select label for="gender" id="gender" class="form-control updateInfoForm">
                                                    <option></option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    </select>
                                                    <div id="genderValidation" class="invalid-feedback">
                                                    Please select gender
                                                    </div>
                                                </div>
                                            </div>
                                        </form>      
                                        <form>
                                            <div class="form-group form-check"></div>
                                            <div class="form-group">
                                                <label for="goals">Goals</label>
                                                <select id="goalsInput" class="form-control updateInfoForm">
                                                    <option value="car1"></option>
                                                    <option value="Lose More Weight">Lose More Weight</option>
                                                    <option value="Build Muscle">Build Muscle</option>
                                                    <option value="Look like 'the Rock'">Look like "the Rock"</option>
                                                </select>
                                                <div id="goalsValidation" class="invalid-feedback">
                                                Please select a goal
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>Activity Level</label>  
                                                <select id="activityLevelInput" class="form-control updateInfoForm">
                                                <option value="car1"></option>
                                                    <option value="0 to 1 hours/wk<">0 to 1 hours/wk</option>
                                                    <option value="1 to 3 hours/wk">1 to 3 hours/wk</option>
                                                    <option value="3 to 5 hours/wk">3 to 5 hours/wk</option>
                                                    <option value="5+ hours/wk">5+ hours/wk</option>
                                                </select>  
                                                <div id="activityLevelValidation" class="invalid-feedback">
                                                Please select a physical activity level
                                                </div> 
                                            </div>
                                        </form>
                                        <div class="form-group">
                                                <label for="exampleWeightInput">Current Weight (lbs)</label>
                                                <input class="form-control updateInfoForm" id="weightInput" placeholder="...">
                                                <div id="weightValidation" class="invalid-feedback">
                                                    Please enter a valid weight
                                                </div>  
                                        </div>
                                        <div class="form-group">
                                                <label for="exampleHeightInput">Current Height (5'10")</label>
                                                <input class="form-control updateInfoForm" id="heightInput" placeholder="...">
                                                <div id="heightValidation" class="invalid-feedback">
                                                    Please enter a valid height
                                                </div>  
                                        </div>
                                        <div class="form-group">
                                                <label for="exampleAgeInput">Age</label>
                                                <input class="form-control updateInfoForm" id="ageInput" placeholder="...">
                                                <div id="ageValidation" class="invalid-feedback">
                                                    Please enter a valid age
                                                </div>  
                                        </div>
                                        <form action="" style="margin: auto">
                                            <div class="custom-control custom-switch mt-3 mb-3">
                                                <input type="checkbox" class="custom-control-input" id="customSwitch1">
                                                <label class="custom-control-label" for="customSwitch1">Want to add Nutrition to your Plan?</label>
                                            </div>
                                        </form>     
                                        <div action="" style="margin: auto" class="btn-group" role="group" aria-label="Basic example">
                                            <option action="" class="mr-3" style="margin: auto" selected>How is your diet?</option>
                                            <button type="button" class="btn btn-secondary dietButtons" id="dietButton1">Good</button>
                                            <button type="button" class="btn btn-secondary dietButtons" id="dietButton2">Just Ok</button>
                                            <button type="button" class="btn btn-secondary dietButtons" id="dietButton3">Let's not talk about it!</button>
                                        </div> 
                                        <div id="dietValidation" class="invalid-feedback">
                                            Please select an option that best represents your current diet
                                        </div>  
                                        <div class="mt-2" id="signUpAlert"></div>
                                        <button type="submit" id="updateUserInfoButton" class="btn btn-primary mb-2">Update Info</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        );
    };
});

