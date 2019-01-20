import React from 'react';
import PropTypes from 'prop-types';

const FoodCard = ({
  foodImage, foodName, id, foodPrice, isAdmin,
}) => (
  <div className="food-card">
    <img className="food-image" src={foodImage} alt={foodName} />
    <div className="food-details">
      <div data-foodid={id} className="food-details__legend">
        <h4>{foodName}</h4>
        <p>
₦
          {foodPrice.toLocaleString()}
        </p>
      </div>
      <div className="food-details__action">
        <button type="button">{isAdmin ? 'delete' : 'buy'}</button>
      </div>
    </div>
  </div>
);

FoodCard.propTypes = {
  foodImage: PropTypes.string.isRequired,
  foodName: PropTypes.string.isRequired,
  foodPrice: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default FoodCard;
