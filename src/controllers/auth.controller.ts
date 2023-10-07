import Elysia from "elysia";

export const auth = new Elysia({ prefix: '/auth' })
    .group("/*", app => {
        return app
            .get("/", () => "Hi")
            .post("/sign-in", ({ body }) => body)
            .post("/sign-up", ({ body }) => body)
    })

