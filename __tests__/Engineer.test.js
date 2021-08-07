const Engineer = require('../lib/Engineer');

test('properly extends employee class with github', () => {
  expect(Engineer).hasOwnProperty('github')
})