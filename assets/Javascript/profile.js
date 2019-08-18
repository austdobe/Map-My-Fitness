$(document).ready(function(){
    // Links to firebase database
    var database = firebase.database();
    
    // Updates profile info when first loading page
    firebase.auth().onAuthStateChanged(function(user) {
        favoritesUpdate();
        database.ref("/users/"+firebase.auth().currentUser.uid).on("value", function(snapshot) {
            $("#weight").text(snapshot.val().weight);
            $("#height").text(snapshot.val().height);
            $("#age").text(snapshot.val().age);
            $("#activity").text(snapshot.val().activityLevel);
        });
        
    });
    
    // Updates recipe favorites list div when favorites when called
    function favoritesUpdate() {
        $("#myRecipes").empty();

        // Loops through each child in favorites/recipes section
        database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/recipes").once("value", function(parent) {
            parent.forEach(function(snapshot) {
                var divWrapper = $("<div>");
                divWrapper.addClass("card recipe-card card-body text-center")
    
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

    $("#submit-recipe").on("click", function(event) {
        favoritesUpdate();
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
});