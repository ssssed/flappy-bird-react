import React from 'react';
import '../styless/managment.scss';

const Managment = () => {
  return (
    <div className='managment'>
      <h2 className='managment__title'>Управление</h2>
      <ul className='managment__list'>
        <li className='managment__item'>Пауза на кнопку ESC</li>
        <li className='managment__item'>Прыжок на SPACE и на ЛКМ</li>
      </ul>
    </div>
  );
};

export default Managment;
