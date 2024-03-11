////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(197,140,121);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150,480, 200,15,{isStatic: true, angle: angle} )
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle = angle + angleSpeed;
  fill(212,175,55);
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);

}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  fill(255,255,0)

  for(var i = 0; i < birds.length; i++){
      drawVertices(birds[i].vertices);

      if (isOffScreen(birds[i])){
        removeFromWorld(boxes[i]);
        birds.splice(i,1);
        i--;

      }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  for (let i = 0; i < 6; i++) {
    boxes[i] = new Array(3);
    colors[i] = new Array(3);
    for (let j = 0; j < 3; j++) {
        //console.log("j:", j)
        boxes[i][j] = Matter.Bodies.rectangle(700 - (j * 80), 540 - (i * 80), 80, 80, { isStatic: false })
        colors[i][j] = random(255)
        World.add(engine.world, [boxes[i][j]])

     
    }
}

//console.log(boxes)
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
  push();
  score = 0;
  for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
          fill(0, colors[i][j], 0)
          drawVertices(boxes[i][j].vertices)
        
          if(isOffScreen(boxes[i][j])){
          
            score = score + 1;     
       } 
    }   
  }
  pop()  
}

////////////////////////////////////////////////////////////////
function setupSlingshot(){
  //your code here
  slingshotBird = Bodies.circle(250, 250, 20, {friction: 0,
    restitution: 0.95 });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);

  slingshotConstraint = Constraint.create({
    pointA: { x:250, y:230 },
    bodyB: slingshotBird,
    pointB: { x: 0, y: 0 },
    //length: 10,
    stiffness: 0.01,
    damping: 0.0001
  });

  World.add(engine.world, [slingshotBird, slingshotConstraint]);

}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(255,0,255)
  drawVertices(slingshotBird.vertices);
  fill(0,255,255)
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

