import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Header = () => {
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
    <motion.div className="flex justify-center items-center text-center flex-col gap-8"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}
    >
      <motion.div className="flex justify-center items-center gap-2 text-stone-500 bg-white p-2 border rounded-full w-[250px] text-[14px]  mt-20 "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{duration:0.8,delay:0.2}}
      >
        <div ><p>Best text to image generator</p></div>
        <div><img src={assets.star_icon}/></div>
      </motion.div>
      <motion.div class="text-7xl w-[600px] div-header"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{duration:2,delay:0.4}}
      >
        <p class="text-gray-800 d  header-title">Turn text to <br/><span class="text-blue-600">image</span>, in seconds. </p>
      </motion.div>
      <motion.div class="text-[16.5px] text-gray-600 font-medium "
      initial={{ opacity: 0,y:20}}
      animate={{ opacity: 1,y:0}}
      transition={{duration:0.6,delay:0.6}}     
      >
        Unleash your creativity with AI. Turn your imagination into visual art in<br/> seconds – just type, and watch the magic happen.
      </motion.div>
      <motion.div
      whileTap={{scale:0.95}}
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{default :{duration:0.5},opacity:{delay:0.8,duration:1}}}
      >
        <button class="cursor-pointer flex justify-center items-center  gap-2 bg-black text-center text-white p-3 rounded-full w-[210px] 
        hover:scale-105 transition-all duration-500">
          <p onClick={onClickHandler}>Generate Images</p>
          <img width="20px" src={assets.star_group}/>
        </button>
      </motion.div>
      <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{duration:1,delay:1}}   
      >
        <ul class=" a flex justify-center items-center gap-4 header-image .create-image">
          <li class="w-[70px] hover:scale-105 transition-all duration-600 "><img class="rounded-[7px]" src={assets.sample_img_1}/></li>
          <li class="w-[70px] hover:scale-105 transition-all duration-400 "><img class="rounded-[7px]" src={assets.sample_img_2}/></li>
          <li class="w-[70px]  hover:scale-105 transition-all duration-400"><img class="rounded-[7px]" src={assets.sample_img_1}/></li>
          <li class="w-[70px] hover:scale-105 transition-all duration-400"><img class="rounded-[7px]" src={assets.sample_img_2}/></li>
          <li class="w-[70px] hover:scale-105 transition-all duration-400"><img class="rounded-[7px]" src={assets.sample_img_1}/></li>
          <li class="w-[70px] hover:scale-105 transition-all duration-400"><img class="rounded-[7px]" src={assets.sample_img_2}/></li>
        </ul>
        <motion.p class="text-gray-600 mt-2 text-[14px]"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{duration:0.8,delay:1.2}}   
        >Generated images from imagify</motion.p>
      </motion.div>
    </motion.div>
  )
}

export default Header