import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdDarkMode,MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import {toggleTheme} from '../redux/Slices/themeSlice'
const Navbar = () => {
  const theme=useSelector((state)=>state.theme.value);
  const dispatch=useDispatch();
  function themeToggler(){
    dispatch(toggleTheme());
  }
  return (
    <div className=' bg-[#000035] w-[100vw] h-10 text-white flex md:justify-between place-items-center font-medium md:text-lg justify-evenly  text-sm'>
    <div className='flex w-full items-center justify-center  gap-28'>
    <NavLink className={({isActive})=>isActive? "text-pink-800":""} to="/"
    >Home</NavLink>
    <NavLink  className={({isActive})=>isActive? "text-pink-800":""} to="/pastes">Paste</NavLink>
    </div>
      
    <button onClick={themeToggler} className='font-bold pr-6'>
      {
        theme==="dark-theme"?(<MdOutlineLightMode/>):(<MdDarkMode/>)
      }
    </button>
    </div>
  )
}

export default Navbar
