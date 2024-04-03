import { Avatar, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom'

const Appbar = () => {

  const navigate = useNavigate();
  
  return (
    <div className='bg-slate-200 w-screen h-[50px] flex items-center'>
        <div className='flex items-center w-10/12 mx-auto justify-between'>
               <Link to={localStorage.getItem("token") ? "/blogs" : "/"}><h4
               className='font-medium text-2xl'
               >Medium</h4>
               </Link>
               <div className='flex items-center gap-x-4'>
               <Avatar 
               size='sm' 
               name='kunal walmiki' 
               />
               {
                  localStorage.getItem("token") && <Button
                  onClick={()=> {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                  colorScheme='teal' variant='outline'>
                  Logout
                  </Button>
               }
                </div>
        </div>
    </div>
  )
}

export default Appbar
