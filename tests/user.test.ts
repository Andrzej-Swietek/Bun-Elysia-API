import { describe, expect, it, afterAll } from 'bun:test';

const baseUrl = `localhost:3000/users`;

describe('USERS Test suite', () => {


    describe('GETS Users suite', async() => {
        it('should return a list of users successfully', async () => {
            const response = await fetch(`${baseUrl}/all`);
            const data = await response.json();
            expect(response.ok);
            expect(data.length > 0);
        });
    
        it('should return a user successfully using existing id', async () => {
            const response = await fetch(`${baseUrl}/1`);
            const data = await response.json();
            expect(response.ok);
            expect(data.email == 'user-0@example.com');
            expect(data.name == "user-0")
        });
    })

    describe('CREATE Users suite', async() => {
        it('should create user and get status 200', async()=> {
            const response = await fetch(`${baseUrl}`, {
                method: "POST",
                body: JSON.stringify({
                    name: "text-xxx",
                    email: "text@test.com",
                    password: "zaq1@WSX"
                })
            });
            const data = await response.json();
            expect(response.ok);
        })
    });

    afterAll(() => {
        process.exit(0);
    })
});