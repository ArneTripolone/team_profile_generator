const Employee = require('../lib/Employee');

test('properly extends employee class with name, id and email', () => {
  expect(Employee).hasOwnProperty('name', 'id', 'email')
})