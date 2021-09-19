var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});


$(".btn").click(function(e) {
  var userChosenColour = (e.currentTarget.id);
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  var index = userClickedPattern.length - 1;
  checkAnswer(index);
});



function checkAnswer(curentLevel) {
  if (userClickedPattern[curentLevel] === gamePattern[curentLevel]) {
    console.log("Succes");

    if (userClickedPattern.length === gamePattern.length) {
      $("#level-title").text("Bravo ma");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    $("#level-title").text("Domne feri (facepalm)");
    setTimeout(function() {
      $("#level-title").text("Press any key to restart");
    }, 2000);
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    startOver();
  }
}



function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + level);
}



function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(curentColor) {
  $("#" + curentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + curentColor).removeClass("pressed");
  }, 1000);
}
