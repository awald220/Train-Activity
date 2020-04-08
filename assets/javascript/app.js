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

database.ref().on("child_added", function(snapshot){
  //print the local data to the console
  console.log(snapshot.val())

  var sv = snapshot.val()
  
  //give the following vars value of what they would be in the database object
  var trainName = sv.trainName;
  var destination = sv.destination;
  var trainTime = sv.trainTime;
  var frequency = sv.frequency;

  var tFrequency = freq;

  // Time is 3:30 AM
  var firstTime = time;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

 


  
  //add new row when info is inputed to form display on the page 
  var newRow = $("<tr>");
 $("tbody").append(newRow);
 var newTrainName = $("<td>").text(sv.name);
 var newDestintion = $("<td>").text(sv.dest);
 var newTrainTime = $("<td>").text(sv.time);
 var newFrequency = $("<td>").text(sv.freq);
 var minuteAway = $("<td>").text(tMinutesTillTrain)
 $(newRow).append(newTrainName, newDestintion, newFrequency, newTrainTime, minuteAway);

})








}); //document ready 