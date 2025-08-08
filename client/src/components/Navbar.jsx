import React, {useContext} from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const {user,setShowLogin,logout,credit} = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate('/buy');
    } else {
      setShowLogin(true);
    }
  };
  return (
    <div class="flex justify-between items-center pt-2 ">
      <Link to="/">
        <img src={assets.logo} alt="" class="w-28 sm:w-32 lg:w-40 header" />
      </Link>
      <div>
        { user ? 
        <div class='flex items-center sm:gap-6 md:gap-8 mt-0.5'>

          <div onClick={onClickHandler} class="cursor-pointer cr-left flex justify-center items-center gap-2 bg-blue-200 rounded-full h-11 w-45 cursor-pointer hover:scale-104 transition-all duration-700 text-gray-600">
            <div><img src={assets.credit_star}/></div>
            <div><p >Credits left : {credit}</p></div>
          </div>

          <div class="flex justify-center items-center gap-2">
            <div class=" text-gray-600 max-sm:hidden">Hi! {user.name}</div>
            <div class='group relative mt-1.5 cursor-pointer '>
              <img width="45px" src={assets.user_svg}/>
              <div class='hidden group-hover:block absolute z-10 bg-white border-1 rounded-2xl w-20 text-center text-[14px] ml-[-15px] cursor-pointer' onClick={logout}>Logout</div>
            </div>
          </div>

        </div> 
        :
         <div class='flex gap-4 items-center sm:gap-6 md:gap-8 mt-1'>
          <Link to='/buy'>
            <button class='cursor-pointer text-[16px]'>Pricing</button> 
          </Link>
          <button onClick={()=>setShowLogin(true)} class='bg-black hover:scale-105 transition-all duration-500 text-white w-35 h-10 rounded-full header cursor-pointer '>Login</button>
         </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
