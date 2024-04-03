import {z} from "@hono/zod-openapi";

export const signUpScehema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string(),
});

export type signupType = z.infer<typeof signUpScehema>

export const signInSchema = z.object({
    email : z.string().email(),
    password : z.string(),
})

export type signinType = z.infer<typeof signInSchema>

export const blogScehema = z.object({

    title : z.string(),
    content : z.string(),
    published : z.boolean().optional(),
    
});

export type createBlogType = z.infer<typeof blogScehema>

export const updateBlogSchema = z.object({

    title : z.string().optional(),
    content : z.string().optional(),
    published : z.boolean().optional(),
    blogId : z.string(),
    
});

export type updateBlogType = z.infer<typeof updateBlogSchema>





