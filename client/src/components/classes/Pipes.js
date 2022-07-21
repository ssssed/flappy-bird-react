class Pipe {
  constructor(
    ctx,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    bottom_image,
    top_image,
    gameSpeed,
    sound
  ) {
    this.top = (Math.random() * CANVAS_HEIGHT) / 3 + 38;
    this.bottom = (Math.random() * CANVAS_HEIGHT) / 3 + 38;
    this.x = CANVAS_WIDTH;
    this.CANVAS_HEIGHT = CANVAS_HEIGHT;
    this.width = 60;
    this.ctx = ctx;
    this.bottom_image = bottom_image;
    this.top_image = top_image;
    this.gameSpeed = gameSpeed;
    this.counted = false;
    this.sound = sound;
  }

  draw() {
    this.ctx.drawImage(this.top_image, this.x, 0, this.width, this.top);
    this.ctx.drawImage(
      this.bottom_image,
      this.x,
      this.CANVAS_HEIGHT - this.bottom,
      this.width,
      this.bottom
    );
  }

  update(birdX) {
    this.x -= this.gameSpeed * 2;
    if (!this.counted && this.x < birdX) {
      window.GAME_SCORE++;
      if (this.sound) this.sound.play();
      this.counted = true;
    }
    this.draw();
  }
}

export default function handlePipes(
  frame,
  ctx,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  bottom_image,
  top_image,
  gameSpeed,
  birdX,
  pipesArray,
  sound
) {
  if (frame % 100 === 0 && frame > 0) {
    pipesArray.unshift(
      new Pipe(
        ctx,
        CANVAS_HEIGHT,
        CANVAS_WIDTH,
        bottom_image,
        top_image,
        gameSpeed,
        sound
      )
    );
  }
  for (let i = 0; i < pipesArray.length; i++) {
    pipesArray[i].update(birdX);
  }
  if (pipesArray.length > 20) {
    pipesArray.pop(pipesArray[0]);
  }
}

export function handleCollision(bird, CANVAS_HEIGHT, pipesArray) {
  for (var i = 0; i < pipesArray.length; i++) {
    if (
      bird.x < pipesArray[i].x + pipesArray[i].width &&
      bird.x + bird.width > pipesArray[i].x &&
      ((bird.y < 0 + pipesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y + bird.height > CANVAS_HEIGHT - pipesArray[i].bottom &&
          bird.y + bird.height < CANVAS_HEIGHT))
    ) {
      return true;
    }
  }
}
