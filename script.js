
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

const playSound = (name) => {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}



const nextSequence = () => {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

const startOver = () => {

    level = 0;
    gamePattern = [];
    started = false;

}

$(document).keypress(function (event) {
    var title = $('#level-title').text();

    if (title == "Game Over, Press Enter Key to Restart") {
        if (event.key == "Enter") {


            $("#level-title").text("Level " + level);
            nextSequence();


        }
    }

    else if (event.key == "A" || event.key == "a") {

        $("#level-title").text("Level " + level);
        nextSequence();


    }

});

const checkAnswer = (currentLevel) => {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        $("body").addClass("game-over");

        playSound("wrong");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);

        $("#level-title").text("Game Over, Press Enter Key to Restart");

        startOver();
    }

}



const animatePress = (currentColour) => {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    // console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});











