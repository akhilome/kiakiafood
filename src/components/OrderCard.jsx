import React from 'react';
import PropTypes from 'prop-types';

const OrderCard = ({
  foodItems, orderPrice, date, orderStatus,
}) => {
  let status;
  switch (orderStatus) {
    case 'processing':
      status = 'progress';
      break;
    case 'cancelled':
      status = 'rejected';
      break;
    case 'complete':
      status = 'completed';
      break;
    default:
      status = 'new';
  }
  return (
    <div className="order-card">
      <div className="order-card_food-items">
        <h3>Food Item(s)</h3>
        <div className="order-card_food-items_names">
          {foodItems.map(foodName => (
            <p>{foodName}</p>
          ))}
        </div>
      </div>
      <div className="order-card_price">
        <p>
          <strong>price:</strong>
        </p>
        <p>
₦
          {orderPrice.toLocaleString()}
        </p>
      </div>
      <div className="order-card_date">
        <p>
          <strong>date:</strong>
        </p>
        <p>
          {date
            .split('T')[0]
            .split('-')
            .reverse()
            .join('/')}
        </p>
      </div>
      <div className={`order-status-${status}`} />
    </div>
  );
};

OrderCard.propTypes = {
  foodItems: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
  orderPrice: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
};

export default OrderCard;
