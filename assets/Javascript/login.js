$(document).ready(function(){
  // Global variables
  var weight;
  var signUpError;
  var dietLevel = "";
  var profilePicFileName = "";

  // Sets update firebase link
  var config = {
    apiKey: "AIzaSyCqwaY-3wWYY4jadfbnn8bv2zPEjZA2Moo",
    authDomain: "project1-6e88d.firebaseapp.com",
    databaseURL: "https://project1-6e88d.firebaseio.com",
    projectId: "project1-6e88d",
    storageBucket: "simple-image-upload.appspot.com",
    messagingSenderId: "1010093316178",
    appId: "1:1010093316178:web:dacd8997acea26b7"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  // Initializes the storage bucket for photos
  var storageService = firebase.storage();
  var storageRef = storageService.ref();
  
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

      // Adds weight input form to modal
      weightForm();

      profilePicGen();

      // Updates Navbar on Sign In
      $("#signInModalButton").text('Sign Out');
      
      // Displays user info on login modal
      database.ref("/users/"+userId).on("value", function(snapshot) {
        $("#userP").empty();
        $("#userWelcome").text("Welcome " + snapshot.val().firstName + "!");
        weight = snapshot.val().weight;
        $("#userP").append("<p>Current Weight : " + weight +"</p>");
      });

    } else { // No user is signed in.
      // Updates Modal Divs Display
      $("#loginDiv").show();
      $("#loggedInDiv").hide();
      $("#weightDiv").hide();

      // Updates sign up vs user info modals since they share the same ids
      createSignUpModal();
      $("#UpdateUserInfoModal").remove();

      // Updates Navbar on Sign Out
      $("#signInModalButton").text('Sign In');
    }
  });

  // Login fucntion called when login button is clicked
  function login(){
    var userEmail = $("#emailInput").val();
    var userPassword = $("#passwordInput").val();
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
    });
  };

  // Function called when logout button is clicked
  function logout(){
    firebase.auth().signOut();
  };
  
  // Updates user info to firebase and checks validation
  function userInfo() {
    // Removes sign up alert and validation from previous login attempt
    $("#signUpAlert").empty();
    $("#firstNameValidation").attr("class","invalid-feedback");
    $("#lastNameValidation").attr("class","invalid-feedback");
    $("#genderValidation").attr("class","invalid-feedback");
    $("#goalsValidation").attr("class","invalid-feedback");
    $("#activityLevelValidation").attr("class","invalid-feedback");
    $("#weightValidation").attr("class","invalid-feedback");
    $("#heightValidation").attr("class","invalid-feedback");
    $("#ageValidation").attr("class","invalid-feedback");
    $("#dietValidation").attr("class","invalid-feedback");
    signUpError = false;

    // Grabs info from sign in form
    var firstName = $("#validationCustom01").val().trim();
    var lastName =$("#validationCustom02").val().trim();
    var gender = $("#gender").val().trim();
    var age = $("#ageInput").val().trim();
    var height = $("#heightInput").val().trim();
    var weight = $("#weightInput").val().trim();
    var goals = $("#goalsInput").val().trim();
    var activityLevel = $("#activityLevelInput").val().trim();
    var nutritionToPlan = $("#customSwitch1").is(':checked');
    var date =  moment().format('l');
    
    // Below validation checks show invalid feedback if invalid entry
    // Checks if first name input is empty
    if (firstName==="") {
      $("#firstNameValidation").attr("class","invalid-feedback d-block");
    };

    // Checks if last name input is empty
    if (lastName==="") {
      $("#lastNameValidation").attr("class","invalid-feedback d-block");
    };

    // Checks if gender is selected
    if (gender === "") {
      signUpError = true;
      $("#genderValidation").attr("class","invalid-feedback d-block");
    };

    // Checks if a goal is selected
    if (goals === "car1") {
      signUpError = true;
      $("#goalsValidation").attr("class","invalid-feedback d-block");
    };

    // Checks if activty level is selected
    if (activityLevel === "car1") {
      signUpError = true;
      $("#activityLevelValidation").attr("class","invalid-feedback d-block");
    };

    // Checks if weight is a valid positive integer
    if (!(Number.isInteger(parseFloat(weight)) && parseFloat(weight)>0)) {
      signUpError = true;
      $("#weightValidation").attr("class","invalid-feedback d-block");
    };

    // Checks if height is a valid input
    if ((height.slice(1,2)==="'")&&(height.charAt(height.length-1)==='"')){
      if(height.length === 5) {
        var inches = parseFloat(height.slice(2,4));
      } else if (height.length === 4) {
        var inches = parseFloat(height.slice(2,3));
      }
      heightValid = Number.isInteger(inches)&&(0<=inches)&&(inches<12);
    } else {
      heightValid = false;
    };

    // Shows height invalid feedback
    if (!heightValid){
      signUpError = true;
      $("#heightValidation").attr("class","invalid-feedback d-block");
    }

    // Checks if age is valid input
    if (!(Number.isInteger(parseFloat(age)) && parseFloat(age)>0)) {
      signUpError = true;
      $("#ageValidation").attr("class","invalid-feedback d-block");
    };

    // Checks if diet level is selected
    if(dietLevel ==="") {
      signUpError = true;
      $("#dietValidation").attr("class","invalid-feedback d-block");
    };

    // Updates info to firebase weights 3 seconds for new firebase user creation
    setTimeout(function(){ 
      // Checks if any sign up validation errors
      if (!signUpError) {
        database.ref("/users/"+firebase.auth().currentUser.uid).update({
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          age: age,
          height: height,
          weight: weight,
          goals: goals,
          activityLevel: activityLevel,
          dietLevel: dietLevel,
          nutritionToPlan: nutritionToPlan
        });
        database.ref("/users/"+firebase.auth().currentUser.uid+"/weights").push({
          weight: weight,
          date: date
        }).then(function(){
          // Shows success if database updated successfully
          var updateSuccessDiv = $("<div>");
          updateSuccessDiv.attr("class","alert alert-success");
          updateSuccessDiv.attr("role","alert");
          updateSuccessDiv.text("Success!");
          $("#signUpAlert").html(updateSuccessDiv);
          $(".updateInfoForm").removeAttr("style","background-color");
        });
      };
    }, 3000);
  };

  // Validation and firebase authentication for new user
  function newUser() {

    // Calls user info function that updates database
    userInfo();

    // Removes sign up alert and validation from previous sign up attempt
    $("#emailValidation").attr("class","invalid-feedback");
    $("#passwordValidation").attr("class","invalid-feedback");
    $("#tncValidation").attr("class","invalid-feedback");

    // Grabs info from form
    var email = $("#newUserEmail").val().trim();
    var password = $("#newUserPassword").val().trim();
    var confirmPassword = $("#confirmPasswordInput").val().trim();
    var agreeToTnC = $("#invalidCheck").is(":checked");

    // Below checks validation and shows invalid feedback
    // Checks if email is valid
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
      signUpError = true;
      $("#emailValidation").attr("class","invalid-feedback d-block");
    };
    
    // Checks if passwords match
    if (password != confirmPassword) {
      signUpError = true;
      $("#passwordValidation").attr("class","invalid-feedback d-block");
    };

    // Checks if terms and conditions are agreed to
    if (!agreeToTnC) {
      signUpError = true;
      $("#tncValidation").attr("class","invalid-feedback d-block");
    };

    // Attempts to create new user if no invalid input
    if(!signUpError) {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Displays any sign up errors from firebase
        var errorCode = error.code;
        var errorMessage = error.message;
        var signUpErrorDiv = $("<div>");
        signUpErrorDiv.attr("class","alert alert-danger");
        signUpErrorDiv.attr("role","alert");
        signUpError = true;
        signUpErrorDiv.text("Error : " + errorMessage);
        $("#signUpAlert").append(signUpErrorDiv);
      });
    };
  };

  // Logs new user weight to firebase
  function weightLog() {
    var weight = $("#weightInput2").val();
    database.ref("/users/"+firebase.auth().currentUser.uid).update({
      weight: weight
    });
  };

  // Creates weight input form displayed on logged in user modal
  function weightForm() {
    var form = $("<form>");
    form.attr("id","weightForm");
    var newDiv = $("<div>");
    newDiv.append("<label>Log New Weight</label>");
    newDiv.append("<input class='form-control' id='weightInput2' placeholder='Current Weight..'>");
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

  $(document).on('click', '#updateUserInfoButton', function(event) {
    event.preventDefault();
    userInfo();
  });

  // Logs weight when clicked
  $(document).on('click', '#weightButton', function(event) {
    event.preventDefault();
    weightLog();
  });
  
  // Displays sign in div when clicked
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
    $("#weightDiv").hide();
    $("#passwordResetDiv").show();
  });

  // When Password Reset submit button is clicked
  $(document).on('click', '#passwordResetSubmitButton', function(event) {
    event.preventDefault();
    var emailAddress = $("#resetEmail").val().trim();
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });
  });

  // Updates diet button to current selection when user info modal is displayed
  $(document).on("click", "#updateUserInfo", function(event) {
    event.preventDefault();
    database.ref("/users/"+firebase.auth().currentUser.uid).once("value", function(snapshot) {
      dietLevel = snapshot.val().dietLevel;
    });
  });

  // Updates diet buttons when clicked
  $(document).on('click', '.dietButtons', function(event) {
    event.preventDefault();
    let id = $(this).attr("id");
    $(this).attr("class","btn btn-primary dietButtons");
    if (id === "dietButton1"){
      dietLevel = "Good";
      $("#dietButton2").attr("class","btn btn-secondary dietButtons");
      $("#dietButton3").attr("class","btn btn-secondary dietButtons");
    } else if (id === "dietButton2"){
      dietLevel = "Just Ok";
      $("#dietButton1").attr("class","btn btn-secondary dietButtons");
      $("#dietButton3").attr("class","btn btn-secondary dietButtons");
    } else if (id === "dietButton3"){
      dietLevel = "Let's not talk about it!";
      $("#dietButton1").attr("class","btn btn-secondary dietButtons");
      $("#dietButton2").attr("class","btn btn-secondary dietButtons");
    };
  });

  // Adds sign in/out modal to html
  $(document.body).append(
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
              <h3 id ="userWelcome"></h3>
              <p id="userP"></p>
              <button id="logoutButton" class="btn btn-dark">Logout</button>
              <div id="weightDiv"></div>
          </div>
              
          <div id="newUserDiv" style="display:none;">
              
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

  // Adds sign up modal info. Used since ids are shared between sign in form and info update form on profile
  function createSignUpModal() {
    $("#newUserDiv").append(
    `<h3>New User</h3>
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
                                    <div id="firstNameValidation" class="invalid-feedback">
                                      Please enter first name
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="validationCustom02">Last name</label>
                                    <input type="text" class="form-control" id="validationCustom02" placeholder="Otto" required>
                                    <div class="valid-feedback">
                                    Looks good!
                                    </div>
                                    <div id="lastNameValidation" class="invalid-feedback">
                                      Please enter last name
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                  <label for="Gender">Gender</label>
                                  <select label for="gender" id="gender" class="form-control">
                                  <option></option>
                                  <option>Male</option>
                                  <option>Female</option>
                                  </select>
                                  <div id="genderValidation" class="invalid-feedback">
                                    Please select gender
                                  </div>
                                </div>
                            </div>
                          
                            
                        </form>      
                        <form>
                            <div action="" margin: auto" class="form-group">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="newUserEmail"  placeholder="Enter email">
                                </div>
                                <div id="emailValidation" class="invalid-feedback">
                                  Please enter valid email
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
                            <div id="passwordValidation" class="invalid-feedback">
                              Passwords do not match
                            </div>
                            <div class="form-group form-check"></div>
                            <div class="form-group">
                              <label for="goals">Goals</label>
                              <select id="goalsInput" class="form-control">
                                  <option value="car1"></option>
                                  <option value="Lose More Weight">Lose More Weight</option>
                                  <option value="Build Muscle">Build Muscle</option>
                                  <option value="Look like 'the Rock'">Look like "the Rock"</option>
                              </select>
                              <div id="goalsValidation" class="invalid-feedback">
                                Please select a goal
                              </div>
                            </div>
                            <div class="form-group">
                              <label>Activity Level</label>  
                              <select id="activityLevelInput" class="form-control">
                                <option value="car1"></option>
                                  <option value="0 to 1 hours/wk<">0 to 1 hours/wk</option>
                                  <option value="1 to 3 hours/wk">1 to 3 hours/wk</option>
                                  <option value="3 to 5 hours/wk">3 to 5 hours/wk</option>
                                  <option value="5+ hours/wk">5+ hours/wk</option>
                              </select>  
                              <div id="activityLevelValidation" class="invalid-feedback">
                                Please select a physical activity level
                              </div> 
                            </div>
                        </form>
                        <div class="form-group">
                                <label for="exampleWegihtInput">Current Weight (lbs)</label>
                                <input class="form-control" id="weightInput" placeholder="...">
                                <div id="weightValidation" class="invalid-feedback">
                                  Please enter a valid weight
                                </div>  
                        </div>
                        <div class="form-group">
                                <label for="exampleHeightInput">Current Height (5'10")</label>
                                <input class="form-control" id="heightInput" placeholder="...">
                                <div id="heightValidation" class="invalid-feedback">
                                  Please enter a valid height
                                </div>  
                        </div>
                        <div class="form-group">
                                <label for="exampleAgeInput">Age</label>
                                <input class="form-control" id="ageInput" placeholder="...">
                                <div id="ageValidation" class="invalid-feedback">
                                  Please enter a valid age
                                </div>  
                        </div>
                        <form action="" style="margin: auto">
                            <div class="custom-control custom-switch mt-3 mb-3">
                                <input type="checkbox" class="custom-control-input" id="customSwitch1">
                                <label class="custom-control-label" for="customSwitch1">Want to add Nutrition to your Plan?</label>
                            </div>
                        </form>     
                        <div action="" style="margin: auto" class="btn-group" role="group" aria-label="Basic example">
                            <option action="" class="mr-3" style="margin: auto" selected>How is your diet?</option>
                            <button type="button" class="btn btn-secondary dietButtons" id="dietButton1">Good</button>
                            <button type="button" class="btn btn-secondary dietButtons" id="dietButton2">Just Ok</button>
                            <button type="button" class="btn btn-secondary dietButtons" id="dietButton3">Let's not talk about it!</button>
                        </div> 
                        <div id="dietValidation" class="invalid-feedback">
                          Please select an option that best represents your current diet
                        </div>  
                        <div class="form-group">
                            <div class="form-check mt-3">
                                <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                                <label class="form-check-label" for="invalidCheck">
                                    Agree to terms and conditions
                                </label>
                                <div id="tncValidation" class="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div>
                        <div id="signUpAlert"></div>
                          <button type="submit" id="createUserButton" class="btn btn-primary mb-2">Create Account</button>
                          <small id="newUserHelp" class="form-text text-muted">Back to Sign In?</small>
                          <small class="form-text text-muted"><button class="btn btn-light" id="signInDivButton">Sign In</button></small>       
                        </div>
                </div>
              </div>`
    );
  };


  // Handles "Change Picture" button on profile page - opens up modal.
  
  $(document.body).append(
      `<div class="modal fade" id="changeProfilePicModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                    <h3 class="text-center extra-margin">Update Photo</h3>
                      <form action="" style="width: 300px; margin: auto">
                        <div id="filesubmit">
                          <input type="file" class="mb-3" id="file-select" accept="image/*"/>
                          <button class="btn btn-primary" id="file-submit">SUBMIT</button>
                        </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>`
  );

  $(document).on("click", "#changePic", function() {
    $("#file-select").on("change", handleFileUploadChange);
    $("#file-submit").on("click", handleFileUploadSubmit);
  
    let selectedFile;
    function handleFileUploadChange(event) {
      selectedFile = event.target.files[0];
    }
  
    function handleFileUploadSubmit(event) {
      event.preventDefault;
      var uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
      uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      }, (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      }, () => {
         // Do something once upload is complete
         profilePicFileName = selectedFile.name;
         console.log(profilePicFileName);
         console.log('success');


         storageRef.child('images/' + profilePicFileName).getDownloadURL().then(function(profilePicURL) {
          // `profilePicURL` is the download URL for 'images/filename'
    
          // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
          var blob = xhr.response;
          };
          xhr.open('GET', profilePicURL);
          xhr.send();
          console.log(profilePicURL);
          database.ref("/users/"+firebase.auth().currentUser.uid).update({
            profilePicURL: profilePicURL
          }).then(function(){
            profilePicGen();
          });
          
      
        }).catch(function(error) {
          // Handle any errors
        });

      });
    };

  }); // End of on-click function for change profile picture from profile page

  var profilePicURL;
  function profilePicGen() {
    database.ref("/users/"+firebase.auth().currentUser.uid).once("value", function(snapshot) {
      profilePicURL = snapshot.val().profilePicURL;
    }).then(function(){
      var profilePicIMG = $("<img>");
      profilePicIMG.attr("src", profilePicURL);
      profilePicIMG.attr("width", "200");
      $(".profilePic").html(profilePicIMG);
    });
    
    
  };
  



});