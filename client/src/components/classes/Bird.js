class Bird {
  constructor(
    ctx,
    image,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    BIRD_HEIGHT,
    BIRD_WIDTH
  ) {
    this.x = CANVAS_WIDTH / 2 - BIRD_WIDTH / 2;
    this.CANVAS_HEIGHT = CANVAS_HEIGHT;
    this.CANVAS_WIDTH = CANVAS_WIDTH;
    this.y = CANVAS_HEIGHT / 2 - BIRD_HEIGHT / 2;
    this.vy = 0;
    this.width = BIRD_WIDTH;
    this.height = BIRD_HEIGHT;
    this.weight = 1;
    this.ctx = ctx;
    this.image = image;
  }
  update(angle) {
    let curve = Math.sin(angle) * 15;
    if (this.y > this.CANVAS_HEIGHT - this.height * 2 + curve) {
      this.y = this.CANVAS_HEIGHT - this.height * 2 + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
    }
    if (window.GAMEisClicked && this.y > this.height * 2) this.jump();
  }

  jump() {
    this.vy -= 2;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Bird;
