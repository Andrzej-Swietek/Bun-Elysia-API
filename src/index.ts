import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { PrismaClient } from "@prisma/client";

// Controllers
import { auth, users } from '@controllers/index'

const database_setup = (app: Elysia) => app.decorate('db', new PrismaClient())

const PORT = process.env.PORT || 3000;


const app = new Elysia()
  .use(swagger())
  .use(cors({
    origin: /\*$/
  }))
  .use(database_setup)
  .derive(({ request: { headers }, store }) => {
    return {
        authorization: headers.get('Authorization')
    }
  })
  // Authentication
  .use(auth)
  // Users
  .use(users)
  .get("/", () => "Bun + Elysia API")
  .get('/id/:id', ({ params: { id } }) => ({param_id: id}))
  .get('/route/*', () => 'all Routes after /route')
  .onError(({ code, error }) => {
    return new Response(error.toString())
  })
  .listen(PORT);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app
