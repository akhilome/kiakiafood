import jwt from '../../utils/jwt';

test('test utility', () => {
  jest.spyOn(jwt, 'decode');
  const payload = jwt.decode(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1LCJ1c2VyTmFtZSI6Ik1pa2UiLCJ1c2VyRW1haWwiOiJtaWtlQGdtYWlsLmNvbSIsInVzZXJTdGF0dXMiOiJjdXN0b21lciIsImlhdCI6MTU0NzQ4OTkyN30.JT2DEIa-gBteCiWIlgj-A5tEOX3afT3TrqAdr8stdXM',
  );
  expect(payload).toEqual({
    iat: 1547489927,
    userEmail: 'mike@gmail.com',
    userId: 65,
    userName: 'Mike',
    userStatus: 'customer',
  });
});
