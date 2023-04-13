window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas")
  const ctx = canvas.getContext("2d");
  const startBtn = document.querySelector("#start")

  const message = document.querySelector("#welcome");
  const welcomeMsg = document.createElement("p");
  welcomeMsg.innerText = "Show us those killer steps!!";
  message.appendChild(welcomeMsg)

  // CSS IN CASE U MAKE IT WORK
  //const impressiveText = document.createElement("p");
  //impressiveText.innerText = "IMPRESSIVE, YOU ARE A SHADOW WARRIOR!";
  //impressiveText.classList.add("winText");
  //message.appendChild(impressiveText);

  //const deadText = document.createElement("p");
  //deadText.innerText = 'NOT AS DEADLY AS YOU LOOK!!';
  //deadText.classList.add("winText");
  //message.appendChild(impressiveText);


 
  const restartBtn = document.querySelector("#restart")
  const chrono = document.querySelector("#chrono")
  const score = document.querySelector("#score")

  const ninjaTempel = new Image() 
  ninjaTempel.src ='./img/back.jpg'
  const ninjaImg = new Image()
  ninjaImg.src ='./img/ninjaB.png'
  

  chrono.style.display = 'none'
  canvas.style.display = 'none'
  restartBtn.style.display = 'none'
  score.style.display = 'none'
  //impressiveText.style.display = 'none'
  
  // Var
  let movingUp = false
  let movingDown = false
  let movingLeft = false
  let movingRight = false
  
  let ninjaXaxis = 280
  let ninjaYaxis = 400
  const ninjaWidth = 30
  const ninjaHeight = 50
  const ninjaSpeed = 8

  let gameOver = false
  let animateId 

  let minutes = 0
  let seconds = 0
  let playerScore = 0

  class Ball {
    constructor(x, y, speedX, speedY, radius, color) {
      this.x = x;
      this.y = y;
      this.speedX = speedX
      this.speedY = speedY
      this.radius = radius
      this.color = color
    }

    createBall() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = this.color;
      ctx.fill()
      ctx.closePath()
    }
  
  
    update() {
      this.x += this.speedX
      this.y += this.speedY
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.speedX = -this.speedX
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.speedY = -this.speedY
      }
    } 
  }
  
        // x, y, speedX, speedY, radius, color
        const balls = [
          new Ball(104, 500, 1, 10, 20, "green"),
          new Ball(300, 100, -4, -4, 10, "blue"),
          new Ball(200, 200, 3, -8, 15, "red"),
          new Ball(580, 600, 7, -5, 10, "pink"),
          new Ball(50, 23, 1, -5, 8, "lightgreen"),
          new Ball(400, 700, 1, 5, 20, "yellow"),
          new Ball(500, 700, -1, 7, 12, "lightblue")
        ];
  
  
  // Ninja
  const myNinja = () => {
    ctx.beginPath ();
    ctx.drawImage(ninjaImg, ninjaXaxis, ninjaYaxis, ninjaWidth, ninjaHeight);
    ctx.fillStyle = "black"
    ctx.fill()
    ctx.closePath()
    }

    // Game Timer & Score && Winning Condition
  const startTimer = () => {
    timerInterval = setInterval(() => {
      if (gameOver === false){
      seconds++
      if (seconds === 60) {
        minutes++
        seconds = 0
      }
    }
      chrono.innerText = `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;

      if(gameOver === false && seconds % 3 === 0) {
        playerScore += 5
        score.innerText = playerScore
      }

      if (seconds === 45) {
        gameOver = true
        ctx.font = '23px sans-serif'
        ctx.fillText('IMPRESSIVE, YOU ARE THE SHADOW WARRIOR!', canvas.width / 2 - 280, canvas.height / 4)
        //impressiveText.style.display = 'block'
        
      }
    }, 1000);
  } 
/* josh wrotte u in the chat for styling this!!! You should be able to do .classList.add and give them a class name
 and then you will also read the threads on uploading images seems to be full of problems*/
  
  
    // ANIMATION
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(ninjaTempel, 0, 0, canvas.width, canvas.height);
    


    for (let i = 0; i < balls.length; i++) {
      balls[i].createBall()
      balls[i].update()
    }

    myNinja();
    endGame();
    

  // Ninja movement  limmits
  
  if (movingLeft && ninjaXaxis > 0) {
  ninjaXaxis -= ninjaSpeed
  } else if (movingRight && ninjaXaxis < canvas.width - ninjaWidth ) {
  ninjaXaxis += ninjaSpeed
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
  }}
    
  // Game ON
  const setUpGame = () => {
  canvas.style.display = 'block'
  chrono.style.display = 'block'
  score.style.display = 'block'
  startBtn.style.display = 'none'
  welcomeMsg.style.display = 'none'
  //impressiveText.style.display = 'none'
  startTimer();
  animate();
  }
  
  startBtn.addEventListener('click', setUpGame)
  
  restartBtn.addEventListener('click', () => {
    clearInterval(timerInterval)
    minutes = 0
    seconds = 0
    chrono.innerText = '00:00'
    score.innerText = '0'

    restartBtn.style.display = 'none'
    canvas.style.display = 'block'
    gameOver = false;
    ninjaXaxis = 280
    ninjaYaxis = 400
    balls
    
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

   // GAME OVER CONDITIONS
  
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
  }); 
  