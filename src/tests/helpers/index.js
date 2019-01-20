/*
  Credit: https://github.com/twclark0/react-enzyme-jest
*/
export const updateInput = (wrapper, instance, newValue) => {
  const input = wrapper.find(instance);
  input.simulate('change', {
    target: { value: newValue },
  });
};

export const placeholder = {};
