import axios from 'axios';

export default axios.create({
  baseURL: 'https://kiakiafood.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'x-auth': null,
  },
});
