import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styless/gameover.css';

const GameOver = ({ isOpen, score, setOpen }) => {
  const navigate = useNavigate();
  const handleRestartGame = () => {
    setOpen(false);
    navigate('/');
    window.location.reload();
  };
  return (
    <div className={`gameover ${isOpen ? '' : 'hidden'}`}>
      <h2 className='gameover__title'>Вы проиграли</h2>
      <p className='gameover__score'>{`Ваш счет: ${score}`}</p>
      <button onClick={handleRestartGame} className='gameover__reset'>
        Начать сначала!
      </button>
    </div>
  );
};

export default GameOver;
