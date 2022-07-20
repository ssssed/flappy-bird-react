import React from 'react';

const Score = ({ name, score }) => {
  return (
    <div className='score-table__score'>
      <span className='score-table__name'>{name}</span>
      <span className='score-table__number'>{score}</span>
    </div>
  );
};

export default Score;
