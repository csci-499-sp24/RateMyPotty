// divide.test.js
const divide = require('./divide');

test('divides 8 / 4 to equal 2', () => {
  expect(divide(8, 4)).toBe(2);
});

test('divides 7 / 3 to equal approximately 2.33', () => {
  expect(divide(7, 3)).toBeCloseTo(2.3333333);
});

//okay so does not default to integer division