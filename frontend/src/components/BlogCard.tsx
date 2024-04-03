import { Avatar } from '@chakra-ui/react';
import { VscCircleSmallFilled } from "react-icons/vsc";
import { Link } from 'react-router-dom';


export interface blogCardProps {
    name : string,
    title : string,
    content : string,
    publishedDate : string,
    id : string,
}

const BlogCard = ({
    name,
    title,
    content,
    publishedDate,
    id,
} : blogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className='flex flex-col mt-5 px-5 py-2 border-b-[1px] border-slate-500 cursor-pointer'>
      <div className='flex items-center gap-x-2'>
              <Avatar 
               size='sm' 
               name={name} 
               />

               <p
               className='text-sm md:text-xl text-black font-semibold'
               >{name} </p>

              <VscCircleSmallFilled/> 

               <p
               className='ml-3 text-slate-500 text-sm md:text-md font-semibold'
               >{publishedDate}</p>

      </div>

      <div className='mt-4'>
             <p
             className='text-md md:text-2xl font-bold text-black'
             >{title}</p>
      </div>

      <div className='mt-2'>
             <p
             className='text-sm md:text-xl font-semibold text-slate-700'
             >{content}</p>
      </div>
      
      <div className='mt-2 md:mt-5'>
            2 minute(s) read
      </div>
    </div>
     </Link>
  )
}

export default BlogCard
