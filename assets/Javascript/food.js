$(document).ready(function() {

    // App IDs and API keys for queries
    var recipeAppID = "36ebdbad";
    var recipeAPIKey = "6800e54637175837e7457dddad91fdf9";

    var nutritionAppID = "92b9868a";
    var nutritionAPIKey = "b85dca31bdd750ae0c2d4fcc2095bafe";

    // Initialize global variables
    var numServings = "";
    var searchName = "";

    // Array to compare against API response to display nutrients if available and greater than 0
    var nutrientOptions = ["CA", "FE", "FOLDFE", "K", "MG", "NIA", "P", "RIBF", "THIA", "TOCPHA", "VITA_RAE", "VITB6A", "VITB12", "VITC", "VITD", "VITK1", "ZN"];
    
    // This function will display the nutrition data
    function displayNutrition(response) {
        var results = response.totalNutrients;
        console.log(results);

        // Changes the header from Recipe to Nutrition Facts
        $(".header-title").text("Nutrition Facts");
        $(".header-title").prepend("<h1>" + searchName + "</h1><hr>");


        // Puts all of the main nutrition data into appropriate variables
        var rServings = "<tr><td>Number of servings: " + numServings + "</td></tr>"; // results.
        var rCalories = "<tr><td>Calories per serving: " + Math.floor(results.ENERC_KCAL.quantity / numServings) + "</td></tr>";
        var rTotalFat = "<tr><td>Total Fat: " + Math.floor(results.FAT.quantity / numServings) + " " + results.FAT.unit + "</td></tr>";
        var rSaturatedFat = "<tr><td>Saturated Fat: " + Math.floor(results.FASAT.quantity / numServings) + " " + results.FASAT.unit + "</td></tr>";
        var rSodium = "<tr><td>Sodium: " + Math.floor(results.NA.quantity / numServings) + " " + results.NA.unit + "</td></tr>";
        var rCarbs = "<tr><td>Total Carbohydrates: " + Math.floor(results.CHOCDF.quantity / numServings) + " " + results.CHOCDF.unit + "</td></tr>";
        var rFiber = "<tr><td>Dietary Fiber: " + Math.floor(results.FIBTG.quantity / numServings) + " " + results.FIBTG.unit + "</td></tr>";
        var rSugar = "<tr><td>Total Sugars: " + Math.floor(results.SUGAR.quantity / numServings) + " " + results.SUGAR.unit + "</td></tr>";
        var rProtein = "<tr><td>Protein: " + Math.floor(results.PROCNT.quantity / numServings) + " " + results.PROCNT.unit + "</td></tr>";

        if (!results.FATRN) { var rTransFat = ""; } else { var rTransFat = "<tr><td>Trans Fat: " + Math.floor(results.FATRN.quantity / numServings) + " " + results.FATRN.unit + "</td></tr>"; }
        if (!results.CHOLE) { var rCholesterol = ""; } else { var rCholesterol = "<tr><td>Total Cholesterol: " + Math.floor(results.CHOLE.quantity / numServings) + " " + results.CHOLE.unit + "</td></tr>"; }

        // Displays the information in a new table
        $(".display-nutrition").append(rServings + rCalories + rTotalFat + rSaturatedFat + rTransFat + rCholesterol + rSodium + rCarbs + rFiber + rSugar + rProtein);

        // var test = 1;
        for (var key in results) {
            console.log(key);
            // console.log(test);
            // test++

            var nutrientArray = results[key];
            console.log(nutrientArray);
            // console.log(nutrientArray.length);
            // console.log("TESTING: " + nutrientArray[test]);

        // for (var i = 0; i < nutrientArray.length; i++) {
        //     console.log(i);
        //     console.log(nutrientArray[i].label);
        //     console.log(nutrientArray[i].quantity);
        //     console.log(nutrientArray[i].unit);

        



            for (var i in nutrientArray) {
                // console.log("Item " + i + ": " + nutrientArray[i]);
                // console.log(nutrientArray.i)
                
                if (i === "label") {
                    var rLabel = nutrientArray[i];
                }
                if (i === "quantity") {
                    var rQuantity = nutrientArray[i];
                }
                if (i === "unit") {
                    var rUnit = nutrientArray[i];
                }

                // console.log(rLabel + ": " + (rQuantity / numServings) + " " + rUnit);
                // $(".display-nutrition").append("<tr><td>" + nutrientArray[i]) + "</tr></td>";
                // var deeperArray = nutrientArray[i];
                // console.log(deeperArray);
            }
        }


        // for (i = 0; i < nutrientOptions.length; i++) {

        //     var deeperResults = response.totalNutrients.nutrientOptions[i];
        //     console.log(nutrientOptions[i]);


        //     if (!results.nutrientOptions[i]) {
        //         console.log("No result");
        //     }
            // console.log(results.nutrientOptions[i].label);
            // console.log(results.nutrientOptions[i].quantity);
            // console.log(results.nutrientOptions[i].unit);

            // console.log(deeperResults.label);
            // console.log(deeperResults.quantity);
            // console.log(deeperResults.unit);


            // if (nutrientOptions[i]) {

            //     if ((Math.floor(results.nutrientOptions[i].quantity / numServings)) > 0) {

            //         var rTempNutrient = "<tr><td>" + results.nutrientOptions[i].label + ": " + Math.floor(results.nutrientOptions[i].quantity / numServings) + " " + results.nutrientOptions[i].unit + "</td></tr>";
            //         $(".display-nutrition").append(rTempNutrient);

            //     }
            // }
        // } 

        // CA: {label: "Calcium", quantity: 1613.2845194946, unit: "mg"}
        // CHOCDF: {label: "Carbs", quantity: 205.46449436468998, unit: "g"}
        // CHOLE: {label: "Cholesterol", quantity: 537.925, unit: "mg"}
        // ENERC_KCAL: {label: "Energy", quantity: 2459.3760603922, unit: "kcal"}
        // FAMS: {label: "Monounsaturated", quantity: 41.281943115185804, unit: "g"}
        // FAPU: {label: "Polyunsaturated", quantity: 16.995248541915604, unit: "g"}
        // FASAT: {label: "Saturated", quantity: 37.4459535833424, unit: "g"}
        // FAT: {label: "Fat", quantity: 110.702691065572, unit: "g"}
        // FATRN: {label: "Trans", quantity: 0.25035500000000005, unit: "g"}
        // FE: {label: "Iron", quantity: 12.106057727762, unit: "mg"}
        // FIBTG: {label: "Fiber", quantity: 39.29919102766, unit: "g"}
        // FOLDFE: {label: "Folate equivalent (total)", quantity: 165.7805435174, unit: "µg"}
        // FOLFD: {label: "Folate (food)", quantity: 165.7805435174, unit: "µg"}
        // K: {label: "Potassium", quantity: 5207.442366283801, unit: "mg"}
        // MG: {label: "Magnesium", quantity: 616.2542482162, unit: "mg"}
        // NA: {label: "Sodium", quantity: 2463.550508244, unit: "mg"}
        // NIA: {label: "Niacin (B3)", quantity: 70.63159990723459, unit: "mg"}
        // P: {label: "Phosphorus", quantity: 3517.6314692676, unit: "mg"}
        // PROCNT: {label: "Protein", quantity: 172.313115312458, unit: "g"}
        // RIBF: {label: "Riboflavin (B2)", quantity: 2.2468851065960003, unit: "mg"}
        // SUGAR: {label: "Sugars", quantity: 44.192917429008006, unit: "g"}
        // THIA: {label: "Thiamin (B1)", quantity: 1.2798840541576002, unit: "mg"}
        // TOCPHA: {label: "Vitamin E", quantity: 14.575082375888, unit: "mg"}
        // VITA_RAE: {label: "Vitamin A", quantity: 505.29802653940004, unit: "µg"}
        // VITB6A: {label: "Vitamin B6", quantity: 5.6851627196802, unit: "mg"}
        // VITB12: {label: "Vitamin B12", quantity: 4.51345, unit: "µg"}
        // VITC: {label: "Vitamin C", quantity: 141.11611458000002, unit: "mg"}
        // VITD: {label: "Vitamin D", quantity: 0.884, unit: "µg"}
        // VITK1: {label: "Vitamin K", quantity: 110.53132274814001, unit: "µg"}
        // ZN: {label: "Zinc", quantity: 15.456789248217998, unit: "mg"}

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
            console.log(response);

            // For Loop to grab necessary information for each resulting recipe
            for (i=0; i < results.length; i++) {

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


    });

    // On click function for favorite recipes
    $(document).on("click", ".my-favorites", function(event) {

        console.log(this);

    });

});