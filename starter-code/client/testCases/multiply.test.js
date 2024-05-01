const multiply = require('./multiply');

test('multiply 3 * 4 to equal 12', () => {
  expect(multiply(3, 4)).toBe(12);
});