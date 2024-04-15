import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import RatingApi from '../pages/api/starrating';

const StarRating = ({Bathroom}) => {
  // Creates state variable to hold current rating
  const originalRating = Bathroom.AverageRating === null ? 0 : Math.round(Bathroom.AverageRating);

  const [rating, setRating] = useState(originalRating);
  const clicked = useState(false);

  let rated = false;
  // Defines a function to handle click events on the stars
  const handleClick = async (rate) => {
    // When star is clicked, update the rating state variable
    setRating(rate);
    try {
      const response = await RatingApi.put(`/${Bathroom.BathroomID}`, {
        rating: rate
      });
    }
    catch (err) {
      console.log(err);
    }
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