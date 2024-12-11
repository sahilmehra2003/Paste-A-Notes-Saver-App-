import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/Slices/PasteSlice';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom';
import { MdSearch,MdEdit, MdDelete } from "react-icons/md";
import { RiCalendarCheckLine } from "react-icons/ri";
import { GrFormView } from "react-icons/gr";
import { FiCopy } from "react-icons/fi";
import { FaShare } from "react-icons/fa";
const Paste = () => {

    const pastes=useSelector((state)=>state.paste.pastes)
    const theme=useSelector((state)=>state.theme.value);
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
    // console.log(pastes);
    const [searchTerm,setSearchTerm]=useState('');
    const dispatch=useDispatch();
    // filter content is created
    const filteredData=pastes.filter(
        (paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    function handleDelete(pasteId,pasteTitle){
        dispatch(removeFromPastes({pasteId,pasteTitle} ))
        toast.success(`Removing paste with title "${pasteTitle}"`,{
          style:toastStyle, 
        })
    }
    

    function convertedUTCtoIndianDate(utcDate){
      // create a new date object from utc date string 
      const date=new Date(utcDate)
      // console.log(date);
      //options for formattiong date 
      const options = {
        timeZone: 'Asia/Kolkata', // Indian Standard Time (IST) timezone
        weekday: 'long', // full day of the week
        year: 'numeric', // full 4-digit year
        month: 'long', // full month name
        day: 'numeric', // day of the month
        hour: 'numeric', // hour (24-hour format)
        minute: 'numeric', // minute
        // second: 'numeric', // second
      };
      const localDateTime=date.toLocaleString('en-IN',options);
      return localDateTime
      
    }
    // share the content using link
    function handleShare(id,title,content){
      const url=`https://paste-a-notes-saver-app.vercel.app/pastes/share?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`
      navigator.clipboard.writeText(url);
      toast.success("Url copied to clipboard",{
        style:toastStyle 
      });
    }
  return (
    <div className='flex flex-col md:items-center  w-full items-start justify-center'>
      <div className={`lg:min-w-[870px] md:min-w-[550px] sm:min-w-[350px] min-w-[220px] ${theme==='dark-theme'?'bg-[#1a1a1a]':'bg-slate-100'} mt-5 rounded-2xl h-9 relative`}>
       <input
      className={`${theme==='dark-theme' ? 'bg-black text-white border-[#252323]':'bg-white text-black border-slate-100'} lg:min-w-[820px] md:min-w-[520px] sm:min-w-[320px] min-w-[200px] h-9 rounded-l-2xl border-x-2 border-y-1  absolute -top-[2px] -left-[2px] pl-4`}
        type='search'
        placeholder='Search Here...'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
       />
        <button className={`font-semibold lg:text-[1.6rem] sm:text-[1.3rem] text-[1.1rem] mt-5 ${theme==='dark-theme'?"text-white":"text-black"} absolute -top-3 lg:right-5 md:right-3 sm:right-1 right-1 border-l-1`}>
              <MdSearch/>
        </button>
      </div>
      
      <div className={`flex flex-col gap-5 mt-5 lg:min-w-[820px] md:min-w-[520px] sm:min-w-[320px] min-w-[200px]  border-2 rounded-lg ${theme==='dark-theme' ? 'border-[#252323]' : 'border-slate-100'}`}>
          <div className={`${theme==='dark-theme'? 'border-[#252323] text-white':'border-slate-100 text-black'} border-b-2`}>
            <h1 className='md:text-[2rem] sm:text-[1.9rem] text-[1.4rem] font-bold p-2'>All Pastes</h1>
          </div>
          {
            filteredData.length>0 &&
            filteredData.map(
                (paste)=>{
                    return (
                    <div key={paste?._id} className={`${theme==='dark-theme'?'border-[#252323] text-white':'border-slate-100 text-black'} border-2 rounded-lg mx-2 my-2 lg:min-w-[800] md:min-w-[500] sm:min-w-[300] min-w-[160] sm:flex sm:flex-row sm:justify-between flex-col justify-evenly`}>
                      <div className='flex flex-col'>
                      <div className='md:text-[1.75rem] sm:text-[1.6rem] text-[1.25rem]  font-bold p-2'>
                       {paste.title} 
                       </div> 
                       <div className='text-1rem p-2'>
                        {paste.content.split(' ').slice(0,18).join(' ') + (paste.content.split(' ').length>18 ? '...':'')}
                       </div>
                      </div>
                      <div className='flex flex-col space-y-8 p-3'>
                      <div className='flex flex-row gap-4 place-content-evenly'>
                          <button className={`${theme==='dark-theme' ? 'bg-[#151515]': 'bg-slate-100'} px-2 py-1 rounded-sm border-1 hover:text-blue-300`}>
                          <Link to={`/?pasteId=${paste?._id}`}>
                              <MdEdit/>
                            </Link>
                          </button>
                          <button className={`${theme==='dark-theme' ? 'bg-[#151515]': 'bg-slate-100'} px-2 py-1 rounded-sm border-1 text-[24px] hover:text-blue-300`}>
                            <Link to={`/pastes/${paste?._id}`}>
                              <GrFormView/>
                            </Link>
                          </button>
                          <button className={`${theme==='dark-theme' ? 'bg-[#151515]': 'bg-slate-100'} px-2 py-1 rounded-sm border-1 hover:text-blue-300`} 
                          onClick={()=>{
                            navigator.clipboard.writeText(paste?.content)
                            toast.success("Copied to Clipboard",{
                                 style: toastStyle,
                               })
                          }}><FiCopy/></button>
                          <button className={`${theme==='dark-theme' ? 'bg-[#151515]': 'bg-slate-100'} px-2 py-1 rounded-sm border-1 hover:text-blue-300`} 
                          onClick={()=>handleDelete(paste?._id,paste?.title)}><MdDelete/></button>
                          {/* share button ka logic->share pe click karne pe link generate hojaye jo dusro ke sath share kar paye */}
                          <button onClick={()=>handleShare(paste?._id,paste?.title,paste?.content)}
                          className={`${theme==='dark-theme' ? 'bg-[#151515]': 'bg-slate-100'} px-2 py-1 rounded-sm border-1 hover:text-blue-300`}>                 
                             <FaShare/>
                          </button>
                       </div>
                       <div className='flex space-x-3 items-center font-semibold'>
                        <span><RiCalendarCheckLine/></span>
                        <p>
                        {convertedUTCtoIndianDate(paste.createdAt)}
                        </p>
                       </div>
                      </div>
                       
                    </div>
                )
            }
            )
          }
      </div>
    </div>
  )
}

export default Paste
