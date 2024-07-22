import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { useForm } from 'react-hook-form'

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const [error,setError] = useState(null);

    const login=async(data)=>{
      try {
        const session = await authservice.login(data);
        if(session){
            const userData = authservice.getCurrentUser();
            if(userData)
                dispatch(authLogin(userData));
            navigate('/');
        }
      } catch (error) {
        setError(error.message)
      }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div>
             <div className="mb-2 flex justify-center">
                         <span className="inline-block w-full max-w-[100px]">
                             <Logo width="100%" />
                         </span>
             </div>
             <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
              <p className="mt-2 text-center text-base text-black/60">
                          Don&apos;t have any account?&nbsp;
                          <Link
                              to="/signup"
                              className="font-medium text-primary transition-all duration-200 hover:underline"
                          >
                              Sign Up
                          </Link>
              </p>
              {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
             <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label='email'
                    placeholder='enter your email'
                    type = 'email'
                    {...register('email',{
                        required:true,
                        validate:{
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}/>
                </div>
                <Input
                label = 'Password'
                placeholder ='enter password'
                type ='Password'
                {...register("password",{
                    required:true,
                })}/>
                <Button
                type='submit'
                classname='w-full'/>
             </form>
        </div>
    </div>
  )
}
