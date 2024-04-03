import  { useState } from 'react'
import InputBox from './InputBox'
import { Link, useNavigate } from 'react-router-dom'
import {signupType} from "@kunalwalmiki/common";
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useToast } from "@chakra-ui/react"
import { Button} from '@chakra-ui/react'


const Auth = ({type} : {type : "signup" | "signin"}) => {

    const [formData, setFormData ] = useState<signupType>({
        name : "",
        email : "",
        password : "",
    });

    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const navigate = useNavigate();

    // console.log(formData);

    async function sendRequest() {

            setLoading(true);
            
            if(type == 'signin') {

                if(!formData.email || !formData.password) {

                    toast({
                        title: `Email Or Password is Missing`,
                        position : "top",
                        status: `warning`,
                        duration: 9000,
                        isClosable: true,
                      })

                    return;
                }

                const response = await axios.post(`${BACKEND_URL}/api/v1/auth${type ? "/signin" : "/signup"}`, formData);
            
                console.log(response);

                const token = response?.data?.token;
                localStorage.setItem("token", token);
                toast({
                    position : "top",
                    title: 'Logged In Successfuly.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                setLoading(false);  
                navigate("/blogs");
            
            } else {

                if(!formData.email || !formData.password || !formData.name) {

                    toast({
                        title: `All Field Are Required`,
                        position : "top",
                        status: `warning`,
                        duration: 9000,
                        isClosable: true,
                      })
                    return;
                }

                const response = await axios.post(`${BACKEND_URL}/api/v1/auth${type === 'signup' ? "/signup" : "/signin"}`, formData);
            
                console.log(response);

                toast({
                    title: 'Account created.',
                    position : "top",
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                navigate("/login");
                setLoading(false);

            }    
            setLoading(false);
    }

  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <p
      className='text-2xl font-extrabold text-center'
      >
           {type == "signup" ? "Create An Account" : "Login"}
      </p>
      <div className='flex items-center  gap-2'>
      <p
      className='text-xl text-slate-600 text-center font-medium mt-1'
      >
          {type == "signup" ? "Already Have An Account" : "Don't Have An Account"}
      </p>
       <Link to={type == "signup" ? "/login" : "/"} className='underline'>
        {type == "signup" ? "Login" : "signup"}</Link>
      </div>
    
      <div className='flex items-center flex-col justify-center mt-4 gap-y-5 max-w-sm'>
         {
            type == "signup" && <InputBox label="Name" onchange={(e) => {
                setFormData(c => ({
                    ...c,
                    name : e.target.value,
                }))
             }} />
         }
         <InputBox label="Email" type="email" onchange={(e) => {
            setFormData(c => ({
                ...c,
                email : e.target.value,
            }))
         }} />

         <InputBox label="Password" type="password" onchange={(e) => {
            setFormData(c => ({
                ...c,
                password : e.target.value,
            }))
         }} />


         <Button 
         onClick={sendRequest}
         isLoading={loading}
         colorScheme='black' 
         backgroundColor={"black"}
         >
         {
            type === "signup" ? "Sign Up" : "Sign In" 
         }</Button>
      </div>
    </div>
  )
}

export default Auth
