import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderCard from './OrderCard';
import { getUserOrderHistory } from '../actions';

export class OrderHistory extends Component {
  async componentDidMount() {
    const { getUserOrderHistory: getOrderHistory } = this.props;
    await getOrderHistory();
  }

  render() {
    const { orders } = this.props;

    return (
      <div className="wrapper">
        <section className="container order-history">
          {orders.map(order => (
            <OrderCard
              foodItems={order.items}
              orderPrice={order.price}
              orderStatus={order.status}
              date={order.date}
            />
          ))}
        </section>
      </div>
    );
  }
}

OrderHistory.propTypes = {
  getUserOrderHistory: PropTypes.func.isRequired,
  orders: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders.history,
});

export default connect(
  mapStateToProps,
  { getUserOrderHistory },
)(OrderHistory);
