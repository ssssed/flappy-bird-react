import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import appstore from '../../store/appstore';
import '../../styless/gameover.scss';

const GameOver = observer(() => {
  const navigate = useNavigate();
  const handleRestartGame = () => {
    navigate('/');
    appstore.close();
    appstore.toggleStart(false);
    // window.location.reload();
  };
  return (
    <div className={`gameover ${appstore.isOpen ? '' : 'hidden'}`}>
      <h2 className='gameover__title'>Вы проиграли</h2>
      <p className='gameover__score'>{`Ваш счет: ${appstore.lastScore}`}</p>
      <button onClick={handleRestartGame} className='gameover__reset'>
        Начать сначала!
      </button>
    </div>
  );
});

export default GameOver;
