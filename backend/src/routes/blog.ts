import { Hono } from "hono";
import {PrismaClient} from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from "hono/jwt";
import {updateBlogSchema, blogScehema} from "@kunalwalmiki/common"

type variables = {
    userId : string,
    id : string
}

const app = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string,
    },
    Variables : variables,
}>

app.use("/*", async(c, next) => {

    try {

        const authHeader = c.req.header("authorization");

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
    
            c.status(401);
            return c.json({
                success : false,
                message : "Missing Or Invalid Header",
            });
    
        }

        const token = authHeader.split(" ")[1];
    
        const payload = await verify(token, c.env.JWT_SECRET);
    
        if(payload?.id) {

            c.set('userId', payload?.id);
            await next();
    
        } else {

            c.status(403);
            return c.json({
                success : false,
                message : "Invalid Token",
            })

        }
    
    } catch(error) {

        console.log(error);
        c.status(500);
        c.json({
            success : false,
            message : "Internal Server Error",
        });
    }
})


app.post('/createBlog', async(c) => {

    try {

        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const userId = c.get('userId');

        const {success} = blogScehema.safeParse(body);

        if(!success) {

            c.status(403);
            return c.json({

                success : false,
                message : "Invalid Inputs",

            })
        }

        const newBlog = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                published : body.published ? body.published : false,
                authorId  : userId,
            }
        });

        c.status(200);
        return c.json({
            success : true,
            message : "Blog Created Successfuly",
            data : newBlog,
        })

    } catch(error) {

        console.log(error);
        c.status(500);
        return c.json({
            success : false,
            message : "Internal Server Error",
        })
    }
})
  
app.put('/updateBlog', async(c) => {

    try {

        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();

        console.log(body)

        const {success} = updateBlogSchema.safeParse(body);

        if(!success) {

            c.status(403);
            return c.json({
                success : false,
                message : "Invalid Inputs",
            });
        }

        const updatedBlog = await prisma.post.update({
            where : {
                id : body.blogId,
            }, 
            data : {
                title : body.title,
                content : body.content,
                published : body.published,
            }
        });

        console.log(updatedBlog);

        c.status(200);
        return c.json({
            success : true,
            message : "Blog Updated Successfuly",
            data : updatedBlog,
        });


    } catch(error) {
        console.log(error);
        c.status(500)
        return c.json({
            success : false,
            message : "Internal Server Error",
        })
    }
})

app.post('/singleBlog', async(c) => {
    
    try {

        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();

        const post = await prisma.post.findUnique({
            where : {
                id : body.id,
            },
            select : {
                title : true,
                content : true,
                published : true,
                publishedDate : true,
                author : {
                    select : {
                        name : true,
                    }
                }
            }
            
        });

        c.status(200);
        return c.json({
            success : true,
            message : "All Posts Fetched Successfuly",
            data : post,
        });

    } catch(error) {

        console.log(error);
        c.status(500);
        return c.json({
            succcess : false,
            message : "Internal Server Error",
        });

    }
})
  
app.get('/bulk', async(c) => {
    
    try {

        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const allPosts = await prisma.post.findMany({
            select : {
                title : true,
                content : true,
                published : true,
                publishedDate : true,
                id: true,
                author : {
                    select : {
                        name : true, 
                    }
                }
            }
        });

        c.status(200);
        return c.json({
            success : true,
            message : "All Posts Fetched Successfuly",
            data : allPosts,
        });

    } catch(error) {

        console.log(error);
        c.status(500);
        return c.json({
            succcess : false,
            message : "Internal Server Error",
        });

    }
});


export default app;





