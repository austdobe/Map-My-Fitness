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
  
  // Changes when user signs in or out
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Updates Modal Divs Display
      $("#loginDiv").hide();
      $("#loggedInDiv").show();
      $("#newUserDiv").hide();
      $("#weightDiv").show();

      // User is signed in.
      var user = firebase.auth().currentUser;
      var userId = firebase.auth().currentUser.uid;
      weightForm();

      // Updates Navbar on Sign In
      $("#signInModalButton").text('Sign Out');

      if(user != null){
        
        var email_id = user.email;
        
        database.ref("/users/"+userId).on("value", function(snapshot) {
          
          $("#userP").empty();
          $("#userP").text("User : " + email_id);
          weight = snapshot.val().weight;
          $("#userP").append("<p>Current Weight : " + weight +"</p>");
          // weightForm();
          user.updateProfile({
            displayName: "Jeff" // Change to users name
          }).then(function() {
            // Update successful.
          }).catch(function(error) {
            alert(error.message);
            // An error happened.
          });
        });
      };

    } else { // No user is signed in.
      // Updates Modal Divs Display
      $("#loginDiv").show();
      $("#loggedInDiv").hide();
      $("#weightDiv").hide();

      // Updates Navbar on Sign Out
      $("#signInModalButton").text('Sign In');
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
    var signUpError = false;
    var firstName = $("#validationCustom01").val();
    var lastName =$("#validationCustom02").val();
    var gender = $("#gender").val();
    var email = $("#newUserEmail").val();
    var password = $("#newUserPassword").val();
    var confirmPassword = $("#confirmPasswordInput").val();
    var ageRange = $("#ageRange").val();
    var height = $("#heightInput").val();
    var weight = $("#weightInput").val();
    var goals = $("#goalsInput").val();
    var activityLevel = $("#activityLevelInput").val();
    var nutritionToPlan;
    var dietLevel;
    var agreeToTnC;
    console.log(firstName);
    console.log(lastName);
    console.log(gender);
    console.log(email);
    console.log(ageRange);
    console.log(height);
    console.log(weight);
    console.log(goals);
    console.log(activityLevel);
    console.log(nutritionToPlan);
    console.log(dietLevel);
    console.log(agreeToTnC);



    if(password === confirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
        signUpError = true;
        // ...
      });
    } else {
      signUpError = true;
      alert("Passwords do not match");
    };

    if (!signUpError) {
      database.ref("/users/"+firebase.auth().currentUser.uid).set({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        ageRange: ageRange,
        height: height,
        weight: weight,
        goals: goals,
        activityLevel: activityLevel,
        nutritionToPlan: nutritionToPlan,
        dietLevel: dietLevel
      });
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

  // Logs in user when clicked
  $(document).on('click', '#loginButton', function(event) {
    event.preventDefault();
    login();
  });
  
  // Logs out user
  $(document).on('click', '#logoutButton', function() {
    logout();
  });

  //
  $(document).on('click', '#newUserButton', function(event) {
    event.preventDefault();
    $("#loginDiv").hide();
    $("#loggedInDiv").hide();
    $("#newUserDiv").show();
  });

  // 
  $(document).on('click', '#createUserButton', function(event) {
    event.preventDefault();
    newUser();
  });

  // Logs weight when clicked
  $(document).on('click', '#weightButton', function(event) {
    event.preventDefault();
    weightLog();
  });
  
  // Displays signin in div when clicked
  $(document).on('click', '#signInDivButton', function(event) {
    event.preventDefault();
    $("#loginDiv").show();
    $("#loggedInDiv").hide();
    $("#newUserDiv").hide()
    $("#weightDiv").hide();
    $("#passwordResetDiv").hide();
  });

  // When Password reset button is clicked. Displays password reset div
  $(document).on('click', '#passwordResetButton', function(event) {
    event.preventDefault();
    $("#loginDiv").hide();
    $("#loggedInDiv").hide();
    $("#newUserDiv").hide()
    console.log('test');
    $("#weightDiv").hide();
    $("#passwordResetDiv").show();
  });

  // When Password Reset submit button is clicked
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
              <div id="weightDiv"></div>
          </div>
              
          <div id="newUserDiv" style="display:none;">
              <h3>New User</h3>
              <div class="row">
                  <div class="col-lg-12">
                      <form action="" style="margin: auto" class="needs-validation" novalidate>
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
                         
                          <label for="Gender">Gender</label>
                          <select label for="gender" id="gender" class="form-control">
                          <option></option>
                          <option>Male</option>
                          <option>Female</option>
                          </select>
                          </div>
                      </form>      
                      <form>
                          <div action="" margin: auto" class="form-group">
                              <div class="form-group">
                                  <label for="exampleInputEmail1">Email address</label>
                                  <input type="email" class="form-control" id="newUserEmail"  placeholder="Enter email">
                              </div>
                              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                          </div>
                          <div action="" style=" margin: auto" class="form-group">
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
                      <form action="" style="margin: auto">  
                          <select name="car" id="ageRange">
                              <option value="car1">Age Range</option>
                              <option value="18-30">18-30</option>
                              <option value="30-45">30-45</option>
                              <option value="45-Above">45-Above</option>
                          </select>     
                          <select name="car" id="heightInput">
                              <option value="car1">Height</option>
                              <option value="4'1"-5'0"">4'1"-5'0"</option>
                              <option value="5'1"-6'0"">5'1"-6'0"</option>
                              <option value="6'1"-6'10"">6'1"-6'10"</option>
                          </select>     
                          <select name="car" id="weightInput">
                              <option value="car1">Weight</option>
                              <option value="150-200lbs">150-200lbs</option>
                              <option value="200-250lbs">200-250lbs</option>
                              <option value="250-340lbs">250-340lbs</option>
                          </select>     
                          <select name="car" id="goalsInput">
                              <option value="car1">Goals</option>
                              <option value="Loose More Weight">Loose More Weight</option>
                              <option value="Build Muscle">Build Muscle</option>
                              <option value="Look like 'the Rock'">Look like "the Rock"</option>
                          </select>  
                          <select name="car" id="activityLevelInput">
                            <option value="car1">Physical Activity Level</option>
                              <option value="0 to 1 hours/wk<">0 to 1 hours/wk</option>
                              <option value="1 to 3 hours/wk">1 to 3 hours/wk</option>
                              <option value="3 to 5 hours/wk">3 to 5 hours/wk</option>
                              <option value="5+ hours/wk">5+ hours/wk</option>
                          </select>  
                      </form>
                      <form action="" style="margin: auto">
                          <div class="custom-control custom-switch mt-3 mb-3">
                              <input type="checkbox" class="custom-control-input" id="customSwitch1">
                              <label class="custom-control-label" for="customSwitch1">Want to add Nutrition to your Plan?</label>
                          </div>
                      </form>     
                      <div action="" style="margin: auto" class="btn-group" role="group" aria-label="Basic example">
                          <option action="" class="mr-3" style="margin: auto" selected>How is your diet?</option>
                          <button type="button" class="btn btn-secondary dietButtons">Good</button>
                          <button type="button" class="btn btn-secondary dietButtons">Just Ok</button>
                          <button type="button" class="btn btn-secondary dietButtons">Let's not talk about it!</button>
                      </div> 
                      <div class="form-group">
                          <div class="form-check mt-3">
                              <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                              <label class="form-check-label" for="invalidCheck">
                                  Agree to terms and conditions
                              </label>
                              <div class="invalid-feedback">
                                  You must agree before submitting.
                              </div>
                          </div>
                      </div>
                      <button type="submit" id="createUserButton" class="btn btn-primary mb-2">Create Account</button>
                      <small id="newUserHelp" class="form-text text-muted">Back to Sign In?</small>
                      <small class="form-text text-muted"><button class="btn btn-light" id="signInDivButton">Sign In</button></small>       
                  </div>
              </div>
          </div>
          </div>
          
          <div id="passwordResetDiv" style="display:none;">
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

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>`
  );
});