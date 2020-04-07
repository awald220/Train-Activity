$(document).ready(function(){
var config ={
    apiKey: "AIzaSyCh0oepPxWJWV6wC1ih-bkqJN7w9lAmKc0",
    authDomain: "train-schedule-72429.firebaseapp.com",
    databaseURL: "https://train-schedule-72429.firebaseio.com",
    projectId: "train-schedule-72429",
    storageBucket: "train-schedule-72429.appspot.com"
}

firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();
    
var name = "";
var dest = "";
var time = "";
var freq = "";


$("#click-button").on("click", function(event){
    event.preventDefault();

    name = $("#trainName").val().trim();
    dest= $("#destination").val().trim();
    time = $("#firstTrain").val().trim();
    freq = $("#interval").val().trim();
    
    database.ref().push({
        name: name,
        dest: dest, 
        time: time, 
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
   console.log("hello")
   $("form")[0].reset();
})

// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes
database.ref().on("child_added", function(snapshot){
 //print the local data to the console
  console.log(snapshot.val())

  var sv = snapshot.val()
  
  //give the following vars value of what they would be in the database object
  var trainName = sv.trainName;
  var destination = sv.destination;
  var trainTime = sv.trainTime;
  var frequency = sv.frequency;

  // add new row when info is inputed to form display on the page 
  var newRow = $("<tr>");
 $("tbody").append(newRow);
 var newTrainName = $("<td>").text(sv.name);
 var newDestintion = $("<td>").text(sv.dest);
 var newTrainTime = $("<td>").text(sv.time);
 var newFrequency = $("<td>").text(sv.freq);
 $(newRow).append(newTrainName, newDestintion, newFrequency, newTrainTime);

})








}); //document ready 