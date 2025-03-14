var buttoncolours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextsequence();
      started = true;
    }
  });
  


function nextsequence(){
    userClickedPattern= [];
    level++;
    $("#level-title").text("Level " + level);
    var randomnumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttoncolours[randomnumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    audio.play();


}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}


function animatePress(currentcolour){
    $("#"+currentcolour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolour).removeClass("pressed");
      }, 100);

}
function checkAnswer(currentlevel){
    if ((gamePattern[currentlevel])===(userClickedPattern[currentlevel])) {
        console.log("right");
        if((gamePattern.length)===(userClickedPattern.length)){
            setTimeout(function () {
                nextsequence();
            }, 1000);
      
        }
        
    }
    else{
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startover();
        console.log("wrong");
    }
}



function startover(){
    level = 0;
    gamePattern = [];
    started = false;
}



$(".btn").on("click",function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

  });

// $(document).keydown(nextsequence());