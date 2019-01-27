import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FoodCard from './FoodCard';
import { getMenu, addToCart } from '../actions';

export class MenuPage extends Component {
  componentDidMount() {
    const { getMenu: getFoodMenu } = this.props;
    getFoodMenu();
  }

  onButtonClick(foodId, foodName, foodPrice) {
    const { isLoggedIn, history, addToCart: addFoodToCart } = this.props;
    if (!isLoggedIn) return history.push('/login');
    const foodDetails = { foodId, foodName, foodPrice };
    addFoodToCart(foodDetails);
    return undefined;
  }

  render() {
    const { menu: foods } = this.props;
    return (
      <div className="wrapper">
        <h2>Available Food Items</h2>
        <section className="container food-menu">
          {foods.map(food => (
            <FoodCard
              key={food.id}
              foodImage={food.food_image}
              foodName={food.food_name}
              foodPrice={food.price}
              id={food.id}
              isAdmin={false}
              buttonCallback={() => this.onButtonClick(food.id, food.food_name, food.price)}
            />
          ))}
        </section>
      </div>
    );
  }
}

MenuPage.defaultProps = {
  isLoggedIn: false,
};

MenuPage.propTypes = {
  getMenu: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  menu: PropTypes.instanceOf(Array).isRequired,
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  menu: state.menu,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(
  mapStateToProps,
  { getMenu, addToCart },
)(MenuPage);
