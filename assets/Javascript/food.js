$(document).ready(function() {

    recipeAppID = "36ebdbad";
    recipeAPIKey = "6800e54637175837e7457dddad91fdf9";

    nutritionAppID = "92b9868a";
    nutritionAPIKey = "b85dca31bdd750ae0c2d4fcc2095bafe";
    
    // This function will display the nutrition data
    function displayNutrition(response) {
        var results = response.totalNutrients;
        // console.log(results);

        // Changes the header from Recipe to Nutrition Facts
        $(".header-title").text("Nutrition Facts");

        // Puts all of the nutrition data into appropriate variables
        var rServings = "<tr><td>Number of servings: TEMP HOLD</td></tr>"; // results.
        var rCalories = "<tr><td>Calories per serving: " + Math.floor(results.ENERC_KCAL.quantity) + "</td></tr>";
        var rTotalFat = "<tr><td>Total Fat: " + Math.floor(results.FAT.quantity) + results.FAT.unit + "</td></tr>";
        var rSaturatedFat = "<tr><td>Saturated Fat: " + Math.floor(results.FASAT.quantity) + results.FASAT.unit + "</td></tr>";
        //Trans Fat:
        //Cholesterol:
        var rSodium = "<tr><td>Sodium: " + Math.floor(results.NA.quantity) + results.NA.unit + "</td></tr>";
        var rCarbs = "<tr><td>Total Carbohydrates: " + Math.floor(results.CHOCDF.quantity) + results.CHOCDF.unit + "</td></tr>";
        var rFiber = "<tr><td>Dietary Fiber: " + Math.floor(results.FIBTG.quantity) + results.FIBTG.unit + "</td></tr>";
        var rSugar = "<tr><td>Total Sugars: " + Math.floor(results.SUGAR.quantity) + results.SUGAR.unit + "</td></tr>";
        var rProtein = "<tr><td>Protein: " + Math.floor(results.PROCNT.quantity) + results.PROCNT.unit + "</td></tr>";

        // Displays the information in a new table
        $(".display-nutrition").append(rServings + rCalories + rTotalFat + rSaturatedFat + rSodium + rCarbs + rFiber + rSugar + rProtein);
    }

    // Keyword search for Recipes - on click function
    $("#submit-recipe").on("click", function(event) {

        event.preventDefault();

        // Empties any recipes that are displayed and hides the search boxes
        $(".display-recipes").empty();
        $(".search-boxes").hide();

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

            // For Loop to grab necessary information for each resulting recipe
            for (i=0; i < results.length; i++) {


                var divWrapper = $("<div>");
                divWrapper.addClass("card recipe-card card-body")

                var imageURL = results[i].recipe.image;

                var myImage = $("<img>");
                myImage.addClass("card-img text-center")
                myImage.attr("src", imageURL);
                myImage.attr("alt", "my image");

                var recipe = $("<p>").text(results[i].recipe.label).addClass("text-center");
                var recipeName = $("<a>").append(recipe);
                recipeName.addClass("recipeLink card-text");
                recipeName.attr("href", results[i].recipe.url).attr('target','_blank');

                var recipeCalories = $("<p>").addClass("text-center");
                recipeCalories.text("Calories: " + Math.floor(results[i].recipe.calories / results[i].recipe.yield)) + ". ");

                var recipeServings = $("<p>").addClass("text-center");
                recipeServings.text("Servings: " + results[i].recipe.yield + ".");

                // Display recipes on page
                divWrapper.append(myImage, recipeName, recipeCalories, recipeServings);
                $(".display-recipes").append(divWrapper);

            }

        });

    // End of onclick function for recipe request submit button
    });

    // Request for nutrition - my Recipes
    $("#submit-my-recipe").on("click", function(event) {

        event.preventDefault();

        // Empties any recipes that are displayed and hides the search boxes
        $(".display-recipes").empty();
        $(".search-boxes").hide();

        // Grabs the input values into new variables and then clears input boxes
        var myRecipeTitle = $("#my-recipe-name").val().trim();
        var myRecipeServings = $("#my-recipe-servings").val().trim();
        var myRecipeIngredients = $("#my-recipe-ingredients").val().split('\n');

        $("#my-recipe-name").val("");
        $("#my-recipe-servings").val("");
        $("#my-recipe-ingredients").val("");

        // Putting necessary data into an object to submit to API
        var myRecipeJSON = {
            "title": myRecipeTitle,
            "yield": myRecipeServings,
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
    
            // Runs function to display nutrition facts
            displayNutrition(response);
    
        });

    });


    // Individual Food Item Nutrition Facts
    $("#submit-ingredient").on("click", function(event) {

        event.preventDefault();

        // Empties any recipes that are displayed and hides the search boxes
        $(".display-recipes").empty();
        $(".search-boxes").hide();

        // Grabs the input values into new variables and then clears input boxes
        var ingredient = $("#ingredient-entry").val().trim();
        var ingredientEntry = encodeURI(ingredient);

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


    });

});