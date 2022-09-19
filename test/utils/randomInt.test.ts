import { randomInt } from '../../src/utils/randomInt';

describe('randomInt', () => {
  test('result is integer', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(0, 4);
      expect(Number.isInteger(result)).toBeTruthy();
    }
  });

  test('result is greater than min', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(0, 4);
      expect(result).toBeGreaterThanOrEqual(0);
    }
  });

  test('result is less than max', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(0, 4);
      expect(result).toBeLessThanOrEqual(4);
    }
  });
});
