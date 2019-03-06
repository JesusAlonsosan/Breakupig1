//CANVAS

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


//VARIABLES

var frames = 0
var interval
var audio
var velocity = 1000/40

//pelota
var score = 0
var ballRadius = 7;
var x = canvas.width/3; 
var y = canvas.height-30;
var dx = 6;
var dy = -6;

//paleta
var paddleHeight = 20;
var paddleWidth = 95;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

//bloques
var brickRowCount = 5;
var brickColumnCount = 7;
var brickWidth = 55;
var brickHeight = 20;
var brickPadding = 20;
var brickOffsetTop = 100;
var brickOffsetLeft = 35;

//bloques nuevos
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/*
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
*/


function gameOver(){
    clearInterval(interval)
    ctx.font = "50px Arial"
    ctx.fillStyle = "white"
    ctx.fillText('GAME OVER',140,400)
    ctx.fillText(enemies.length, 226,150)
}

function chamPeon(){
    clearInterval(interval)
    ctx.font = "50px Arial"
    ctx.fillStyle = "white"
    ctx.fillText('CHAMPION!!',140,400)
    ctx.fillText(enemies.length, 226,150)
}


function drawScore() {
    ctx.font = "45px Arial";
    ctx.fillStyle = "#E9E4E8";
    ctx.fillText("" + score, 280, 60);
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
       if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
          if(score == brickRowCount*brickColumnCount) {
            chamPeon();
            document.location.reload();
            clearInterval(interval); 
            miMusic();
          }
        }
      }
    }
  }
}

//pelota
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

//Paleta
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#E721A0";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        if(bricks[c][r].status == 1) {
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#32CD30";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    frames ++
        // aqui pongo aumento de la velocidad en base a los frames
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            gameOver();
            document.location.reload();
            clearInterval(interval);
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
}

//var interval = setInterval(draw,5);

var startbtn=document.getElementById("start") 
startbtn.onclick=function (){
    interval = setInterval(draw,velocity)

    audio=new Audio()
    audio.src="./Audio/scsi-9-eclair-de-lune.mp3"
    audio.onload=function(){
        audio.play()
    }
}

 



//bloques
//constructores
//instancias
//main fuctions
//aux fuctions
//listeners