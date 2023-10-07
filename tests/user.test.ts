import { describe, expect, it, afterAll } from 'bun:test';

const baseUrl = `localhost:3000/users`;

describe('USERS Test suite', () => {

    describe('GET Users suite', async () => {
        it('should return a list of users successfully', async () => {
          const response = await fetch(`${baseUrl}/all`);
          const data = await response.json();
    
          expect(response.ok).toBe(true); 
          expect(data.length).toBeGreaterThan(0);
        });
    
        it('should return a user successfully using an existing id', async () => {
          const response = await fetch(`${baseUrl}/1`);
          const data = await response.json();
    
          expect(response.ok).toBe(true); 
          expect(data.email).toBe('user-0@example.com'); 
          expect(data.name).toBe('user-0'); 
        });
    
        it('non-existing user id', async () => {
          const response = await fetch(`${baseUrl}/9999`);
          const data = await response.json();
    
          expect(response.status).toBe(200); 
          expect(data.message).toBe('User not found'); 
        });
      });
    
      describe('CREATE Users suite', async () => {
        it('should create a user and return a 200 status code', async () => {
          const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: 'text-xxx',
              email: 'text@test.com',
              password: 'zaq1@WSX',
            }),
          });
    
          expect(response.status).toBe(200); 
          const data = await response.json();
          expect(data).toHaveProperty('user'); 
          expect(data.user.name).toBe('text-xxx'); 
          expect(data.user.email).toBe('text@test.com'); 
        });
      });

    afterAll(() => {
        process.exit(0);
    })
});