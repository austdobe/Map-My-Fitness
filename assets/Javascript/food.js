$(document).ready(function() {

    recipeAppID = "36ebdbad";
    recipeAPIKey = "6800e54637175837e7457dddad91fdf9";

    nutritionAppID = "92b9868a";
    nutritionAPIKey = "b85dca31bdd750ae0c2d4fcc2095bafe";
    

    // Request for Recipes - on click function
    $("#submit-recipe").on("click", function(event) {

        event.preventDefault();

        $(".display-recipes").empty();

        var recipeQueryTerm = $("#recipe-search").val().trim();
        $("#recipe-search").val("");

        // recipeQueryURL = "https://api.edamam.com/search?q=chicken&app_id=$" + recipeAppID + "&app_key=$" + recipeAPIKey + "&from=0&to=3&calories=591-722&health=alcohol-free";
        recipeQueryURL = "https://api.edamam.com/search?q=" + recipeQueryTerm + "&app_id=$" + recipeAppID + "&app_key=$" + recipeAPIKey + "&from=0&to=10";



        $.ajax({
            url: recipeQueryURL,
            method: "GET"
        }).then(function(response) {

            var results = response.hits;

            for (i=0; i < results.length; i++) {

                var divWrapper = $("<div>");

                var imageURL = results[i].recipe.image;

                var myImage = $("<img>");

                myImage.attr("src", imageURL);
                myImage.attr("alt", "my image");
                console.log(results[i].recipe.url);
                console.log(results[i].recipe.label);

                var recipeName = $("<a>");
                recipeName.text(results[i].recipe.label);
                recipeName.addClass("recipeLink");
                recipeName.attr("href", results[i].recipe.url).attr('target','_blank');

                var recipeCalories = $("<span>");
                recipeCalories.text("Calories: " + Math.floor(results[i].recipe.calories) + ". ");

                var recipeServings = $("<span>");
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
    
            console.log(response);
    
        });

    });



    $("#submit-ingredient").on("click", function(event) {

        event.preventDefault();

        $(".display-recipes").empty();

        var ingredient = $("#ingredient-entry").val().trim();
        var ingredientEntry = encodeURI(ingredient);

        $("#ingredient-entry").val("");


        var nutritionQueryURL = "https://api.edamam.com/api/nutrition-data?app_id=" + nutritionAppID + "&app_key=" + nutritionAPIKey + "&ingr=" + ingredientEntry;

        $.ajax({
            url: nutritionQueryURL,
            method: "GET"
        }).then(function(response) {

            console.log(response);



        });


    });

});