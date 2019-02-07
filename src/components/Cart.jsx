import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CheckOutCard from './CheckOutCard';
import { removeFromCart, checkout } from '../actions';

class Cart extends Component {
  onCheckoutClick = async () => {
    const { cart, checkout: placeOrder, history } = this.props;
    const foodItems = Object.keys(cart).map(Number);
    await placeOrder(foodItems);
    const {
      fetching: { fetching, errorMessage },
    } = this.props;
    if (!fetching && !errorMessage) return history.push('/order-history');
    return undefined;
  };

  onRemoveClick = (foodId) => {
    const { removeFromCart: removeItemFromCart } = this.props;
    removeItemFromCart(foodId);
  };

  render() {
    const { cart } = this.props;

    const cartItems = Object.keys(cart)
      .map(Number)
      .map(item => ({
        id: item,
        foodName: cart[item].foodName,
        foodPrice: cart[item].foodPrice,
      }));

    return (
      <div className="wrapper">
        <h2>Items To Be Purchased</h2>
        {cartItems.length ? (
          <Fragment>
            <section className="container checkout">
              {cartItems.map(item => (
                <CheckOutCard
                  key={item.id}
                  id={item.id}
                  foodName={item.foodName}
                  foodPrice={item.foodPrice}
                  buttonCallback={() => this.onRemoveClick(item.id)}
                />
              ))}
            </section>
            <div className="order-price">
              <p>
                <strong>total price</strong>
: ₦
                <span id="order-price">
                  {cartItems
                    .map(item => item.foodPrice)
                    .reduce((a, b) => a + b)
                    .toLocaleString()}
                </span>
              </p>
            </div>
            <button
              type="button"
              className="btn-primary"
              id="checkout"
              onClick={this.onCheckoutClick}
            >
              Checkout
            </button>
          </Fragment>
        ) : (
          <section className="container checkout">
            <div>No Items in cart</div>
          </section>
        )}
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.instanceOf(Object).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  fetching: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart,
  fetching: state.fetching,
});

export default connect(
  mapStateToProps,
  { removeFromCart, checkout },
)(Cart);
