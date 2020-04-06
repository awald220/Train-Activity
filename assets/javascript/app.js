// $(document).ready(function(){
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
//When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {
});

// Initials Values
var trainName;
var destination;
var trainTime;
var frequency;

// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes
database.ref().on("value", function(snapshot){
  console.log(snapshot.val());
  
  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  trainTime = snapshot.val().trainTime;
  frequency = snapshot.val().frequency;

  var newRow = $("<tr>");
 $("tbody").append(newRow);
 var newTrainName = $("<td>").text(trainName);
 var newDestintion = $("<td>").text(destination);
 var newTrainTime = $("<td>").text(trainTime);
 var newFrequency = $("<td>").text(frequency);
 $(newRow).append(newTrainName, newDestintion, newFrequency, newTrainTime);

})

$("#click-button").on("click", function(event){
  event.preventDefault();

  database.ref("/trainData").set({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  });

})






// }); //document ready 