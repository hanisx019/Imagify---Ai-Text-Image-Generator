import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div class="mt-[100px] flex flex-col justify-center items-center text-center gap-8 ">
        <div class="mt-[100px] flex justify-between items-center w-full mb-[30px]">
            <div><img src={assets.logo}/></div>
            <div class="text-center text-[18px] text-gray-600 footer  none">All right reserved. Copyright @imagify</div>
            <div class="flex justify-center items-center gap-3">
                <div><img src={assets.facebook_icon}/></div>
                <div><img src={assets.instagram_icon}/></div>
                <div><img src={assets.twitter_icon}/></div>
            </div>
        </div>
    </div>
  )
}

export default Footer