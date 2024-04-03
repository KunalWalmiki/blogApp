import Appbar from '../components/Appbar'
import { FiPlus } from "react-icons/fi";
import Blogs from '../components/Blogs';
import { useNavigate } from 'react-router-dom';

const Blog = () => {

  const navigate = useNavigate();

  return (
    <div className='overflow-x-hidden'>
        <Appbar/>
        <div className='w-10/12 flex-col mx-auto mt-20 '>

        <div className=' flex items-center  gap-x-10 border-b-[1px] border-slate-500 py-3 cursor-pointer'>
              <div>
                     <FiPlus 
                     onClick={() => navigate("/createBlog")}
                     fontSize={25} className='text-slate-500'/>
              </div>
              <div>
                     <p
                     className='text-black font-xl font-medium'
                     >For You</p>
              </div>
              <div>
                     <p
                      className='text-slate-500 font-xl font-medium'
                     >Following</p>
              </div>

          
        </div>
           <Blogs/>
      </div>
    </div>
  )
}

export default Blog
