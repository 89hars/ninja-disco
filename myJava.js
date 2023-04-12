window.addEventListener("load", () => {

  const canvas = document.querySelector("canvas")
  const ctx = canvas.getContext("2d");
  const startBtn = document.querySelector("#start")

const parent = document.querySelector("#welcome");
const welcomeMsg = document.createElement("p");
welcomeMsg.textContent = "Many have tried few have succeeded !!";
parent.appendChild(welcomeMsg);

  const restartBtn = document.querySelector("#restart")
  
  canvas.style.display = 'none'
  restartBtn.style.display = 'none'
  
  // Var
  let movingUp = false
  let movingDown = false
  let movingLeft = false
  let movingRight = false
  
  //let ballSpeedX = 4;
  //let ballSpeedY = 4;
  
  //let ballAxisX = 200;
  //let ballAxisY = 200; 
  
  let ninjaXaxis = 280;
  let ninjaYaxis = 400;
  const ninjaWidth = 20;
  const ninjaHeight = 30;
  const ninjaSpeed = 8;
  // let ballRadio = 20;
  
  let gameOver = false;
  let animateId 
  
  class Ball {
    constructor(x, y, speedX, speedY, radius, color) {
      this.x = x;
      this.y = y;
      this.speedX = speedX;
      this.speedY = speedY;
      this.radius = radius;
      this.color = color;
    }

    /*// Ball
  const myBall = () => {
    ctx.beginPath();
    ctx.arc(ballAxisX, ballAxisY, ballRadio, 0, Math.PI * 2);
    ctx.fillStyle = "green"
    ctx.fill();
    ctx.closePath();
  }
  */
    createBall() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    // UPDATE
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.speedY = -this.speedY;
      }
    }

     /*// RIGH WALL    
  if (this.x > canvas.width - this.radius) {
        ballSpeedX *= - 1
    }
    
  // LEFT WALL 
  if (this.x < this.radius) {
    ballSpeedX *= - 1
  }
  // Ceiling
  if (this < this.raduis) {
    ballSpeedY *= - 1
  }
  
  // Floor
  if (this.y > canvas.height - this.radius) {
  ballSpeedY *= -1
  }
*/

  }
  
  

  // x, y, speedX, speedY, radius, color
  const balls = [
    new Ball(104, 500, 1, 10, 20, "green"),
    new Ball(300, 100, -4, -4, 10, "blue"),
    new Ball(100, 200, 3, -8, 15, "red"),
    new Ball(170, 250, 5, -5, 10, "pink"),
    new Ball(50, 23, 2, -5, 8, "lightgreen"),
  ];
  
  // Ninja
  const myNinja = () => {
    ctx.beginPath ();
    ctx.rect(ninjaXaxis, ninjaYaxis, ninjaWidth, ninjaHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    }
  
  
  
    // ANIMATION
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < balls.length; i++) {
      balls[i].createBall();
      balls[i].update();
    }

    myNinja();
    endGame();
  

 
  
  // Ninja movement  limmits
  
  if (movingLeft && ninjaXaxis > 0) {
  ninjaXaxis -= ninjaSpeed;
  } else if (movingRight && ninjaXaxis < canvas.width - ninjaWidth ) {
  ninjaXaxis += ninjaSpeed;
  } else if (movingUp && ninjaYaxis > 0) {
  ninjaYaxis -= ninjaSpeed
  } else if (movingDown && ninjaYaxis < canvas.height - ninjaHeight) {
  ninjaYaxis += ninjaSpeed
  }
  
  // Trigger Game Over
  if (gameOver) {
  cancelAnimationFrame(animateId) 
  restartBtn.style.display = 'block';
  } else {
  animateId = requestAnimationFrame(animate)
  }  
  
  }
    
  // Game ON
  const setUpGame = () => {
  canvas.style.display = 'block'
  startBtn.style.display = 'none'
  welcomeMsg.style.display = 'none'
  animate();
  }
  
  startBtn.addEventListener('click', setUpGame)

  restartBtn.addEventListener('click', () => {
    restartBtn.style.display = 'none'
    canvas.style.display = 'block'
    gameOver = false;
    ninjaXaxis = 280
    ninjaYaxis = 400
  
    setUpGame()
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
  
   const endGame = () => {
    for (let i = 0; i < balls.length; i++) {
    const distanceX = balls[i].x - (ninjaXaxis + ninjaWidth / 2);
      const distanceY = balls[i].y - (ninjaYaxis + ninjaHeight / 2);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < balls[i].radius + ninjaWidth / 2)  {
      gameOver = true;
      ctx.font = '28px sans-serif'
        ctx.fillText('NOT AS DEADLY AS YOU LOOK!!', canvas.width / 2 - 230, canvas.height / 4)
    }
  }
  }
  
  }); //MAIN FUNCTION AND FIRST EVENTLISTENER!!
  