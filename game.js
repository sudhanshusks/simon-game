var buttonColours= ["red", "green", "blue", "yellow"];
var gamePattern= [];
var userClickedPattern= [];
var level= 0;
var gameStarted= false;

$("#level-title").text("Press A Key to Start");

function nextSequence(){
    userClickedPattern= [];
    randomNumber= Math.round(Math.random()*3);
    randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
}

function playSound(name){
    var filePath= "./sounds/"+name+".mp3";
    var audio= new Audio(filePath);
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level= 0;
    gamePattern= [];
    gameStarted= false;
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Sucess!");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        console.log(gamePattern);
        console.log(userClickedPattern);
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

$(".btn").click(function(){
    userChosenColour= this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length -1);
});

$(document).keypress(function(e){
    if(!gameStarted){
        gameStarted= true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
});