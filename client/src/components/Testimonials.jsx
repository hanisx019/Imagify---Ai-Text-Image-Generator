import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
const Testimonials = () => {
  return (
    <motion.div class="mt-[200px] flex-wrap"
      initial={{ opacity: 0.2, y: 200 }}
      transition={{ duration: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}>
      <div class="mt-50">
        <h1 class="text-5xl text-center">Customer testimonials</h1>
        <p class="text-gray-600 text-[16px] mt-[18px] text-center tracking-wider">What Our Users Are Saying</p>
      </div>

      <div class="flex justify-center items-center mt-[100px] mb-[100px] gap-7 testi sm:testi md:testi lg:testi xl:testi md ">

        <div class=" wd flex flex-col  w-[25%] backdrop-blur-3xl border border-gray-200 rounded-lg shadow-lg p-8 text-center justify-center items-center gap-4 hover:scale-[1.02] transition-all duration-500">
            <div><img class="w-[60px] " src={assets.profile_img_1}/></div>
            <div><h3 class="text-2xl text-gray-700 font-mono">Donald Jackman</h3></div>
            <div><h4 class="mt-[-20px] text-gray-500">Graphic Designer</h4></div>
            <div class="flex justify-center"><img src={assets.rating_star}/><img src={assets.rating_star}/><img src={assets.rating_star}/><img src={assets.rating_star}/><img src={assets.rating_star}/></div>
            <p class="text-wrap text-center text-gray-400 text-[18px]">I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.</p>
        </div>



        <div class="wd flex flex-col w-[25%] backdrop-blur-3xl border border-gray-200 rounded-lg shadow-lg p-8 text-center justify-center items-center gap-4 hover:scale-[1.02] transition-all duration-500">
            <div><img class="w-[60px] " src={assets.profile_img_2}/></div>
            <div><h3 class="text-2xl text-gray-700 font-mono">Donald Jackman</h3></div>
            <div><h4 class="mt-[-20px] text-gray-500">Richard Nelson</h4></div>
            <div class="flex justify-center"><img src={assets.rating_star}/><img src={assets.rating_star}/><img src={assets.rating_star}/><img src={assets.rating_star}/><img src={assets.rating_star}/></div>
            <p class="text-wrap text-center text-gray-400 text-[18px]">I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.</p>
        </div>

        <div class=" wd flex flex-col w-[25%] backdrop-blur-3xl border border-gray-200 rounded-lg shadow-lg p-8 text-center justify-center items-center gap-4 hover:scale-[1.02] transition-all duration-500">
            <div><img class="w-[60px] " src={assets.profile_img_1}/></div>
            <div><h3 class="text-2xl text-gray-700 font-mono">James Washington</h3></div>
            <div><h4 class="mt-[-20px] text-gray-500">Graphic Designer</h4></div>
            <div class="flex  justify-center"><img src={assets.rating_star}/><img src={assets.rating_star}/><img src={assets.rating_star}/><img src={assets.rating_star}/><img src={assets.rating_star}/></div>
            <p class="text-wrap text-center text-gray-400 text-[18px]">I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.</p>
        </div>


      </div>
    </motion.div>
  )
}

export default Testimonials
