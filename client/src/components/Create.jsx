import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import "./../index.css";
const Create = () => {
  return (
    <motion.div class="mt-[200px] flex flex-col justify-center items-center"
      initial={{ opacity: 0.2, y: 150 }}
      transition={{ duration: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}
    
    >
      <div>
        <h1 class="text-5xl text-center">Create AI Images</h1>
        <p class="text-gray-600 text-[16px] mt-[18px] text-center tracking-wider">Turn your imagination into visuals</p>
      </div>

      <motion.div class="create-img flex justify-center items-center mt-[100px]  gap-14 w-4xl  sm:flex-wrap md:flex-wrap lg:flex-nowrap xl:flex-nowrap sm:w-sm md:w-md lg:w-4xl xl:w-4xl 
      ">
        <div class="w-7xl">
            <img src={assets.sample_img_1} class="rounded-[7px]"/>
        </div>
        <div class="text-align">
            <h2 class="text-[27px] text-gray-600 font-semibold mt-[10px] ">Introducing the AI-Powered Text to <br/> Image Generator</h2>
            <p class="text-gray-500 text-[16px] mt-[20px] b">Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
            <p class="text-gray-500 text-[16px] mt-[20px] b">Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!</p>
        </div>
      </motion.div>






    </motion.div>
  )
}

export default Create
