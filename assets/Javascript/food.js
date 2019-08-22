$(document).ready(function() {

    // Link to Firebase
    var database = firebase.database();

    // App IDs and API keys for queries
    var recipeAppID = "36ebdbad";
    var recipeAPIKey = "6800e54637175837e7457dddad91fdf9";

    var nutritionAppID = "92b9868a";
    var nutritionAPIKey = "b85dca31bdd750ae0c2d4fcc2095bafe";

    // Initialize global variables
    var numServings = "";
    var searchName = "";

    // This function will clear the search boxes, any existing results and display the new search button
    function clearSearch() {
        $(".header-title").empty();
        $(".display-nutrition").empty();
        $(".display-recipes").empty();
        $(".search-card").hide();
        $(".newSearch").show();
    }

    // This function will display the nutrition data
    function displayNutrition(response) {
        var results = response.totalNutrients;
        console.log(results);

        // Empties out any nutrition facts already displayed
        $(".display-nutrition").empty();

        // Changes the header from Recipe to Nutrition Facts
        $(".header-title").html("<h1>Nutrition Facts</h1>");
        $(".header-title").prepend("<h1>" + searchName + "</h1>");

        // Puts all of the main nutrition data into appropriate variables
        var rServings = "<tr><td>Number of servings: " + numServings + "</td></tr>"; // results.
        var rCalories = "<tr><td>Calories per serving: " + Math.floor(results.ENERC_KCAL.quantity / numServings) + "</td></tr>";
        
        // Checking to make sure that each nutrition data item exists and then saves it into variables
        if (!results.FAT) {
                var rTotalFat = "";
            } else {
                var rTotalFat = "<tr><td>Total Fat: " + Math.floor(results.FAT.quantity / numServings) + " " + results.FAT.unit + "</td></tr>";
        }
        if (!results.FASAT) {
                var rSaturatedFat = "";
            } else {
                var rSaturatedFat = "<tr><td>Saturated Fat: " + Math.floor(results.FASAT.quantity / numServings) + " " + results.FASAT.unit + "</td></tr>";
        }
        if (!results.NA) {
                var rSodium = "";
            } else {
                var rSodium = "<tr><td>Sodium: " + Math.floor(results.NA.quantity / numServings) + " " + results.NA.unit + "</td></tr>";
        }
        if (!results.CHOCDF) {
                var rCarbs = "";
            } else {
                var rCarbs = "<tr><td>Total Carbohydrates: " + Math.floor(results.CHOCDF.quantity / numServings) + " " + results.CHOCDF.unit + "</td></tr>";
        }
        if (!results.FIBTG) {
                var rFiber = "";
            } else {
                var rFiber = "<tr><td>Dietary Fiber: " + Math.floor(results.FIBTG.quantity / numServings) + " " + results.FIBTG.unit + "</td></tr>";
        }
        if (!results.SUGAR) {
                var rSugar = "";
            } else {
                var rSugar = "<tr><td>Total Sugars: " + Math.floor(results.SUGAR.quantity / numServings) + " " + results.SUGAR.unit + "</td></tr>";
        }
        if (!results.PROCNT) {
                var rCarbs = "";
            } else {
                var rProtein = "<tr><td>Protein: " + Math.floor(results.PROCNT.quantity / numServings) + " " + results.PROCNT.unit + "</td></tr>";
        }
        if (!results.FATRN) {
                var rTransFat = ""; 
            } else { 
                var rTransFat = "<tr><td>Trans Fat: " + Math.floor(results.FATRN.quantity / numServings) + " " + results.FATRN.unit + "</td></tr>"; 
        }
        if (!results.CHOLE) { 
                var rCholesterol = ""; 
            } else { 
                var rCholesterol = "<tr><td>Total Cholesterol: " + Math.floor(results.CHOLE.quantity / numServings) + " " + results.CHOLE.unit + "</td></tr>"; 
        }

        // Displays the information in a new table
        $(".display-nutrition").append(rServings + rCalories + rTotalFat + rSaturatedFat + rTransFat + rCholesterol + rSodium + rCarbs + rFiber + rSugar + rProtein);

    } // End displayNutrition function

    // Keyword search for Recipes - on click function
    $("#submit-recipe").on("click", function(event) {

        event.preventDefault();

        // This function will clear the search boxes, any existing results and display the new search button
        clearSearch();
        
        // Grabs the keyword search, saves it in a variable and then clears the input box
        var recipeQueryTerm = $("#recipe-search").val().trim();
        $("#recipe-search").val("");

        // Query URL for recipe search API
        recipeQueryURL = "https://api.edamam.com/search?q=" + recipeQueryTerm + "&app_id=$" + recipeAppID + "&app_key=$" + recipeAPIKey + "&from=0&to=10";

        // Call to the API
        $.ajax({
            url: recipeQueryURL,
            method: "GET"
        }).then(function(response) {

            // Saves the JSON file that we receive into a new variable called results
            var results = response.hits;
            console.log(response);

            // For Loop to grab necessary information for each resulting recipe
            for (i=0; i < results.length; i++) {

                // Start compiling all the data into appropriate <div> & <p> tags to display recipes
                var divWrapper = $("<div>");
                divWrapper.addClass("card recipe-card card-body text-center")

                var imageURL = results[i].recipe.image;

                var myImage = $("<img>");
                myImage.addClass("card-img justify-content-center")
                myImage.attr("src", imageURL);
                myImage.attr("alt", "my image");

                var recipe = $("<p>").text(results[i].recipe.label).addClass("text-center");
                var recipeName = $("<a>").append(recipe);
                recipeName.addClass("recipeLink card-text");
                recipeName.attr("href", results[i].recipe.url).attr('target','_blank');

                var recipeCalories = $("<p>").addClass("text-center");
                recipeCalories.text("Calories: " + Math.floor(results[i].recipe.calories / results[i].recipe.yield) + ". ");

                var recipeServings = $("<p>").addClass("text-center");
                recipeServings.text("Servings: " + results[i].recipe.yield + ".");

                // Functionality to save recipe to favorites
                var favorite = $("<button>");
                favorite.text("Add to favorites");
                favorite.addClass("my-favorites btn btn-primary");
                favorite.attr("data-recipe-url", results[i].recipe.url);
                favorite.attr("data-name", results[i].recipe.label);
                favorite.attr("data-calories", Math.floor(results[i].recipe.calories / results[i].recipe.yield));
                favorite.attr("data-servings", results[i].recipe.yield);
                favorite.attr("data-image-url", imageURL);

                // Display recipes on page
                divWrapper.append(myImage, recipeName, recipeCalories, recipeServings, favorite);
                $(".display-recipes").append(divWrapper);

            };

            // Link to database to incorporate favorite recipes
            database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/recipes").once("value", function(parent) {
                parent.forEach(function(snapshot) {
                    let favoriteButton = $(document).find("[data-recipe-url = '" + snapshot.val().recipeUrl.toString()+"']");
                    if(favoriteButton) {
                        $(favoriteButton).attr("data-state","favorited");
                        $(favoriteButton).text("Remove");
                        $(favoriteButton).attr("class","my-favorites btn btn-light");
                        $(favoriteButton).attr("data-key",snapshot.key);
                    };
                });
            });
        

        });

    });// End of onclick function for recipe request submit button

    // Request for nutrition - my Recipes
    $("#submit-my-recipe").on("click", function(event) {

        event.preventDefault();

        // This function will clear the search boxes, any existing results and display the new search button
        clearSearch();

        // Grabs the input values into new variables and then clears input boxes
        var myRecipeTitle = $("#my-recipe-name").val().trim();
        numServings = parseInt($("#my-recipe-servings").val().trim());
        var myRecipeIngredients = $("#my-recipe-ingredients").val().split('\n');
        searchName = myRecipeTitle;

        $("#my-recipe-name").val("");
        $("#my-recipe-servings").val("");
        $("#my-recipe-ingredients").val("");

        // Putting necessary data into an object to submit to API
        var myRecipeJSON = {
            "title": myRecipeTitle,
            "yield": numServings,
            "ingr": myRecipeIngredients
        }

        // Saves the JSON into a new variable to submit in the POST request
        var mydataFile = JSON.stringify(myRecipeJSON);

        // Ajax - POST
        $.ajax({
            url: "https://api.edamam.com/api/nutrition-details?app_id=92b9868a&app_key=b85dca31bdd750ae0c2d4fcc2095bafe",
            method: "POST",
            contentType: 'application/json',
            data: mydataFile
    
        // When the resulting JSON comes back...
        }).then(function(response) {
    
            console.log(response);
            // Runs function to display nutrition facts
            displayNutrition(response);
    
        });

    }); // End of on click for my recipe to nutrition search


    // Individual Food Item Nutrition Facts
    $("#submit-ingredient").on("click", function(event) {

        event.preventDefault();

        // This function will clear the search boxes, any existing results and display the new search button
        clearSearch();

        // Grabs the input values into new variables and then clears input boxes
        var ingredient = $("#ingredient-entry").val().trim();
        var ingredientEntry = encodeURI(ingredient);

        numServings = 1;
        searchName = ingredient;

        $("#ingredient-entry").val("");

        // Query URL for Nutrition API
        var nutritionQueryURL = "https://api.edamam.com/api/nutrition-data?app_id=" + nutritionAppID + "&app_key=" + nutritionAPIKey + "&ingr=" + ingredientEntry;

        // Ajax call
        $.ajax({
            url: nutritionQueryURL,
            method: "GET"
        }).then(function(response) {

            // Runs function to display nutrition results
            displayNutrition(response);

        });


    }); // End of on click for food item nutrition facts

    // Functionality for clicking on a new search
    $(document).on("click", ".newSearch", function(event){
        $(".header-title").empty();
        $(".display-nutrition").empty();
        $(".display-recipes").empty();
        $(".search-card").show();
        $(".newSearch").hide();
    })
  
    // Starts with the new search button hidden
    $(".newSearch").hide()
});