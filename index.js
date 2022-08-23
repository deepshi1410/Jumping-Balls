/*
Returns a drawing context on the canvas, or null if the context ID is not supported. 
A drawing context lets you draw on the canvas.
 Calling getContext with "2d" returns a CanvasRenderingContext2D object, whereas calling it with "webgl" 
 (or "experimental-webgl") returns a WebGLRenderingContext object.
 This context is only available on browsers that implement WebGL.
*/

// creating a canvas element
const canvas = document.getElementById('graphics_balls');

// getContext returns a CanvasRenderingContext2D object which lets users draw on the canvas.
const ctx = canvas.getContext('2d');

// setting width and height of canvas
var totalX = window.innerWidth;
var totalY = window.innerHeight;
canvas.width = totalX;
canvas.height = totalY;

// setting position of mouse's X and Y axes position
var positionX = 0;
var positionY = 0;

// setting gravity means speed changes with time
var grav = 1;

// adding event listener to a mousemove event type
// The clientX property returns the horizontal coordinate (according to the client area) of the mouse pointer when a mouse event was triggered.
addEventListener('mousemove', function () {
  positionX = event.clientX
  positionY = event.clientY
})
ctx.strokeWidth = 3

// function for generating random colours for balls
function random_colour() {
  return "rgba(" + Math.round(Math.random() * 250) + ", " + Math.round(Math.random() * 250) + ", "
    + Math.round(Math.random() * 250) + ", " + Math.round(Math.random() * 250) + ")"
}

// drawing balls
function balls() {
  this.color = random_colour();
  this.radius = Math.random() * 30 + 15;
  this.initialRadius = this.radius;
  this.coordX = Math.random() * (totalX - 2 * this.radius) + this.radius;
  this.coordY = Math.random() * (totalY - 2 * this.radius) + this.radius;
  this.diffX = Math.random() * 4;
  this.diffY = Math.random() * 15;
  this.velocity = Math.random() / 5;
  this.update = () => {
    ctx.beginPath();
    ctx.arc(this.coordX, this.coordY, this.radius, 0, Math.PI * 2);
    console.log('color', this.color);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

var ballsArray = []
for (let i = 0; i < 80; i++) {
  ballsArray.push(new balls());
}

function animate_balls() {
  if (totalX != window.innerWidth || totalY != window.innerHeight) {
    totalX = window.innerWidth;
    totalY = window.innerHeight;
    canvas.width = totalX;
    canvas.height = totalY;
  }
  requestAnimationFrame(animate_balls);
  // erasing the whole canvas
  ctx.clearRect(0, 0, totalX, totalY);
  for (let i = 0; i < ballsArray.length; i++) {
    ballsArray[i].update();
    ballsArray[i].coordY += ballsArray[i].diffY;
    ballsArray[i].coordX += ballsArray[i].diffX;
    if (ballsArray[i].coordY + ballsArray[i].radius >= totalY) {
      ballsArray[i].diffY = -ballsArray[i].diffY * grav;
    } else {
      ballsArray[i].diffY += ballsArray[i].velocity;
    }
    if (ballsArray[i].coordX + ballsArray[i].radius > totalX || ballsArray[i].coordX - ballsArray[i].radius < 0) {
      ballsArray[i].diffX = -ballsArray[i].diffX;
    }
    if (positionX > ballsArray[i].coordX - 20 &&
      positionX < ballsArray[i].coordX + 20 &&
      positionY > ballsArray[i].coordY - 50 &&
      positionY < ballsArray[i].coordY + 50 &&
      ballsArray[i].radius < 70) {
      //ballsArray[i].x += +1;
      ballsArray[i].radius += 5;
    } else {
      if (ballsArray[i].radius > ballsArray[i].initialRadius) {
        ballsArray[i].radius += -5;
      }
    }
  }
}

animate_balls();

setInterval(function () {
  ballsArray.push(new balls());
  ballsArray.splice(0, 1);
}, 800);




