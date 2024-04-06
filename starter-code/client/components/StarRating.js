import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`star ${rating >= index + 1 ? 'filled' : ''}`}
      onClick={() => handleStarClick(index)}
    >
      &#9733;
    </span>
  ));

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;