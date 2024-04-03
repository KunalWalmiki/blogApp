"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.blogScehema = exports.signInSchema = exports.signUpScehema = void 0;
const zod_openapi_1 = require("@hono/zod-openapi");
exports.signUpScehema = zod_openapi_1.z.object({
    name: zod_openapi_1.z.string(),
    email: zod_openapi_1.z.string().email(),
    password: zod_openapi_1.z.string(),
});
exports.signInSchema = zod_openapi_1.z.object({
    email: zod_openapi_1.z.string().email(),
    password: zod_openapi_1.z.string(),
});
exports.blogScehema = zod_openapi_1.z.object({
    title: zod_openapi_1.z.string(),
    content: zod_openapi_1.z.string(),
    published: zod_openapi_1.z.boolean().optional(),
});
exports.updateBlogSchema = zod_openapi_1.z.object({
    title: zod_openapi_1.z.string().optional(),
    content: zod_openapi_1.z.string().optional(),
    published: zod_openapi_1.z.boolean().optional(),
    blogId: zod_openapi_1.z.string(),
});
