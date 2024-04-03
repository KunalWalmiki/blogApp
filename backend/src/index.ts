import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import authRoutes from './routes/auth';
import blogRoutes from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string,
  }
}>

app.use("/*", cors());

app.route("/api/v1/auth", authRoutes);
app.route("/api/v1/blog", blogRoutes);


app.get("/", async(c) => {

  return c.text("Welcome to BlogZone");

})

export default app
