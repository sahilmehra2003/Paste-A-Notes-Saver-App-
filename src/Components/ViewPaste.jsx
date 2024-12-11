import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiCopy } from 'react-icons/fi';
const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const [paste, setPaste] = useState(null);
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
  // Fetch paste based on ID when component mounts or ID changes
  useEffect(() => {
    const foundPaste = allPastes.find((p) => p._id === id);
    if (foundPaste) {
      setPaste(foundPaste);
    }
  }, [id, allPastes]);

  // If no paste found by ID, try to get from shared URL parameters
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const sharedId = params.get('id');
  //   const sharedContent = params.get('content');
  //   const sharedTitle=params.get('title');
  //   if (sharedId && sharedContent && sharedTitle && !paste) {
  //     setPaste({ _id: sharedId, title: sharedTitle, content: sharedContent });
  //   }
  // }, [paste]);

  // Handle case where paste is not found or undefined
  if (!paste) {
    return <div className='w-full mt-56 flex justify-center items-center overflow-hidden'>
      <p className='spinner'></p>
    </div>; // or show a loading indicator
  }
  function handleCopy(){
    navigator.clipboard.writeText(paste?.content);
    toast.success("Copied to clipboard",{
      style:toastStyle,
    })
  }
  return (
    <div className={`bg-${theme==="dark-theme" ? "black":"white"} flex flex-col items-center justify-center`}>
      <div className='mt-6 2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[630px] md:min-w-[600px] sm:min-w-[500px]  min-w-[350px]'>
        <input
          className={`p-3 rounded-md mt-2 w-[80%] pl-8 ${theme==="dark-theme" ? "bg-[#1a1a1a] text-white":"bg-slate-100 text-black" } 2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[630px] md:min-w-[600px] sm:min-w-[500px]  min-w-[350px] cursor-not-allowed font-bold text-[1rem]`}
          type='text'
          placeholder="Enter Title Here...."
          value={paste.title}
          disabled
        />
      </div>

      <div className={`mt-6 ${theme==='dark-theme'?'border-[#1a1a1a]':'border-slate-100'}   rounded-md border-b-4 border-x-4`}>
      <div className={`${theme==='dark-theme' ? 'bg-[#1a1a1a] text-white':'bg-slate-100 text-black'}  flex justify-between items-center rounded w-full`}>
      <div className='flex justify-start items-center h-8 pl-4 space-x-4'>
      <div className='h-4 bg-red-500 w-4 rounded-lg'></div>
      <div className='h-4 bg-yellow-500 w-4 rounded-lg'></div>
      <div className='h-4 bg-green-500 w-4 rounded-lg'></div>
      </div>
          <button className='font-bold pr-4 text-[1rem] hover:text-blue-300 transition 200' onClick={handleCopy}>
            <FiCopy/>
          </button>
      </div>
        <textarea
          className={`${theme==="dark-theme" ? "bg-black text-white":"bg-white text-black" } focus:outline-none focus:border-none  p-6 pl-5 text-[1rem] cursor-not-allowed 2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[630px] md:min-w-[600px]  sm:min-w-[500px] min-w-[350px]`}
          value={paste.content}
          placeholder='Enter content here...'
          rows={20}
          disabled // to not allow text area to be edited
        />
      </div>
    </div>
  );
};

export default ViewPaste;

