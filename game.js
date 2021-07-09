var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("h1").text("Level " + level)
  level++;
  $("." + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function animatePress(currentColour) {
  $(".btn").click(function() {
    var animatedButton = $(this);
    animatedButton.addClass("pressed");
    setTimeout(function() {
      animatedButton.removeClass("pressed");
    }, 100)
  })
}

$(document).one("keydown", function() {
  nextSequence()
})

var audioWrong = new Audio("sounds/wrong.mp3")


function playSound(name) {
  switch (name) {

    case "red":
      var audioRed = new Audio("sounds/red.mp3");
      audioRed.play();
      break;

    case "blue":
      var audioBlue = new Audio("sounds/blue.mp3");
      audioBlue.play();
      break;

    case "green":
      var audioGreen = new Audio("sounds/green.mp3");
      audioGreen.play();
      break;

    case "yellow":
      var audioYellow = new Audio("sounds/yellow.mp3");
      audioYellow.play();
      break;

    default:
      console.log(name);
  }
}

/* tu napotkałem na problem, zgodnie z krokiem 8 starałem się opracować logikę działania samemu;
udało mi się wymyśleć jak gra powinna działać krok po kroku, ale nie udało mi się tego dobrze zapisać
(chyba wyłożyłem się na tym, że chciałem porówanć bezpośrednio dwa zbiory w jednym kroku, a nie ich ostatnią pozycję i długość)
i musiałem wykonać instrukcje Angeli, które zawarła w 8 kroku*/

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success")
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = []
    }
  } else {
    audioWrong.play();
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //mój problem z restartem gry: widziałem poprawną odpowiedź, ale nie do końca rozumiem jak działa, więc zostawiam swoje rozwiązanie

    $("h1").text("Game Over, click me to restart");
    $("h1").on("click", function() {
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
      nextSequence();

    })
  }
}
