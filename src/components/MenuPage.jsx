import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Nav from './Nav';
import FoodCard from './FoodCard';
import { getMenu } from '../actions';

export class MenuPage extends Component {
  componentDidMount() {
    const { getMenu: getFoodMenu } = this.props;
    getFoodMenu();
  }

  render() {
    const { menu: foods } = this.props;
    return (
      <Fragment>
        <Nav />
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
              />
            ))}
          </section>
        </div>
      </Fragment>
    );
  }
}

MenuPage.propTypes = {
  getMenu: PropTypes.func.isRequired,
  menu: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu,
});

export default connect(
  mapStateToProps,
  { getMenu },
)(MenuPage);
