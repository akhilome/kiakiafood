import React from 'react';
import PropTypes from 'prop-types';

const OrderCard = ({
  foodItems, orderPrice, date, orderStatus, cancelOrderCallback,
}) => {
  const formattedFoodNames = foodItems.map(foodName => (
    <p key={Math.random() * foodItems.length * 12039}>{foodName}</p>
  ));
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
        <div className="order-card_food-items_names">{formattedFoodNames}</div>
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
      <div>
        <div className={`order-status order-status-${status}`} />
        <div className="cancel-order">
          <button className="small" type="button" onClick={cancelOrderCallback}>
            cancel order
          </button>
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  foodItems: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
  orderPrice: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
  cancelOrderCallback: PropTypes.func.isRequired,
};

export default OrderCard;
