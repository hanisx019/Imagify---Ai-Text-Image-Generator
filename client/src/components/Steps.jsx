import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Steps = () => {
  return (
    <motion.div class="flex flex-col justify-center items-center"
      initial={{ opacity: 0.2, y: 200 }}
      transition={{ duration: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}
    >
      <div class="mt-50">
        <h1 class="text-5xl text-center">How it works</h1>
        <p class="text-gray-600 text-[16px] mt-[18px] text-center tracking-wider">Transform Words Into Stunning Images</p>
      </div>

      <div class="flex justify-left items-center mt-10 backdrop-blur-3xl p-7 gap-3 w-[70%] mx-auto border rounded-2xl
      border-gray-200 shadow-lg hover:scale-103 transition-all duration-500 cursor-pointer div-body">
        <div class="div-eye"><img width="50px" src={assets.step_icon_1}/></div>
        <div>
        <h2 class="text-lg div-h2">Describe Your Vision</h2>
        <p class="text-gray-500 sm:text-sm md:text-md lg:text-md xl:text-md div-p">"Type a phrase, sentence, or paragraph that describes the image you want to create."</p>
        </div>
      </div>

     <div class="flex justify-left items-center mt-10 backdrop-blur-3xl p-7 gap-3 w-[70%] mx-auto border rounded-2xl
      border-gray-200 shadow-lg hover:scale-103 transition-all duration-500 cursor-pointer div-body">
        <div class="div-eye"><img width="50px" src={assets.step_icon_2}/></div>
        <div>
        <h2 class="text-lg div-h2">Watch the Magic</h2>
        <p class="text-gray-500 sm:text-sm md:text-md lg:text-md xl:text-md div-p">"Our AI-powered engine will transform your text into a high-quality, unique image in seconds."</p>
        </div>
      </div>

      <div class="flex justify-left items-center mt-10 backdrop-blur-3xl p-7 gap-3 w-[70%] mx-auto border rounded-2xl
      border-gray-200 shadow-lg hover:scale-103 transition-all duration-500 cursor-pointer div-body">
        <div class="div-eye"><img width="50px" src={assets.step_icon_3}/></div>
        <div>
          <h2 class="text-lg div-h2">Download & Share</h2>
          <p class="text-gray-500 sm:text-sm md:text-md lg:text-md xl:text-md div-p">"Instantly download your creation or share it with the world directly from our platform."</p>
        </div>
      </div>

    </motion.div>
  )
}

export default Steps
