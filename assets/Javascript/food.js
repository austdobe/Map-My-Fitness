$(document).ready(function() {

    recipeAppID = "36ebdbad";
    recipeAPIKey = "6800e54637175837e7457dddad91fdf9";

    nutritionAppID = "92b9868a";
    nutritionAPIKey = "b85dca31bdd750ae0c2d4fcc2095bafe";
    
    function displayNutrition(response) {
        var results = response.totalNutrients;
        // console.log(results);

        $(".header-title").text("Nutrition Facts");
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

        $(".display-nutrition").append(rServings + rCalories + rTotalFat + rSaturatedFat + rSodium + rCarbs + rFiber + rSugar + rProtein);
    }

    // Search for Recipes - on click function
    $("#submit-recipe").on("click", function(event) {

        event.preventDefault();

        $(".display-recipes").empty();
        $(".search-boxes").hide();

        var recipeQueryTerm = $("#recipe-search").val().trim();
        $("#recipe-search").val("");

        recipeQueryURL = "https://api.edamam.com/search?q=" + recipeQueryTerm + "&app_id=$" + recipeAppID + "&app_key=$" + recipeAPIKey + "&from=0&to=10";

        $.ajax({
            url: recipeQueryURL,
            method: "GET"
        }).then(function(response) {

            results = response.hits;

            for (i=0; i < results.length; i++) {

                var divWrapper = $("<div>");
                divWrapper.addClass("card recipe-card card-body")

                var imageURL = results[i].recipe.image;

                var myImage = $("<img>").addClass("text-center");;
                myImage.addClass("card-img")
                myImage.attr("src", imageURL);
                myImage.attr("alt", "my image");
                console.log(results[i].recipe.url);
                console.log(results[i].recipe.label);

                var recipe = $("<p>").text(results[i].recipe.label).addClass("text-center");
                var recipeName = $("<a>").append(recipe);
                recipeName.addClass("recipeLink card-text");
                recipeName.attr("href", results[i].recipe.url).attr('target','_blank');

                var recipeCalories = $("<p>").addClass("text-center");
                recipeCalories.text("Calories: " + Math.floor(results[i].recipe.calories) + ". ");

                var recipeServings = $("<p>").addClass("text-center");
                recipeServings.text("Servings: " + results[i].recipe.yield + ".");

                divWrapper.append(myImage, recipeName, recipeCalories, recipeServings);
                $(".display-recipes").append(divWrapper);

            }

        });

    // End of onclick function for recipe request submit button
    });

    // Request for nutrition - my Recipes
    $("#submit-my-recipe").on("click", function(event) {

        event.preventDefault();

        $(".display-recipes").empty();

        var myRecipeTitle = $("#my-recipe-name").val().trim();
        var myRecipeServings = $("#my-recipe-servings").val().trim();
        var myRecipeIngredients = $("#my-recipe-ingredients").val().split('\n');

        $("#my-recipe-name").val("");
        $("#my-recipe-servings").val("");
        $("#my-recipe-ingredients").val("");

        var myRecipeJSON = {
            "title": myRecipeTitle,
            "yield": myRecipeServings,
            "ingr": myRecipeIngredients
        }

        console.log(myRecipeJSON);
        var mydataFile = JSON.stringify(myRecipeJSON);

        $.ajax({
            url: "https://api.edamam.com/api/nutrition-details?app_id=92b9868a&app_key=b85dca31bdd750ae0c2d4fcc2095bafe",
            method: "POST",
            contentType: 'application/json',
            data: mydataFile
    
        }).then(function(response) {
    
            displayNutrition(response);
    
        });

    });


    // Individual Food Item Nutrition Facts
    $("#submit-ingredient").on("click", function(event) {

        event.preventDefault();

        $(".display-recipes").empty();
        $(".search-boxes").hide();

        var ingredient = $("#ingredient-entry").val().trim();
        var ingredientEntry = encodeURI(ingredient);

        $("#ingredient-entry").val("");


        var nutritionQueryURL = "https://api.edamam.com/api/nutrition-data?app_id=" + nutritionAppID + "&app_key=" + nutritionAPIKey + "&ingr=" + ingredientEntry;

        $.ajax({
            url: nutritionQueryURL,
            method: "GET"
        }).then(function(response) {

            displayNutrition(response);

        });


    });

});