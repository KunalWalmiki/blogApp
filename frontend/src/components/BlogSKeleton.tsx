import { Skeleton } from '@chakra-ui/react'

const BlogSKeleton = () => {
  return (
    <div className='flex flex-col mt-5 px-5 py-2 cursor-pointer'>
      <div className='flex items-center gap-x-2'>
               <Skeleton height='20px'/>

              <Skeleton height='20px'/>

              <Skeleton height='20px'/>

              <Skeleton height='20px'/>
      </div>

      <div className='mt-4'>
             <Skeleton height='20px'/>
      </div>

      <div className='mt-2'>
              <Skeleton height='20px'/>
      </div>
      
      <div className='mt-2 md:mt-5'>
                <Skeleton height='20px'/>
      </div>
    </div>
  )
}

export default BlogSKeleton
