import { PrismaClient } from "@prisma/client";
import {Elysia, t} from "elysia";

export const auth = new Elysia({ prefix: '/auth' })
            .get("/", () => "Hi")
            .post("/sign-in", async ({ body, db, jwt }) => signIn({ body, db, jwt }))
            .post("/sign-up", async ({ body, db, jwt }) => signUp({body, db, jwt}), {
                body: t.Object({
                    email: t.String(),
                    name: t.String(),
                    password: t.String()
                })
            });


interface SignUpDTO {
    email: string;
    name: string;
    password: string;
}
async function signUp({ body, db, jwt }) {
    try {
        const { email, name, password } = body as SignUpDTO;
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser)
            throw new Error("Email is already in use.");
        
    
        const hashedPassword = await Bun.password.hash(password);
    
        const newUser = await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: "USER",
            },
        });
        
        const token = await jwt.sign({ userId: newUser.id }, {
            expiresIn: "1h", 
        });
    
        await db.token.create({
            data: {
                userId: newUser.id,
                token,
            },
        });
    
        return { 
            user: newUser, 
            token 
        };

    } catch (error) {
        throw error;
    }
}
    

async function signIn({ body, db, jwt }) {
    const { email, password } = body;
    try {
      const user = await db.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        throw new Error("User not found.");
      }
  
      // Verify the password
      const passwordMatch = await Bun.password.verify(password, user.password);
      
      if (!passwordMatch)
        throw new Error("Invalid password.");
      
  
      const token = await jwt.sign({ userId: user.id }, {
        expiresIn: "1h", 
      });

      console.log(user, token);
      
  
      // Create token in DB
      await db.token.create({
        data: {
          userId: user.id,
          token,
        },
      });
  
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
  