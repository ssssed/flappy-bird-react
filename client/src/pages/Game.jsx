import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import appstore from '../store/appstore';
import '../styless/game.scss';
import bg from '../assets/bg.png';
import fg from '../assets/fg.png';
import birdImage from '../assets/bird.png';
import pipeNorthImage from '../assets/pipeNorth.png';
import pipeSouthImage from '../assets/pipeSouth.png';
import scoreSound from '../assets/score.mp3';
import deathSound from '../assets/die.mp3';
import handleParticles from '../components/classes/Particles';
import handlePipes, { handleCollision } from '../components/classes/Pipes';
import { updateUserScore } from '../utils/Api';
import Bird from '../components/classes/Bird';

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 400;

const BIRD_HEIGHT = 30;
const BIRD_WIDTH = 40;

const Game = observer(() => {
  const canvasRef = useRef(null);
  const birdRef = useRef(null);
  const topPipeRef = useRef(null);
  const bottomPipeRef = useRef(null);
  const bgRef = useRef(null);
  const deathSoundRef = useRef(null);
  const scoreSoundRef = useRef(null);
  const fgRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    // ЗАДНИЙ ФОН
    const bgI = bgRef.current;
    // ПТИЦА
    const birdI = birdRef.current;
    // ПТИЦА СКИН 1
    let game_skin = birdI;
    // ТРУБА ВЕРХНЯЯ
    const pipeTopI = topPipeRef.current;
    // ТРУБА НИЖНЯЯ
    const bottomPipeI = bottomPipeRef.current;
    let angle = 0;
    let frame = 50;
    window.GAME_SCORE = 0;
    let pipesArray = [];
    // ЗВУК СМЕРТИ
    let deathSoundMP = deathSoundRef.current;
    // ЗВУК ПОИНТА
    let scoreSoundMP = scoreSoundRef.current;

    const bird = new Bird(
      ctx,
      game_skin,
      CANVAS_HEIGHT,
      CANVAS_WIDTH,
      BIRD_HEIGHT,
      BIRD_WIDTH
    );

    function toggleSpaceClick(e) {
      if (e.code === 'Space') {
        window.GAMEisClicked = window.GAMEisClicked ? false : true;
      }
    }

    function toggleMouseClick(e) {
      window.GAMEisClicked = window.GAMEisClicked ? false : true;
    }

    document.addEventListener('keydown', toggleSpaceClick);
    document.addEventListener('keyup', toggleSpaceClick);
    document.addEventListener('mousedown', toggleMouseClick);
    document.addEventListener('mouseup', toggleMouseClick);
    document.addEventListener('touchstart', toggleMouseClick);
    document.addEventListener('touchend', toggleMouseClick);
    (function render() {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(bgI, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      bird.update(false, angle);
      bird.draw();
      handlePipes(
        frame,
        ctx,
        CANVAS_HEIGHT,
        CANVAS_WIDTH,
        bottomPipeI,
        pipeTopI,
        2,
        bird.x,
        pipesArray,
        scoreSoundMP
      );
      handleCollision(bird, CANVAS_HEIGHT, pipesArray);
      if (handleCollision(bird, CANVAS_HEIGHT, pipesArray)) {
        if (deathSoundMP) deathSoundMP.play();
        setIsPaused(true);
        appstore.setLastScore(window.GAME_SCORE);
        appstore.open();
        updateUserScore(localStorage.getItem('userId'), [appstore.lastScore]);
        return;
      }
      if (!isPaused) requestAnimationFrame(render);
      ctx.fillStyle = 'black';
      ctx.font = '40px Montserrat';
      ctx.fillText('Score : ' + window.GAME_SCORE, 10, CANVAS_HEIGHT - 20);
      angle += 0.12;
      frame++;
    })();
    return () => {
      document.removeEventListener('keydown', toggleSpaceClick);
      document.removeEventListener('keyup', toggleSpaceClick);
      document.removeEventListener('mousedown', toggleMouseClick);
      document.removeEventListener('mouseup', toggleMouseClick);
      document.removeEventListener('touchstart', toggleMouseClick);
      document.removeEventListener('touchend', toggleMouseClick);
    };
  }, [appstore.isStart]);

  return (
    <div className='canvas-game'>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      ></canvas>
      <img ref={bgRef} src={bg} alt='bg' hidden />
      <img ref={fgRef} src={fg} alt='fg' hidden />
      <img ref={birdRef} src={birdImage} alt='bird' hidden />
      <img ref={topPipeRef} src={pipeNorthImage} alt='pipeNorth' hidden />
      <img ref={bottomPipeRef} src={pipeSouthImage} alt='pipeSouth' hidden />
      <audio ref={deathSoundRef} src={deathSound} hidden />
      <audio ref={scoreSoundRef} src={scoreSound} hidden />
    </div>
  );
});

export default Game;
