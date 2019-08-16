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
      $("#signInModalButton").text('Sign In');
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
  $(document).on('click', '#passwordResetButton', function(event) {
    $("#loginDiv").hide();
    $("#loggedInDiv").hide();
    $("#newUserDiv").hide()
    
    $("#weightDiv").hide();
    $("#passwordResetDiv").show();
  });
  $(document).on('click', '#signInDivButton', function(event) {
    $("#loginDiv").show();
    $("#loggedInDiv").hide();
    $("#newUserDiv").hide()
    
    $("#weightDiv").hide();
    $("#passwordResetDiv").hide();
  });
  $(document).on('click', '#passwordResetSubmitButton', function(event) {
    event.preventDefault();
    var emailAddress = $("#resetEmail").val().trim();
    console.log(emailAddress);
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });
  });

  
    $(".container").append(
      `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"></h5>
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
                    <small id="newUserButton" class="form-text text-muted"><button class="btn btn-light" id="createaccountbutton">Create Account</button></small>
                    <small id="newUserHelp" class="form-text text-muted">Forgot Password?</small>
                    <small class="form-text text-muted"><button class="btn btn-light" id="passwordResetButton">Reset</button></small>
                  </form>
                </div>
              
                <div id="loggedInDiv" style="display:none;">
                  <h3>Welcome!</h3>
                  <p id="userP"></p>
                  <button id="logoutButton" class="btn btn-dark">Logout</button>
                </div>
              
                <div style="display:none;" id="newUserDiv">
                  <h3>New User</h3>

                  
                  <div class="row">
                      <div class="col-lg-12">
                          
                              <form action="" style="width: 500px; margin: auto" class="needs-validation" novalidate>
                                  <div class="form-row">
                                  <div class="col-md-4 mb-3">
                                      <label for="validationCustom01">First name</label>
                                      <input type="text" class="form-control" id="validationCustom01" placeholder="Mark" required>
                                      <div class="valid-feedback">
                                      Looks good!
                                      </div>
                                  </div>
                                  <div class="col-md-4 mb-3">
                                      <label for="validationCustom02">Last name</label>
                                      <input type="text" class="form-control" id="validationCustom02" placeholder="Otto" required>
                                      <div class="valid-feedback">
                                      Looks good!
                                      </div>
                                  </div>
                                  </div>
              
                                  <div class="form-row">
                                  <div class="col-md-6 mb-3">
                                      <label for="validationCustom03">City</label>
                                      <input type="text" class="form-control" id="validationCustom03" placeholder="City" required>
                                      <div class="invalid-feedback">
                                      Please provide a valid city.
                                      </div>
                                  </div>
                                  <div class="col-md-3 mb-3">
                                      <label for="validationCustom04">State</label>
                                      <input type="text" class="form-control" id="validationCustom04" placeholder="State" required>
                                      <div class="invalid-feedback">
                                      Please provide a valid state.
                                      </div>
                                  </div>
                                  <div class="col-md-3 mb-3">
                                      <label for="validationCustom05">Zip</label>
                                      <input type="text" class="form-control" id="validationCustom05" placeholder="Zip" required>
                                      <div class="invalid-feedback">
                                      Please provide a valid zip.
                                      </div>
                                  </div>
                                  <label for="Gender">Gender</label>
                                  <select label for="gender" id="gender" class="form-control">
                                  <option></option>
                                  <option>Male</option>
                                  <option>Female</option>
                                  </select>
                                  </div>
                              </form>
                              
                              
                              <form>
                                  <div action="" style="width: 500px; margin: auto" class="form-group">
                                  <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="newUserEmail"  placeholder="Enter email">
                                  </div>
                                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                  </div>
                                  <div action="" style="width: 500px; margin: auto" class="form-group">
                                  <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="newUserPassword" placeholder="Password">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Confirm Password</label>
                      <input type="password" class="form-control" id="confirmPasswordInput" placeholder="Password">
                    </div>
                                  <div class="form-group form-check"></div>
                              </form>
                                  
                              <form action="" style="width: 500px; margin: auto">  
                                  <select name="car">
                                      <option value="car1">Age Range</option>
                                      <option value="car1">18-30</option>
                                      <option value="car1">30-45</option>
                                      <option value="car1">45-Above</option>
                                  </select>     
                                  <select name="car">
                                      <option value="car1">Height</option>
                                      <option value="car1">4'1"-5'0"</option>
                                      <option value="car1">5'1"-6'0"</option>
                                      <option value="car1">6'1"-6'10"</option>
                                  </select>     
                                  <select name="car">
                                      <option value="car1">Weight</option>
                                      <option value="car1">150-200lbs</option>
                                      <option value="car1">200-250lbs</option>
                                      <option value="car1">250-340lbs</option>
                                  </select>     
                                  <select name="car">
                                      <option value="car1">Goals</option>
                                      <option value="car1">Loose More Weight</option>
                                      <option value="car1">Build Muscle</option>
                                      <option value="car1">Look like "the Rock"</option>
                                  </select>  
                              </form>
              
                              <form action="" style="width: 500px; margin: auto">
                                  <div class="form-group">
                                      <label for="formControlRange">Physical Activity Level</label>
                                      <input type="range" data-slider-ticks="[0, 100, 200, 300, 400]" data-slider-ticks-snap-bounds="30" data-slider-ticks-labels='["$0", "$100", "$200", "$300", "$400"]' class="form-control-range" id="formControlRange">
                                  </div>
                                  
                                  <div class="custom-control custom-switch">
                                      <input type="checkbox" class="custom-control-input" id="customSwitch1">
                                      <label class="custom-control-label" for="customSwitch1">Want to add Nutrition to your Plan?</label>
                                  </div>
                              </form>
                                  
                                  
                              <div action="" style="width: 500px; margin: auto" class="btn-group" role="group" aria-label="Basic example">
                                  <option action="" style="width: 500px; margin: auto" selected>How is your diet?</option>
                                  <button type="button" class="btn btn-secondary">Good</button>
                                  <button type="button" class="btn btn-secondary">Just Ok</button>
                                  <button type="button" class="btn btn-secondary">Let's not talk about it!</button>
                              </div>
                                  
                                      
                                  
                              
                              <div xclass="form-group">
                                  <div class="form-check">
                                      <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                                      <label class="form-check-label" for="invalidCheck">
                                      Agree to terms and conditions
                                      </label>
                                      <div class="invalid-feedback">
                                      You must agree before submitting.
                                      </div>
                                  </div>
                              </div>
                              
                              <button type="submit" id="createUserButton" class="btn btn-primary">Create Account</button>
                              <small id="newUserHelp" class="form-text text-muted">Back to Sign In?</small>
                              <small class="form-text text-muted"><button class="btn btn-light" id="signInDivButton">Sign In</button></small>
                                      
                          </div>
                  </div>

                <div id="weightDiv"></div>

                <div style="display:none;" id="passwordResetDiv">
                  <h3>Password Reset</h3>
                  <form>
                    <div class="form-group">
                      <label for="exampleInputEmail2">Email address</label>
                      <input class="form-control" id="resetEmail" placeholder="Enter email">
                    </div>
                    <button type="submit" id="passwordResetSubmitButton" class="btn btn-primary">Reset</button>
                    <small id="newUserHelp" class="form-text text-muted">Back to Sign In?</small>
                    <small class="form-text text-muted"><button class="btn btn-light" id="signInDivButton">Sign In</button></small>
                  </form>
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`);
});