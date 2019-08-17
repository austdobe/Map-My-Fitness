$(document).ready(function(){
    var database = firebase.database();
    firebase.auth().onAuthStateChanged(function(user) {
        favoritesUpdate();
        database.ref("/users/"+firebase.auth().currentUser.uid).on("value", function(snapshot) {
            console.log(snapshot.val().weight);
            $("#weight").text(snapshot.val().weight);
            $("#height").text(snapshot.val().height);
            $("#age").text(snapshot.val().age);
            $("#activity").text(snapshot.val().activityLevel);

        });
        
    });

    function favoritesUpdate() {
        $("#myRecipes").empty();
        database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/recipes").on("child_added", function(snapshot) {
            

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

        });
    }
    $(document).on('click', '.unFavoriteButton', function(event) {
        event.preventDefault();
        database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/recipes").child($(this).attr("data-key")).remove();
        favoritesUpdate();
    });
    
    

});