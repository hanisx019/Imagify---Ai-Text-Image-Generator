import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredits = () => {
  const {user,backendUrl,loadCreditsData,token,setShowLogin} = useContext(AppContext)

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAAZOR_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payement',
      description: 'Credits Payement',
      order_id: order.id,
      handler: async (response) => {
        console.log('Razorpay handler response:', response);
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verify-razor',
            { razorpay_order_id: response.razorpay_order_id },
            { headers: { token } }
          );
          if (data.success) {
            loadCreditsData();
            toast.success('Credit Added');
            navigate('/');
          } else {
            toast.error(data.message || 'Payment verification failed');
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
      modal: {
        ondismiss: function() {
          console.log('Razorpay payment popup closed by user');
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      console.error('Razorpay payment failed:', response);
      toast.error('Payment failed. Please try again.');
    });
    rzp.on('payment.success', function (response) {
      console.log('Razorpay payment success:', response);
    });
    rzp.open();
  };

  const navigate = useNavigate()
  const paymentRazorPay = async (planId)=>{
    try {
      if(!user){
        setShowLogin(true);
        return;
      }
      const {data}=await axios.post(backendUrl+'/api/user/pay-razor',{planId},{headers:{token}})
      if(data.success){
          initPay(data.order)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div class="flex flex-col items-center justify-center mt-[100px] gap-6"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}
    >
      <button class="p-2 bg-white border border-gray-500 rounded-full w-[130px] text-[12px]">OUR PLANS</button>
      <p class="text-3xl font-medium">Choose the plan</p>

      <div>
        <div class="flex justify-center items-center gap-6 flex-wrap ">
          {plans.map((item,index)=>(
              <div class="bg-white p-5 flex flex-col  items-center gap-5 w-[300px] h-[350px] rounded-[10px] mt-4 relative border border-gray-200 shadow-lg 
              hover:scale-105 transition-all duration-600 cursor-pointer" key={index}>
                <img class="mt-9" src={assets.logo_icon}/>
                <p class="text-gray-800 text-[20px] font-semibold">{item.id}</p>
                <p class=" text-gray-700 mt-[-18px] mb-[20px] text-[18px]">{item.desc}</p>
                <p class="text-gray-700 text-[14px] mb-[3px]"><span class="text-3xl font-bold">{"$"+item.price+" "}</span>/{item.credits}</p>
                <button onClick={()=>paymentRazorPay(item.id)} class="bg-gray-900 text-white w-[70%] text-sm p-3 rounded-[5px] absolute bottom-10 cursor-pointer">{user?'Purchase':'Get started'}</button>
              </div>
          ))}

        </div>

      </div>
    </motion.div>
  )
}

export default BuyCredits
