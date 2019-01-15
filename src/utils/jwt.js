import decode from 'jwt-decode';

export default { decode: token => decode(token) };
