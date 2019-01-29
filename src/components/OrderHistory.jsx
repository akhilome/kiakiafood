import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderCard from './OrderCard';
import { getUserOrderHistory, cancelOrder } from '../actions';

export class OrderHistory extends Component {
  async componentDidMount() {
    const { getUserOrderHistory: getOrderHistory } = this.props;
    await getOrderHistory();
  }

  onCancelOrder = async (orderId) => {
    const { cancelOrder: deleteOrder } = this.props;
    await deleteOrder(Number(orderId));
  };

  render() {
    const { orders } = this.props;

    return (
      <div className="wrapper">
        <section className="container order-history">
          {orders.length ? (
            orders.map(order => (
              <OrderCard
                key={order.id}
                foodItems={order.items}
                orderPrice={order.price}
                orderStatus={order.status}
                date={order.date}
                cancelOrderCallback={() => this.onCancelOrder(order.id)}
              />
            ))
          ) : (
            <h2>No Orders Yet!</h2>
          )}
        </section>
      </div>
    );
  }
}

OrderHistory.propTypes = {
  getUserOrderHistory: PropTypes.func.isRequired,
  orders: PropTypes.instanceOf(Array).isRequired,
  cancelOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders.history,
});

export default connect(
  mapStateToProps,
  { getUserOrderHistory, cancelOrder },
)(OrderHistory);
