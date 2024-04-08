import React, { useState } from 'react';

const StarRating = ({ value, onChange }) => {
  const handleStarClick = (index) => {
    onChange(index + 1);
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`star ${value >= index + 1 ? 'filled' : ''}`}
      onClick={() => handleStarClick(index)}
    >
      &#9733;
    </span>
  ));

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;