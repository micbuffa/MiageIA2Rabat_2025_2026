let pursuer;
let target;
let sliderVitesseMaxCible;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pursuer = new Vehicle(random(width), random(height));
  pursuer.maxSpeed = 4;
  pursuer.maxForce = 0.2;
  target = new Target(random(width), random(height));
  target.maxSpeed = 3;
  target.maxForce = 1;
}

let oldMousePos;

function draw() {
  background(0);

  // pursuer = le véhicule poursuiveur, il vise un point devant la cible
  //let force = pursuer.pursuePerfect(target);
  let force = pursuer.pursue(target);
  pursuer.applyForce(force);

  // TODO : ne s'évader que si le poursuer est dans un cercle autour de la target
  // 1 - dessiner le cercle
  let rayonDetection = 50;
  push();
  noFill();
  stroke("white");
  circle(target.pos.x, target.pos.y, rayonDetection * 2);
  pop();

  // 2 - calculer la distance etc.
  let d = p5.Vector.dist(pursuer.pos, target.pos);
  if (d < rayonDetection) {
    target.maxSpeed = 20;
    // on est dans le cercle de détection, on s'évade
    let evadeForce = target.evade(pursuer);
    target.applyForce(evadeForce);  
  } else if (d >= (rayonDetection + 200) ) {
     target.maxSpeed = 3;
  }
  

  // déplacement et dessin du véhicule et de la target
  pursuer.update();
  pursuer.edges();
  pursuer.show();

  // lorsque la target atteint un bord du canvas elle ré-apparait de l'autre côté
  target.edges();
  // mettre en commentaire la ligne suivante
  // si cible controlée à la souris
  target.update();
  target.show();
}
