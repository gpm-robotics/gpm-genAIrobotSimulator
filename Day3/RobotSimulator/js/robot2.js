const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define the robot's position
const robot = {
  x: 100,
  y: 100,
};

// Create a list of obstacles in the environment
const obstacles = [
  { x: 10, y: 10, width: 10, height: 5 },
  { x: 120, y: 50, width: 10, height: 5 },
  { x: 230, y: 130, width: 10, height: 5 },
];

// Draw the robot
function drawRobot() {
  ctx.fillStyle = 'red';
  ctx.fillRect(robot.x, robot.y, 10, 5);
}

// Draw the obstacles
function drawObstacles() {
  for (const obstacle of obstacles) {
    ctx.fillStyle = 'black';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
}

// Check if the robot is colliding with an obstacle
function isCollidingWithObstacle(robot, obstacle) {
  return robot.x < obstacle.x + obstacle.width &&
    robot.x + robot.width > obstacle.x &&
    robot.y < obstacle.y + obstacle.height &&
    robot.y + robot.height > obstacle.y;
}

// Update the robot's position
function updateRobot(event) {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the robot based on the arrow keys
  if (event && event.key === 'ArrowUp') {
    robot.y -= 1;
  } else if (event && event.key === 'ArrowDown') {
    robot.y += 1;
  } else if (event && event.key === 'ArrowLeft') {
    robot.x -= 1;
  } else if (event && event.key === 'ArrowRight') {
    robot.x += 1;
  }

  // Keep the robot within the bounds of the canvas
  if (robot.x < 0) {
    robot.x = 0;
  } else if (robot.x > canvas.width) {
    robot.x = canvas.width;
  }

  if (robot.y < 0) {
    robot.y = 0;
  } else if (robot.y > canvas.height) {
    robot.y = canvas.height;
  }


// Draw the obstacles
for (const obstacle of obstacles) {
  ctx.fillStyle = 'black';
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}
  // Check for collisions with obstacles
  for (const obstacle of obstacles) {
    if (isCollidingWithObstacle(robot, obstacle)) {
      // Stop the robot
      robot.x = robot.x;
      robot.y = robot.y;
      break;
    }
  }

  // Draw the robot and obstacles
  drawRobot();
  drawObstacles();
}

// Start the animation loop
function animate() {
  updateRobot();

  requestAnimationFrame(animate);
}

animate();

// Add an event listener to the document to detect keyboard events
document.addEventListener('keydown', function(event) {
  event.preventDefault();
  updateRobot(event);
});