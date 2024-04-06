import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'

// ...

{stars.map((star, index) => {
  return (
    <FontAwesomeIcon 
      key={index} 
      icon={star <= rating ? fasStar : farStar} 
      className={`star ${star <= rating ? 'filled' : ''}`} 
      onClick={() => handleStarClick(index)}
    />
  );
})}