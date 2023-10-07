import Elysia from "elysia";

export const users = new Elysia({ prefix: '/users' })
            .get("/all", ({ db }) => db.user.findMany())
            .get("/:id", () => "User by ID")
            .post("/", () => "Create Users")
            .put("/:id", () => "Update Users")
            .delete("/:id", ()=> "Delete ID")
    