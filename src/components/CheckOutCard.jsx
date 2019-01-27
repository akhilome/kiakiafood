import React from 'react';
import PropTypes from 'prop-types';

const CheckOutCard = ({
  id = 0, foodName = '', foodPrice = 0, buttonCallback,
}) => (
  <div data-foodid={id} className="food-card-checkout">
    <div className="food-card-checkout__details">
      <h4>{foodName}</h4>
      <p>
₦
        {foodPrice}
      </p>
    </div>
    <button type="button" onClick={buttonCallback}>
      Remove
    </button>
  </div>
);

CheckOutCard.propTypes = {
  id: PropTypes.number.isRequired,
  foodName: PropTypes.string.isRequired,
  foodPrice: PropTypes.number.isRequired,
  buttonCallback: PropTypes.func.isRequired,
};

export default CheckOutCard;
