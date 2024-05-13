import BlogCard from './BlogCard'
import useBlogs from '../hooks/fetchBlogs'
import BlogSKeleton from './BlogSKeleton'
import { useNavigate } from 'react-router-dom'

export interface blogInputs {
    author : {
        name : string,
    }
    title : string,
    content : string,
    published : string,
    publishedDate : string,
    id : string,
}
const Blogs = () => {

    const {blogs, loading} = useBlogs();
    const navigate = useNavigate();

    if(loading) {

        return (
            <div>
                 <BlogSKeleton/>
                 <BlogSKeleton/>
                 <BlogSKeleton/>
            </div>
        )
    }
  return (
    <div className='flex flex-col gap-y-4 mb-5'>
    {
        blogs && blogs.length > 0 ? (
            blogs.map((blog : blogInputs, index : number) => {
            return <BlogCard key={index}
            name={blog?.author?.name} 
            title={blog?.title} 
            content={blog?.content}
            publishedDate={blog?.publishedDate.substring(0,10)}
            id={blog?.id}
            />
        })) 
        : (
              <div className='mt-20 flex flex-col items-center justify-center '>
                   <p
                   className='text-xl md:text-2xl font-semibold'
                   >No Blogs Yet</p>
                   <p
                   className='text-md font-medium text-slate-500 mt-3'
                   >
                    Be the First One to Create Blog</p>
                   <button
                   className='px-4 py-1 bg-yellow-400 text-black font-medium rounded-md mt-5 hover:scale-95 hover:bg-yellow-500 transition-all duration-300'
                   onClick={() => navigate("/createBlog")}
                   >Create</button>
              </div>
          ) 
    }
    </div>
  )
}

export default Blogs
