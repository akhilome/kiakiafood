export const saveToken = (token) => {
  window.localStorage.setItem('kiakiafoodToken', token);
};

export const getToken = () => window.localStorage.getItem('kiakiafoodToken');
