const Intern = require('../lib/Intern');

test('properly extends employee class with school', () => {
  expect(Intern).hasOwnProperty('school')
})