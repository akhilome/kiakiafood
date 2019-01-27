export const saveToken = (token) => {
  window.localStorage.setItem('kiakiafoodToken', token);
};

export const getToken = () => window.localStorage.getItem('kiakiafoodToken') || '';
export const removeToken = () => window.localStorage.removeItem('kiakiafoodToken');
