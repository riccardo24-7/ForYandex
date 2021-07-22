var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var delayInMilliseconds = 100; //100 miliseconds
var checkStart = false;
var level = 0;


$(document).keypress(function(event) {
  if ((!checkStart)&&(event.key == "a")) {
    $("h1").text("Level " + level);
  nextSequence();
  checkStart = true;
}
});

$(".btn").click(function(event) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  music(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length)-1);
});


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //console.log(gamePattern);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  music(randomChosenColour);
}


function checkAnswer(currentLevel) {

  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
  if(userClickedPattern.length == gamePattern.length) {
    setTimeout(function() {
      nextSequence()}, 1000);
  }
}else {
    console.log("wrong");
    music("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  }

}


function startOver() {
  level = 0;
  gamePattern = [];
  checkStart = true;
}


function music(song) {
  var audio = new Audio('sounds/'+ song + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, delayInMilliseconds);

}
