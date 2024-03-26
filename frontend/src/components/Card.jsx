import React from 'react';

function Card({ title, imgSRC, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={imgSRC} alt={title} />
      <h2>{title}</h2>
    </div>
  );
}

export default Card;
