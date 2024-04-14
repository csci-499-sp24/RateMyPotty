import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const StarRating = () => {
  // Creates state variable to hold current rating
  const [rating, setRating] = useState(0);
  const clicked = useState(false);

  let rated = false;
  // Defines a function to handle click events on the stars
  const handleClick = (rate) => {
    // When star is clicked, update the rating state variable
    setRating(rate);
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                  if (!rated) {
                    handleClick(ratingValue);
                    rated = true;
                  }
              }
              }
              style={{ display: 'none' }}
            />
            <FontAwesomeIcon
              icon={ratingValue <= rating ? solidStar : regularStar}
              color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
              size="2x"
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;