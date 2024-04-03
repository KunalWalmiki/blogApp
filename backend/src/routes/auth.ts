import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt'
import {signInSchema, signUpScehema} from "@kunalwalmiki/common"

const app = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string,
    }
}>
  
  
app.post('/signup', async(c) => {
  
    try {
  
      const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      const body = await c.req.json();

      const {success} = signUpScehema.safeParse(body);

      if(!success) {

        c.status(401);

        return c.json({
            success : false,
            message : "Invalid Input",
        });

      }

      const user = await prisma.user.create({
        data : {
          name : body.name,
          password : body.password,
          email : body.email,
        }
      })
    
      return c.json({
        success : true,
        message : "Sign Up Successfull",
        data : user,
      })
    
    } catch(error) {

        console.log(error);
      return c.json({
        success : false,
        message : "Internal Server Error",
      })
  
    }
   
  
})
  
app.post('/signin', async(c) => {
    
    try {

          const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
          }).$extends(withAccelerate());

          const body = await c.req.json();

          const {success} = signInSchema.safeParse(body);

          if(!success) {

            c.status(401);

            return c.json({
                success : false,
                message : "Invalid Input",
            });

          }

          const user = await prisma.user.findUnique({
            where : {
                email : body.email,
            }
          });

          if(!user) {

            c.status(403);

            return c.json({
                success : false,
                message : "Your Email Is Not Registered With Us!",
            });

          }

          if(user?.password === body.password) {
              
              const token = await sign({id : user?.id}, c.env.JWT_SECRET);

              c.status(200);
              return c.json({
                success : true,
                message : "Logged In Successfuly",
                token,
              });

          } else {

            c.status(401);
            return c.json({
              success : true,
              message : "Incorrect Password",
            });

          }

    } catch(error) {

        console.log(error);
        c.status(500);
        c.json({
            success : false,
            message : "Internal Server Error",
        })
    }

})


export default app;
