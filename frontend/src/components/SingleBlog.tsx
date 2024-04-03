import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_URL } from '../config';
import BlogCard from './BlogCard';
import Appbar from './Appbar';
import BlogSKeleton from './BlogSKeleton';

interface blogInput {
    author : {
        name : string
    },
    title : string,
    content : string,
    publishedDate : string,
    id : string,
}


const SingleBlog = () => {

    const [blog, setBlog] = useState<blogInput>({
        author : {
            name : "",
        },
        title : "",
        content : "",
        publishedDate : "",
        id : "",
    });
    const [loading, setLoading] = useState(false);

    const {id} = useParams();

    useEffect(() => {

        const fetchBlog = async() => {

            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/singleBlog`, {id : id}, {
                headers : {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });

            setBlog(response?.data?.data);
            setLoading(false);

        }

        fetchBlog();

    }, [id]);

  return (
    <div className='overflow-x-hidden'>
        <Appbar/>
        <div className='w-10/12 flex-col mx-auto mt-10'>
        {
            loading ? (
                <div>
                 <BlogSKeleton/>
                </div>
            ) : (
                <BlogCard 
                name={blog?.author?.name} 
                title={blog?.title} 
                content={blog?.content}
                publishedDate={blog?.publishedDate}
                id={blog?.id}
                 />
            )
        }        
        </div>
    </div>
  )
}

export default SingleBlog
