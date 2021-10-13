song = "";
centuries = "";
one = "";
demons = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeft = 0;
scoreRight = 0;

function preload(){
    centuries = loadSound("song.mp3");
    one = loadSound("One.mp3");
    demons = loadSound("Demons.mp3");
}

function setup(){
canvas = createCanvas(600, 500);
canvas.center();
video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotposes);
}

function modelLoaded() {
    console.log("PoseNet Is Initialized")
}

function gotposes(result){
if(result.length > 0){
    console.log(result);
    scoreLeft = result[0].pose.keypoints[9].score;
    scoreRight = result[0].pose.keypoints[10].score;
    console.log("Score of leftWrist is = " + scoreLeft);
    console.log("Score of rightWrist is = " + scoreRight);
    leftWristX = result[0].pose.leftWrist.x;
    leftWristY = result[0].pose.leftWrist.y;
    rightWristX = result[0].pose.rightWrist.x;
    rightWristY = result[0].pose.rightWrist.y;
    
    console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY);
    console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);
    
    
}
}

function draw(){
image(video, 0, 0, 600, 500);
fill("#00FF00");
stroke("#00FF00");
if(scoreLeft > 0.2){
    circle(leftWristX, leftWristY,20);
    leftY = Number(leftWristY);
    remove_decimals = floor(leftY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}


if(scoreRight > 0.2){
    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
     
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    else if(rightWristY >200 && rightWristY <= 300){
        document.getElementById("speed").inerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY<= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }

    else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
   }

}



function play()

{
 var name = document.getElementById("name").value;

 if(name == "centuries")
   
 {
    
 centuries.play();
 centuries.setVolume(1);
 centuries.rate(1);
 song = centuries;
 }
 
  if(name == "one_thing")
 {
 one.play();
 one.setVolume(1);
 one.rate(1);
 song = one;
 }
 
  if(name == "my_demons")
 {
demons.play();
demons.setVolume(1);
demons.rate(1);
song = demons;
 }
}


function pause(){
song.pause();
one.pause();
demons.pause();
}

function stop(){
song.stop();
one.stop();
demons.stop();
}
