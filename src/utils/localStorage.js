export const saveToken = (token) => {
  window.localStorage.setItem('kiakiafoodToken', token);
};

export const getToken = () => window.localStorage.getItem('kiakiafoodToken') || '';
export const removeToken = () => window.localStorage.removeItem('kiakiafoodToken');
export const getCartItems = () => JSON.parse(window.localStorage.getItem('cart')) || {};
export const updateCartItems = updatedCart => window.localStorage.setItem('cart', JSON.stringify(updatedCart));
export const clearCartItems = () => window.localStorage.removeItem('cart');
