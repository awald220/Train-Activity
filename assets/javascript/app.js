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

$("#currentTime").append(moment().format("hh:mm A"));

$("#click-button").on("click", function(event){
    event.preventDefault();

    name = $("#trainName").val().trim();
    dest= $("#destination").val().trim();
    time =  moment($("#firstTrain").val().trim(), "HH:mm").subtract(10, "years").format("X");
    freq = $("#interval").val().trim();
    
    database.ref().push({
        name: name,
        dest: dest, 
        time: time, 
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
   $("form")[0].reset();

   alert(name.name + " has been successfully added");
})




database.ref().on("child_added", function (childSnapshot) {

  var newTrainName = childSnapshot.val().name;
  var newDestination = childSnapshot.val().dest;
  var newFirstTrain = childSnapshot.val().time;
  var newFrequency = childSnapshot.val().freq;

  var tRemainder = moment().diff(moment.unix(newFirstTrain), "minutes") % newFrequency;
  var tMinutes = newFrequency - tRemainder;

  // To calculate the arrival time, add the tMinutes to the currrent time
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  // Create the new row
  var newRow = $("<tr>").append(
    //create table data cells
      $("<td>").text(newTrainName),
      $("<td>").text(newDestination),
      $("<td>").text(newFrequency),
      $("<td>").text(tArrival),
      $("<td>").text(tMinutes),
  );

  // Append the new row to the table
  $("tbody").append(newRow);
  })







}); //document ready 