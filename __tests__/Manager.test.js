const Manager = require('../lib/Manager');

test('properly extends employee class with officeNumber', () => {
  expect(Manager).hasOwnProperty('officeNumber')
})