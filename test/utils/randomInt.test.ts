import { randomInt, randomIntLocal } from '../../src/utils/randomInt';
describe('randomInt', () => {
  describe('randomInt function', () => {
    let origFetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
    beforeEach(() => {
      origFetch = global.fetch;
    })
    afterEach(() => {
      global.fetch = origFetch;
    });
  
    test('result is integer', async () => {
      global.fetch = jest.fn().mockResolvedValue({ok: true, json: () => ({data: [123]})});
      
      const result = await randomInt(0, 4);
      expect(Number.isInteger(result)).toBeTruthy();
    });
  
    test('result is greater than min', async () => {
      global.fetch = jest.fn().mockResolvedValue({ok: true, json: () => ({data: [0]})});
  
      const result = await randomInt(0, 4);
      expect(result).toBeGreaterThanOrEqual(0);
    });
  
    test('result is less than max', async () => {
      global.fetch = jest.fn().mockResolvedValue({ok: true, json: () => ({data: [255]})});
  
      const result = await randomInt(0, 4);
      expect(result).toBeLessThanOrEqual(4);
    });

    test('Error when fetch fails', async () => {
      global.fetch = jest.fn().mockResolvedValue({ok: false, statusText: "error error"});
  
      await expect(async () => { await randomInt(0, 4)}).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  describe('randomIntLocal', () => {
    test('result is integer', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomIntLocal(0, 4);
        expect(Number.isInteger(result)).toBeTruthy();
      }
    });
  
    test('result is greater than min', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomIntLocal(0, 4);
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  
    test('result is less than max', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomIntLocal(0, 4);
        expect(result).toBeLessThanOrEqual(4);
      }
    });
  })
});
