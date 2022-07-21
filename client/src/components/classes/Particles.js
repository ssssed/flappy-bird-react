const particlesArray = [];

class Particle {
  constructor(bird, gameSpeed, ctx, color, image) {
    this.image = image;
    this.x = bird.x;
    this.y = bird.y + bird.width / 2;
    this.ctx = ctx;
    this.gameSpeed = gameSpeed;
    this.size = Math.random() * 7 + 3;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = color;
  }
  update() {
    this.x -= this.gameSpeed;
    this.y += this.speedY;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

export default function handleParticles(bird, gameSpeed, ctx, color, image) {
  particlesArray.unshift(new Particle(bird, gameSpeed, ctx, color, image));
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  if (particlesArray.length > 200) {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray.pop(particlesArray[i]);
    }
  }
}
