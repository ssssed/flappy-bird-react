import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import appstore from '../store/appstore';
import '../styless/game.scss';
import bgImage from '../assets/bg.png';
import fgImage from '../assets/fg.png';
import birdImage from '../assets/bird.png';
import pipeNorthImage from '../assets/pipeNorth.png';
import pipeSouthImage from '../assets/pipeSouth.png';
import jumpSound from '../assets/fly.mp3';
import scoreSound from '../assets/score.mp3';
import { updateUserScore } from '../utils/Api';

const canvasWidth = 288;
const canvasHeight = 512;

let birdX = 30;
let birdY = 150;

const FlappyBird = observer(() => {
  const canvasRef = useRef(null);
  const bgRef = useRef(null);
  const fgRef = useRef(null);
  const birdRef = useRef(null);
  const pipeNorthRef = useRef(null);
  const pipeSouthRef = useRef(null);
  const jumpSoundRef = useRef(null);
  const scoreSoundRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let paused = false;
    let pipes = [{ x: canvasWidth, y: -100 }];
    birdX = 30;
    birdY = 150;
    const gap = 120;
    const gravity = 0.9;
    let score = 0;
    let jump = 25;

    const bg = bgRef.current;
    const pipeNorth = pipeNorthRef.current;
    const pipeSouth = pipeSouthRef.current;
    const fg = fgRef.current;
    const bird = birdRef.current;

    const jumpAudio = jumpSoundRef.current;
    const scoreAudio = scoreSoundRef.current;

    const moveUp = (evt) => {
      console.log(window);
      if (evt.key == ' ' || evt.type == 'click') {
        jumpAudio.play();
        birdY += 1;
        birdY *= 0.9;
      }
    };

    const togglePause = (e) => {
      if (e.key === 'Escape') {
        paused = !paused;
        render();
      }
    };

    document.addEventListener('click', moveUp);
    document.addEventListener('keydown', moveUp);
    document.addEventListener('keydown', togglePause);
    const render = () => {
      context.drawImage(bg, 0, 0);
      for (let i = 0; i < pipes.length; i++) {
        context.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        context.drawImage(
          pipeSouth,
          pipes[i].x,
          pipes[i].y + pipeNorth.height + gap
        );
        pipes[i].x--;
        if (pipes[i].x === 100) {
          pipes.push({
            x: canvasWidth + 100,
            y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
          });
        }

        if (
          (birdX + bird.width >= pipes[i].x &&
            birdX <= pipes[i].x + pipeNorth.width &&
            (birdY <= pipes[i].y + pipeNorth.height ||
              birdY + bird.height >= pipes[i].y + pipeNorth.height + gap)) ||
          birdY + bird.height >= canvasHeight - fg.height
        ) {
          appstore.setLastScore(score);
          appstore.open();
          paused = true;
          updateUserScore(localStorage.getItem('userId'), [score]);
        }

        if (pipes[i].x === 0) {
          scoreAudio.play();
          score++;
        }
      }

      if (pipes[0].x + pipeNorth.width === 0) {
        pipes.shift();
      }

      context.drawImage(fg, 0, canvasHeight - fg.height);
      context.drawImage(bird, birdX, birdY);

      birdY += gravity;

      context.fillStyle = '#000';
      context.font = '20px Verdana';
      context.fillText('Score : ' + score, 10, canvasHeight - 20);
      if (!paused) requestAnimationFrame(render);
    };

    render();
    return () => {
      document.removeEventListener('click', moveUp);
      document.removeEventListener('keydown', moveUp);
      document.removeEventListener('keydown', togglePause);
    };
  }, [appstore.isStart]);

  return (
    <div className='canvas-game'>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
      <img ref={bgRef} src={bgImage} alt='bg' hidden />
      <img ref={fgRef} src={fgImage} alt='fg' hidden />
      <img ref={birdRef} src={birdImage} alt='bird' hidden />
      <img ref={pipeNorthRef} src={pipeNorthImage} alt='pipeNorth' hidden />
      <img ref={pipeSouthRef} src={pipeSouthImage} alt='pipeSouth' hidden />
      <audio ref={jumpSoundRef} src={jumpSound} hidden />
      <audio ref={scoreSoundRef} src={scoreSound} hidden />
    </div>
  );
});

export default FlappyBird;
