import menuReducer from '../../reducers/menuReducer';

const getMenuAction = {
  type: 'GET_MENU',
  payload: {
    menu: [
      {
        id: 1,
        food_name: 'Dog meat',
        food_image: 'someimgurl.jpg',
        price: 1250,
      },
      {
        id: 2,
        food_name: 'Banana',
        food_image: 'someotherimgurl.jpg',
        price: 950,
      },
    ],
  },
};

describe('menu reducer', () => {
  it('should return correct state', () => {
    const state = menuReducer(undefined, getMenuAction);
    expect(state).toBeInstanceOf(Array);
    expect(state.length).toBe(2);
    expect(state[0]).toBeInstanceOf(Object);
    expect(state[1]).toEqual({
      id: 2,
      food_name: 'Banana',
      food_image: 'someotherimgurl.jpg',
      price: 950,
    });
  });
});
