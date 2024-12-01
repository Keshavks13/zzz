ScrollTrigger.defaults({
  markers: false,
});

// Matter.js Module Aliases
const { Engine, Render, Runner, World, Bodies, Mouse, Events } = Matter;

// Create an Engine
const engine = Engine.create();
engine.world.gravity.y = 1; // Increase gravity to make balls fall faster
const { world } = engine;

// Create a Renderer
const canvasContainer = document.getElementById('canvas-container');
const render = Render.create({
  element: canvasContainer,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: '#000'
  }
});

// Run the Renderer and Engine
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Add Invisible Walls (Boundaries) to Contain Balls
const walls = [
  // Top wall (invisible boundary)
  Bodies.rectangle(window.innerWidth / 2, -5, window.innerWidth, 10, { isStatic: true, render: { visible: false } }),
  // Bottom wall (invisible boundary)
  Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 5, window.innerWidth, 10, { isStatic: true, render: { visible: false } }),
  // Left wall (invisible boundary)
  Bodies.rectangle(-5, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true, render: { visible: false } }),
  // Right wall (invisible boundary)
  Bodies.rectangle(window.innerWidth + 5, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true, render: { visible: false } })
];

World.add(world, walls);

// Ball counter to track the number of balls
let ballCount = 0;

// Add Balls
function addBall(x, y, radius) {
  const colors = ['#f39c12', '#e74c3c', '#8e44ad', '#3498db', '#2ecc71', '#f1c40f'];
  const ball = Bodies.circle(x, y, radius, {
    restitution: 0.9, // Makes balls bouncy
    friction: 0.05,   // Reduces friction for smooth motion
    render: {
      fillStyle: colors[Math.floor(Math.random() * colors.length)]
    }
  });
  World.add(world, ball);
  ballCount++; // Increment ball count
}

// Spawn Random Balls Quickly, but limit to 100 balls
setInterval(() => {
  if (ballCount < 100) { // Check if we have less than 100 balls
    const x = Math.random() * window.innerWidth;
    const y = 0;
    const radius = Math.random() * 20 + 10;
    addBall(x, y, radius);
  }
}, 20); // Balls spawn every 20ms (0.02 seconds)

// Add Mouse Interaction
const mouse = Mouse.create(render.canvas);
Events.on(engine, 'beforeUpdate', () => {
  // Track mouse movement and apply force to nearby balls
  world.bodies.forEach(body => {
    if (!body.isStatic) {
      const dx = mouse.position.x - body.position.x;
      const dy = mouse.position.y - body.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If mouse is near the ball, apply a force to it
      if (distance < 100) {
        Matter.Body.applyForce(body, body.position, {
          x: dx * 0.0005, // Adjust force strength
          y: dy * 0.0005
        });
      }
    }
  });
});

// Auto Clear Balls every 10 seconds
setInterval(() => {
  // Remove all non-static bodies from the world
  const balls = world.bodies.filter(body => !body.isStatic);
  balls.forEach(ball => {
    World.remove(world, ball);
    ballCount--; // Decrement ball count
  });
}, 20000); // Clear balls every 10 seconds

// Handle Window Resize
window.addEventListener('resize', () => {
  render.options.width = window.innerWidth;
  render.options.height = window.innerHeight;

  // Update the boundaries when resizing the window
  World.remove(world, walls);
  const updatedWalls = [
    // Top wall (invisible boundary)
    Bodies.rectangle(window.innerWidth / 2, -5, window.innerWidth, 10, { isStatic: true, render: { visible: false } }),
    // Bottom wall (invisible boundary)
    Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 5, window.innerWidth, 10, { isStatic: true, render: { visible: false } }),
    // Left wall (invisible boundary)
    Bodies.rectangle(-5, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true, render: { visible: false } }),
    // Right wall (invisible boundary)
    Bodies.rectangle(window.innerWidth + 5, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true, render: { visible: false } })
  ];
  World.add(world, updatedWalls);
});

// Add the walls initially to the world
World.add(world, walls);
