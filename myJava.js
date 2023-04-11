window.addEventListener("load", () => {

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d");
const startBtn = document.querySelector("#start")
const restartBtn = document.querySelector("#restart")


// Variables
let ballSpeed = 1;
let ballAxisX = 200;
let ballAxisY = 200; 
let ninjaXaxis = 280;
let ninjaYaxis = 400;

// Game Functionality
const setUpGame = () => {
canvas.style.display = 'block'
startBtn.style.display = 'none'
animate();
}

startBtn.addEventListener('click', setUpGame)


restartBtn.addEventListener('click', () => {

})


// Ninja
const myNinja = () => {
ctx.beginPath ();
ctx.rect(ninjaXaxis, ninjaYaxis, 20, 30);
ctx.fillStyle = "black";
ctx.fill();
ctx.closePath();
}

// Ball
const myBall = () => {
    ctx.beginPath();
    ctx.arc(ballAxisX, ballAxisY, 20, 0, Math.PI * 2);
    ctx.fillStyle = "green"
    ctx.fill();
    ctx.closePath();
}

// ANIMATION
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    myBall();
    ballAxisX += 15
    ballAxisY += 14
    requestAnimationFrame(animate)
}


//Execution
myNinja();
myBall();




}); //MAIN FUNCTION AND FIRST EVENTLISTENER!!


