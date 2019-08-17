$(document).ready(function(){
    var database = firebase.database();
    firebase.auth().onAuthStateChanged(function(user) {
        database.ref("/users/"+firebase.auth().currentUser.uid).on("value", function(snapshot) {
            console.log(snapshot.val().weight);
            $("#weight").text(snapshot.val().weight);
            $("#height").text(snapshot.val().height);
            $("#age").text(snapshot.val().age);
            $("#activity").text(snapshot.val().activityLevel);

        });
        database.ref("/users/"+firebase.auth().currentUser.uid+"/favorites/recipes").on("value", function(snapshot) {
            $("#weight").text(snapshot.val().recipeName);
            $("#height").text(snapshot.val().height);
            $("#age").text(snapshot.val().age);
            $("#activity").text(snapshot.val().activityLevel);

        });
    });
    

});