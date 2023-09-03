const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define the robot's position
let x = 100;
let y = 100;

// Draw the robot
function drawRobot() {
  ctx.fillStyle = 'red';
  ctx.fillRect(x, y, 10, 10);
}

// Update the robot's position
function updateRobot(event) {
  // Move the robot based on the arrow keys
  if (event && event.key === 'ArrowUp') {
    y -= 1;
  } else if (event && event.key === 'ArrowDown') {
    y += 1;
  } else if (event && event.key === 'ArrowLeft') {
    x -= 1;
  } else if (event && event.key === 'ArrowRight') {
    x += 1;
  }

  // Keep the robot within the bounds of the canvas
  if (x < 0) {
    x = 0;
  } else if (x > canvas.width) {
    x = canvas.width;
  }

  if (y < 0) {
    y = 0;
  } else if (y > canvas.height) {
    y = canvas.height;
  }
}

// Start the animation loop
function animate() {
  updateRobot();
  drawRobot();

  requestAnimationFrame(animate);
}

animate();

// Add an event listener to the canvas element to detect keyboard events
document.addEventListener('keydown', function(event) {
  updateRobot(event);
});