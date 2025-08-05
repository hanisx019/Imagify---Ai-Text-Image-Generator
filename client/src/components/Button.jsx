import React, { useContext } from 'react' 
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const Button = () => {
    const {user,setShowLogin}=useContext(AppContext)
  const navigate = useNavigate()
  const onClickHandler=()=>{
      if(user){
        navigate('/result')
      }else{
        setShowLogin(true)
      }
  }
  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}
    class="mt-[200px] flex flex-col justify-center items-center text-center gap-8">
        <h1 class="text-5xl text-center">See the magic. Try now</h1>
        <div class="mt-[20px]">
            <button onClick={onClickHandler} class="flex justify-center items-center  gap-2 bg-black text-center text-white p-3 rounded-full w-[210px] 
             hover:scale-105 transition-all duration-500">
            <p>Generate Images</p>
            <img width="20px" src={assets.star_group}/>
            </button>
        </div>
    </motion.div>
  )
}

export default Button