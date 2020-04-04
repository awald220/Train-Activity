var config ={
    apiKey: "AIzaSyCh0oepPxWJWV6wC1ih-bkqJN7w9lAmKc0",
    authDomain: "train-schedule-72429.firebaseapp.com",
    databaseURL: "https://train-schedule-72429.firebaseio.com",
    projectId: "train-schedule-72429",
    storageBucket: "train-schedule-72429.appspot.com"
}

firebase.initializeApp(config);
// Create a variable to reference the database.
var database = firebase.database();
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");
// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");
// When the client's connection state changes...
connectedRef.on("value", function(snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});
// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {
  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").text(snap.numChildren());
});



// Vars for inputs 
var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";


// when submit is clicked, gets the info from the form
$("#click-button").on("click", function(event){
    //prevent the page from refreshing
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().set({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });
});

database.ref().on("value", function(snapshot){
    //print the initial data to the console
    console.log(snapshot.val());

    //log the value of the various properties
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().frequency);

    //change the HTML



    
}, function(errorObject){
    console.log("The read failed: " + errorObject.code);
})