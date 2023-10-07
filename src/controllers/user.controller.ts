import { password } from "bun";
import {Elysia, t} from "elysia";

export const users = new Elysia({ prefix: '/users' })
            .get("/all", async ({ db }) => {
                try {
                    const allUsers = await db.user.findMany();
                    return allUsers;
                } catch (error) {
                    throw error;
                }
            })
            .get("/:id", async ({ params, db }) => {
                try {
                    const userId = parseInt(params.id, 10);
                    const user = await db.user.findUnique({
                      where: { id: userId },
                    });
              
                    if (!user) 
                        return { 
                            success: false,
                            message: "User not found" 
                        };
                    
              
                    return user;
                } catch (error) {
                    throw error;
                }
            })
            .post("/", async ({ body, db }) => {
                try {
                    const hashedPassword = await Bun.password.hash(body.password);
                    const newUser = await db.user.create({
                        data: {
                            email: body.email,
                            name: body.name,
                            password: hashedPassword,
                        },
                    });

                    return newUser;
                } catch (error) {
                    throw error;
                }
            },{
                body: t.Object({
                    email: t.String(),
                    name: t.String(),
                    password: t.String()
                })
            })
            .put("/:id", async ({ params, body, db }) => {
                try {
                    const userId = parseInt(params.id, 10);

                    // Find the user by ID
                    const existingUser = await db.user.findUnique({
                        where: { id: userId },
                    });
            
                    if (!existingUser) 
                        return { 
                            success: false,
                            message: "User not found" 
                        };
                  
            
                    // Update the user based on the request body
                    const updatedUser = await db.user.update({
                        where: { id: userId },
                        data: body,
                    });
                  
                    return updatedUser;
                } catch (error) {
                    throw error;
                }
            })
            .delete("/:id", async ({ params, db }) => {
                try { 
                    const userId = parseInt(params.id, 10);

                    // Find the user by ID
                    const existingUser = await db.user.findUnique({
                        where: { id: userId },
                    });
              
                    if (!existingUser)
                        return { 
                            success: false,
                            message: "User not found" 
                        };
              
                    // Delete the user along with all dependencies like profile and tokens
                    await db.user.deleteMany({
                        where: { id: userId },
        
                    });

                    return { 
                        success: true,
                        message: "User Deleted" 
                    };
                } catch (error) {
                    throw error;
                }
            })
    