import React, { use, useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'

const Result = () => {
  
  const [image,setImage]=useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading,setLoading] =useState(false)
  const [input,setInput] = useState('')
  const {generateImage}=useContext(AppContext)
  const onSumbitHandler = async (e)=>{
    e.preventDefault()
    setLoading(true)

    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }
  return (
    <motion.form onSubmit={onSumbitHandler} class="flex flex-col justify-center items-center mt-[150px]"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}
      >
      <div>
        <div class="relative inline-block">
          <img src={image} class="w-[350px]"/>
          <span class={` absolute bottom-0  bg-blue-500  z-10 h-1 ${loading?'w-full transition-all duration-[10s]':'w-0'}`}/>
        </div>

        <p class={!loading?'hidden':''}>Loading.......</p>
      </div>
    {!isImageLoaded && 
      <div class="my-9  flex justify-center items-center relative text-white p2">
       <input
       onChange={e=>setInput(e.target.value)} value={input}
       type="text" placeholder=  'Describe what you want to generate'  class="place bg-neutral-500 w-[600px] p-4 rounded-[90px] outline-none text-[15px] pl-10 placeholder-color "/>
      <button type ="submit" class="flex justify-center items-center  gap-2 bg-black text-center text-white p-3 rounded-[95px] w-[210px] absolute right-1 cursor-pointer p1">Generate</button>
      </div>
}
{ isImageLoaded &&
    <div class="flex gap-6 my-8 wd ww">
      <button onClick={()=>{setIsImageLoaded(false)}} class="flex justify-center items-center  gap-2 bg-white text-center text-black p-3 rounded-full w-[210px] border border-gray-800] cursor-pointer">Generate Another</button>
      <a href={image} download class="flex justify-center items-center  gap-2 bg-black text-center text-white p-3 rounded-full w-[210px] cursor-pointer">Download</a>
    </div>
    }
    </motion.form>
  )
}

export default Result
