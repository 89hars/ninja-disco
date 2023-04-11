window.addEventListener("load", () => {

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d");
const startBtn = document.querySelector("#start")
const restartBtn = document.querySelector("#restart")


// Var
let movingUp = false
let movingDown = false
let movingLeft = false
let movingRight = false

let ballSpeedX = 4;
let ballSpeedY = 4;

let ballAxisX = 200;
let ballAxisY = 200; 

let ninjaXaxis = 280;
let ninjaYaxis = 400;
const ninjaWidth = 20;
const ninjaHeight = 30;
const ninjaSpeed = 8;
let ballRadio = 20;

let gameOver = false;


// Game Functionality
const setUpGame = () => {
canvas.style.display = 'block'
startBtn.style.display = 'none'
animate();
}

startBtn.addEventListener('click', setUpGame)


restartBtn.addEventListener('click', () => {
})


document.addEventListener("keydown", (event) =>{
  if (event.key === 'ArrowRight' ) {
    movingRight = true
  }

  if (event.key === 'ArrowLeft' ) {
    movingLeft = true
  }

  if (event.key === 'ArrowUp' ) {
    movingUp = true
  }

  if (event.key === 'ArrowDown' ) {
    movingDown = true
  }
 })

 document.addEventListener("keyup", (event) =>{
  if (event.key === 'ArrowRight' ) {
    movingRight = false
  }

  if (event.key === 'ArrowLeft' ) {
    movingLeft = false
  }

  if (event.key === 'ArrowUp' ) {
    movingUp = false
  }

  if (event.key === 'ArrowDown' ) {
    movingDown = false
  }
 })



// Ninja
const myNinja = () => {
ctx.beginPath ();
ctx.rect(ninjaXaxis, ninjaYaxis, ninjaWidth, ninjaHeight);
ctx.fillStyle = "black";
ctx.fill();
ctx.closePath();
}

// Ball
const myBall = () => {
    ctx.beginPath();
    ctx.arc(ballAxisX, ballAxisY, ballRadio, 0, Math.PI * 2);
    ctx.fillStyle = "green"
    ctx.fill();
    ctx.closePath();
}


// ANIMATION
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    myBall();
    myNinja();


    requestAnimationFrame(animate)

    ballAxisX += ballSpeedX;
    ballAxisY += ballSpeedY;

// RIGH WALL    
  if (ballAxisX > canvas.width - ballRadio) {
        ballSpeedX *= - 1
    }
    
 // LEFT WALL 
 if (ballAxisX < ballRadio) {
    ballSpeedX *= - 1
  }
  // Ceiling
  if (ballAxisY < ballRadio) {
    ballSpeedY *= - 1
  }

  // Floor
if (ballAxisY > canvas.height - ballRadio) {
  ballSpeedY *= -1
}

// Ninja movement commands

if (movingLeft && ninjaXaxis > 0) {
  ninjaXaxis -= ninjaSpeed;
} else if (movingRight && ninjaXaxis < canvas.width - ninjaWidth ) {
  ninjaXaxis += ninjaSpeed;
} else if (movingUp && ninjaYaxis > 0) {
  ninjaYaxis -= ninjaSpeed
} else if (movingDown && ninjaYaxis < canvas.height - ninjaHeight) {
  ninjaYaxis += ninjaSpeed
}

// Loosing Condition



} //ANIMATION TAG




//Execution
myNinja();
myBall();


}); //MAIN FUNCTION AND FIRST EVENTLISTENER!!


