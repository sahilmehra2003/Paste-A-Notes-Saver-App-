import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/Slices/PasteSlice';
import toast from 'react-hot-toast';
import { FiCopy } from "react-icons/fi";
const Home = () => {
    const [title,setTitle]=useState("");
    const [value,setValue]=useState("");
    const [searchParams,setSearchParams]=useSearchParams();
    const pasteId=searchParams.get("pasteId");  
    const theme=useSelector((state)=>state.theme.value);
    const dispatch=useDispatch();
    const toastStyle={
      borderRadius: '10px',
      marginRight:"40px",
      top:"1",
      ...(
       theme === 'dark-theme' ? {
         background: '#333',
         color: '#fff',
       } : {
         background: '#f0f0f0',
         color: '#333',
       }),
     }
    const allPaste=useSelector((state)=>state.paste.pastes)
    function createPaste(){
        if (title==="" || value==="") {
            toast.error("Please fill all the fields",{
              style: toastStyle,
            });
        }else{
        const paste={
            title:title,
            content:value,
            _id:pasteId || Date.now().toString(36),
            createdAt:new Date().toISOString()
        }
        if (pasteId) {
            // update
            dispatch(updateToPastes(paste));
            toast.success("Paste Updated Successfully",{
              style:toastStyle,
            })
        }else{
            // create
            dispatch(addToPastes(paste))
            toast.success("Paste Created Successfully",{
              style: toastStyle,
            });
        }
    }
        // after creation or updation
        setTitle('');
        setValue('')
        setSearchParams({});
    }

    // if the pasteId changes->if we want to edit the paste
    useEffect(()=>{
      if (pasteId) {
        const paste=allPaste.find((p)=>p._id===pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    },[pasteId])
    function handleCopy(){
      navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard",{
        style: toastStyle
      })
    }
  return (
    <div className={`bg-${theme==="dark-theme" ? "black":"white"} flex flex-col items-center  justify-center `}>
    <div className='flex flex-row  gap-y-3 2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[630px] md:min-w-[600px]  min-w-[200px]   justify-evenly items-center mt-6 gap-x-3   '>
      <input
      className={`p-3 rounded-md mt-2 pl-4 ${theme==="dark-theme" ? "bg-[#1a1a1a] text-white":"bg-slate-100 text-black" } 2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[630px] md:min-w-[600px]  min-w-[200px]`}
        type='text'
        placeholder="Enter Title Here...."
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <button 
    onClick={createPaste}
    className={`${theme==="dark-theme" ? "bg-[#B51B75] text-white hover:bg-[#4e1536] transition-all 200":"bg-blue-600 hover:bg-blue-800 transition-all 200"} text-white lg:py-3 lg:px-3 md:px-2 py-3 px-1 rounded-sm items-baseline font-semibold md:text-[1rem] text-[0.6rem] md:rounded-md mt-4`}>
    {
           pasteId ? "Update my Paste":"Create my Paste"
    }
    </button>
    </div>
    
      <div className={`mt-4 ${theme==='dark-theme'?'border-[#1a1a1a]':'border-slate-100'}   rounded-md border-b-4 border-x-4 2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[630px] md:min-w-[600px]  min-w-[360px]`}>
      <div className={`${theme==='dark-theme' ? 'bg-[#1a1a1a] text-white':'bg-slate-100 text-black'}  flex justify-between items-center rounded 2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[630px] md:min-w-[600px]  min-w-[200px]`}>
      <div className='flex justify-start items-center h-8 pl-4 lg:space-x-4 md:space-x-2 space-x-1'>
      <div className='h-4 bg-red-500 w-4 rounded-lg'></div>
      <div className='h-4 bg-yellow-500 w-4 rounded-lg'></div>
      <div className='h-4 bg-green-500 w-4 rounded-lg'></div>
      </div>
          <button className='font-bold pr-4 text-[1rem] hover:text-blue-300 transition 200' onClick={handleCopy}>
            <FiCopy/>
          </button>
      </div>
        <textarea
            className={`${theme==="dark-theme" ? "bg-black text-white":"bg-white text-black" } focus:outline-none focus:border-none 2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[630px] md:min-w-[600px]  sm:min-w-[400px] min-w-[200px] p-6 pl-5 text-[1rem] `}
            value={value}
            placeholder='Enter content here...'
            onChange={(e)=>setValue(e.target.value)}
            rows={20}   
        >
          
        </textarea>
      </div>
    </div>
  )
}

export default Home
