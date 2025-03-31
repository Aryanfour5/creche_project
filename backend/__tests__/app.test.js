import request from 'supertest';
import app from '../server.js'; // Ensure this path is correct

describe('GET /test', () => {
  it('should return working', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(200);
    expect(res.text).toBe('working');
  });
});
