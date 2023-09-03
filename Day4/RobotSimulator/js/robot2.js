// Import the distance function from the math library
import { distance } from './math.js';

// Define the robot's position
const robot = {
  x: 100,
  y: 100,
};

// Create a grid map of the environment
const gridMap = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

// Implement the A* search algorithm
function aStarSearch(startPoint, goalPoint, environment) {
  const openList = [startPoint];
  const closedList = [];

  while (openList.length !== 0) {
    const currentCell = openList.shift();

    if (currentCell === goalPoint) {
      return reconstructPath(currentCell);
    }

    // Create a list of the current cell's neighbors
    const neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const neighborX = currentCell.x + i;
        const neighborY = currentCell.y + j;

        if (neighborX >= 0 && neighborX < environment.length && neighborY >= 0 && neighborY < environment[0].length && environment[neighborX][neighborY] !== 1) {
          neighbors.push({ x: neighborX, y: neighborY });
        }
      }
    }

    for (const neighbor of neighbors) {
      if (closedList.includes(neighbor)) {
        continue;
      }

      // Calculate the distance between the current cell and the neighbor cell
      const newCost = currentCell.cost + distance(currentCell, neighbor);
      if (!openList.includes(neighbor) || newCost < neighbor.cost) {
        neighbor.cost = newCost;
        neighbor.parent = currentCell;

        if (!openList.includes(neighbor)) {
          openList.push(neighbor);
        }
      }
    }

    closedList.push(currentCell);
  }

  return null;
}

// Reconstruct the path from the start point to the goal point
function reconstructPath(currentCell) {
  const path = [];

  while (currentCell.parent !== null) {
    path.push(currentCell);
    currentCell = currentCell.parent;
  }

  path.reverse();
  return path;
}

// Update the robot's movement to follow the path
function updateRobotMovement(path) {
  while (path.length !== 0) {
    const nextCell = path.shift();

    // Move the robot to the next cell
    robot.moveTo(nextCell);

    // Check if the robot has reached the goal point
    if (robot.position === goalPoint) {
      break;
    }
  }
}

// Draw the robot
function drawRobot() {
  ctx.fillStyle = 'red';
  ctx.fillRect(robot.x, robot.y, 10, 10);
}

// Draw the grid map
function drawGridMap() {
  for (let i = 0; i < gridMap.length; i++) {
    for (let j = 0; j < gridMap[i].length; j++) {
      if (gridMap[i][j] === 1) {
        ctx.fillStyle = 'black';
        ctx.fillRect(i * 10, j * 10, 10, 10);
      }
    }
  }
}



// Start the animation loop
function animate() {
  // Update the robot's movement
  updateRobotMovement(path);

  // Draw the robot and grid map
  drawRobot();
  drawGridMap();

  requestAnimationFrame(animate);
}

// Set the start and goal points
const startPoint = { x: 0, y: 0 };
const goalPoint = { x: 4, y: 4 };

// Find the path from the start point to the goal point
const path = aStarSearch(startPoint, goalPoint, gridMap);

// Start the animation loop
animate();
