$(document).ready(function(){
  var weight;
  var config = {
    apiKey: "AIzaSyCqwaY-3wWYY4jadfbnn8bv2zPEjZA2Moo",
    authDomain: "project1-6e88d.firebaseapp.com",
    databaseURL: "https://project1-6e88d.firebaseio.com",
    projectId: "project1-6e88d",
    storageBucket: "",
    messagingSenderId: "1010093316178",
    appId: "1:1010093316178:web:dacd8997acea26b7"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#loginDiv").hide();
      $("#loggedInDiv").show();
      $("#newUserDiv").hide();
      $("#weightDiv").show();
      // User is signed in.
      var user = firebase.auth().currentUser;
      console.log(user.email);
      var userId = firebase.auth().currentUser.uid;
      weightForm();
      console.log(userId);

      $("#signInModalButton").text('Sign Out');
      if(user != null){
        
        var email_id = user.email;
        
        database.ref("/users/"+userId).on("value", function(snapshot) {
          
          $("#userP").empty();
          $("#userP").text("User : " + email_id);
          weight = snapshot.val().weight;
          $("#userP").append("<p>Current Weight : " + weight +"</p>");
          weightForm();
          user.updateProfile({
            displayName: "Jeff"
          }).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });
        });
      };

    } else {
      $("#loginDiv").show();
      $("#loggedInDiv").hide();
      $("#weightDiv").hide();
      $("#signInModalButton").text('Sign Out');
      // No user is signed in.

      

    }
  });

  function login(){
    var userEmail = $("#emailInput").val();
    var userPassword = $("#passwordInput").val();
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
    });
  };

  function logout(){
    firebase.auth().signOut();
  };
  
  function newUser() {
    var email = $("#newUserEmail").val();
    var password = $("#newUserPassword").val();
    var confirmPassword = $("#confirmPasswordInput").val();
    if(password === confirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
        // ...
      });
    } else {
      alert("Passwords do not match");
    }
  };

  function weightLog() {
    var weight = $("#weightInput").val();
    database.ref("/users/"+firebase.auth().currentUser.uid).set({
      weight: weight
    });
  };

  function weightForm() {
    var form = $("<form>");
    form.attr("id","weightForm");
    var newDiv = $("<div>");
    newDiv.append("<label>Log New Weight</label>");
    newDiv.append("<input class='form-control' id='weightInput' placeholder='Current Weight..'>");
    form.append(newDiv);
    form.append("<button id='weightButton' class='btn btn-primary'>Submit</button>");
    $("#weightDiv").empty();
    $("#weightDiv").append(form);
  };

  $(document).on('click', '#loginButton', function(event) {
    event.preventDefault();
    login();
  });
  $(document).on('click', '#logoutButton', function() {
    logout();
  });
  $(document).on('click', '#newUserButton', function(event) {
    event.preventDefault();
    $("#loginDiv").hide();
    $("#loggedInDiv").hide();
    $("#newUserDiv").show();
  });
  $(document).on('click', '#createUserButton', function(event) {
    event.preventDefault();
    newUser();
  });
  $(document).on('click', '#weightButton', function(event) {
    event.preventDefault();
    weightLog();
  });
    $(".container").append(
      `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div id="loginDiv" style="display:none;">
                  <form>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="emailInput"  placeholder="Enter email">
                      
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="passwordInput" placeholder="Password">
                    </div>
                    <button type="submit" id="loginButton" class="btn btn-primary">Submit</button>
                    <small id="newUserHelp" class="form-text text-muted">New User?</small>
                    <small id="newUserButton" class="form-text text-muted"><button class="btn btn-light">Create Account</button></small>
                  </form>
                </div>
              
                <div id="loggedInDiv" style="display:none;">
                  <h3>Welcome!</h3>
                  <p id="userP"></p>
                  <button id="logoutButton" class="btn btn-dark">Logout</button>
                </div>
              
                <div style="display:none;" id="newUserDiv">
                  <h3>New User</h3>
                  <form>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="newUserEmail"  placeholder="Enter email">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="newUserPassword" placeholder="Password">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Confirm Password</label>
                      <input type="password" class="form-control" id="confirmPasswordInput" placeholder="Password">
                    </div>
                    <button type="submit" id="createUserButton" class="btn btn-primary">Create Account</button>
                  </form>
                </div>
                <div id="weightDiv"></div>
                
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`);
});