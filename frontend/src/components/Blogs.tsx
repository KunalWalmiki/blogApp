import BlogCard from './BlogCard'
import useBlogs from '../hooks/fetchBlogs'
import BlogSKeleton from './BlogSKeleton'

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
        blogs && blogs?.map((blog : blogInputs, index : number) => {

            return <BlogCard key={index}
            name={blog?.author?.name} 
            title={blog?.title} 
            content={blog?.content}
            publishedDate={blog?.publishedDate.substring(0,10)}
            id={blog?.id}
            />
        })
    }
    </div>
  )
}

export default Blogs
