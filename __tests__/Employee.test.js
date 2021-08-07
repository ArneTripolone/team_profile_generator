const Manager = require('../lib/Manager');

test('properly extends employee class with github', () => {
  expect(Manager).hasOwnProperty('officeNumber')
})