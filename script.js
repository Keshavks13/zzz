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

// Add Walls (Boundaries)
const walls = [
  Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 10, { isStatic: true }),
  Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 10, { isStatic: true }),
  Bodies.rectangle(0, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true }),
  Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true })
];
World.add(world, walls);

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
}

// Spawn Random Balls Quickly
setInterval(() => {
  const x = Math.random() * window.innerWidth;
  const y = 0;
  const radius = Math.random() * 20 + 10;
  addBall(x, y, radius);
}, 20); // Balls spawn every 100ms (0.1 seconds)

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

// Clear Balls Logic
const clearBallsButton = document.getElementById('clear-balls-btn');
clearBallsButton.addEventListener('click', () => {
  // Remove all non-static bodies from the world
  const balls = world.bodies.filter(body => !body.isStatic);
  balls.forEach(ball => World.remove(world, ball));
});

// Handle Window Resize
window.addEventListener('resize', () => {
  render.options.width = window.innerWidth;
  render.options.height = window.innerHeight;

  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: window.innerWidth, y: window.innerHeight }
  });
});
