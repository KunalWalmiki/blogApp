import  { useState } from 'react'
import Appbar from '../components/Appbar'
import InputBox from '../components/InputBox'
import { Button, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";


const CreateBlog = () => {

    const [formData, setFormData] = useState({
        title : "",
        content : "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toast = useToast();

    const CreateBlog = async()=> {
        
        setLoading(true);
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog/createBlog`, formData, {
            headers : {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        });


        toast({
            title: `${response?.data?.message}`,
            position : "top",
            status: `success`,
            duration: 9000,
            isClosable: true,
          })

          setLoading(false);
          if(response.data.success) {
            navigate("/blogs");
          }
    }

    const onSubmit = () => {

        if(!formData.title || !formData.content) {

            toast({
                title: 'Title Or Content is Missing',
                position : "top",
                status: 'warning',
                duration: 9000,
                isClosable: true,
              })

            return;  
        }

        CreateBlog()
    }

  return (
    <div className='overflow-x-hidden'>
    <Appbar/>
    <div className='w-10/12 min-h-[500px] flex-col mx-auto mt-5'>

      <button
      className='flex items-center justify-center gap-x-1 hover:scale-95 transition-all duration-300'
      onClick={() => navigate(-1)}
      >
               <IoIosArrowRoundBack/>
               Back
      </button>
     <div className='flex flex-col gap-y-5 items-center justify-center mt-20'>
        <p
        className='font-extrabold text-black text-2xl'
        >Create New Blog</p>
     <InputBox 
     label="Title"
     onchange={(e) => {
        setFormData((c) => ({
            ...c,
            title : e.target.value,
        }))
     } } />

     <Textarea
        placeholder='Enter Blog Details'
        size='sm'
        className='max-w-[290px]'
        onChange={(e) => {
            setFormData((c) => ({
                ...c,
                content : e.target.value,
            }))
        }}
      />
      <Button 
      onClick={onSubmit}
      isLoading={loading}
      colorScheme='blue'>Create</Button>

     </div>
   
    </div>
    </div>    
  )
}

export default CreateBlog
