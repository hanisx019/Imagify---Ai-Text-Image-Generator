import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import { toast } from 'react-toastify';
import axios from 'axios'
const Login = () => {
  const [state,setState] = useState('Login')
  const {setShowLogin,backendUrl,setToken,setUser} = useContext(AppContext)

  // state variables for input fields
  const [name,setName]= useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')

  const onSubmitHandler=async(e)=>{
    e.preventDefault(); // it will prevent from loading webpage while submiting the  form
  
      try {
        if(state==='Login'){
          const {data} = await axios.post(backendUrl+'/api/user/login',{email,password})

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token',data.token)
          setShowLogin(false)
          }else{
            toast.error(data.message)
          }
        }else{
          const {data} = await axios.post(backendUrl+'/api/user/register',{name,email,password})

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token',data.token)
          setShowLogin(false)
          }else{
            toast.error('User Already Exist')
          }
        }
      } catch (error) {
        toast.error(data.message)
      }
  }

  // To disable Scroll when sign up in loaded
  useEffect(()=>{
    document.body.style.overflow='hidden';
    return ()=>{
      document.body.style.overflow = 'unset';
    }
  },[])



  return (
    <div class=" fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center">

      <motion.form onSubmit={onSubmitHandler} class="bg-white p-5 w-[320px] flex flex-col items-center justify-center rounded-[10px] shadow-lg relative"
      initial={{ opacity: 0.2, y: 50 }}
      transition={{ duration: 0.3}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}
      >
        <h1 class="text-center text-3xl my-[10px] font-mono">{state}</h1>
        <p class="text-gray-700 mt-[5px] text-[14px]">Welcome back! Please signin to continue</p>
        { state !=='Login' &&
            <div class="relative mt-[20px]">
              <img class="absolute top-3.5 left-3.5" src={assets.name}/>
              <input onChange={e =>setName(e.target.value)} value={name} class=" p-3 pl-[40px] border w-[250px] h-[40px] border-gray-400 shadow-lg rounded-full text-[13px]" type="text" placeholder='Full Name' required />
            </div>
        }
        <div class="relative mt-[20px]">
          <img class="absolute top-3.5 left-3" src={assets.email_icon}/>
          <input onChange={e =>setEmail(e.target.value)} value={email} class=" p-3 pl-[40px] border w-[250px] h-[40px] border-gray-400 shadow-lg rounded-full text-[13px]" type="text" placeholder='Email Id' required ></input>
        </div>

        <div class="relative mt-[20px]">
          <img class="absolute top-3.5 left-4" src={assets.lock_icon}/>
          <input onChange={e =>setPassword(e.target.value)} value={password}  class=" p-3 pl-[40px] border w-[250px] h-[40px] border-gray-400 shadow-lg rounded-full text-[13px]" type="password" placeholder='Password' required />
        </div>

        <p class="text-blue-600 mt-3 ml-[-130px] text-[14px]">{state=='Login'?'Forgot password?':' '}</p>

        <button class="bg-blue-600 text-white mt-[20px]  p-2 w-[250px] h-[40px] cursor-pointer border-gray-400 shadow-lg rounded-full text-center">{state==='Login'?'Login':'create account'}</button>
        { state==='Login' ?
        <p class="my-6">Don't have an account?<span class="text-blue-600 cursor-pointer" onClick={()=>setState('Sign Up')}>Sign up</span></p>
:
        <p class="my-6">Already have an account?<span class="text-blue-600  cursor-pointer"onClick={()=>setState('Login')}> Login</span></p>

}
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} class="absolute top-5 right-5 z-40"/>
      </motion.form>


    </div>
  )
}

export default Login