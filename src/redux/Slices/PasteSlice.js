import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";





const initialState={
    pastes:localStorage.getItem("pastes")?
    JSON.parse(localStorage.getItem("pastes")):[]
}

export const pasteSlice=createSlice({
    
    name:"paste",
    initialState,
    reducers:{
        addToPastes:(state,action)=>{
              const paste=action.payload;
            //   check don't create paste with same title
            const existingPaste=state.pastes.find(p=>p.title===paste.title)
            if (existingPaste) {
                // toast.error(`Paste with title "${paste.title}" already exists.`);
                return state;
            }
              state.pastes.push(paste);
            //   adding it to local storage
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            
        },
        updateToPastes:(state,action)=>{
            const paste=action.payload;
            const index=state.pastes.findIndex((item)=>item._id===paste._id);
            if (index>=0) {
                state.pastes[index]=paste;
                localStorage.setItem("pastes",JSON.stringify(state.pastes));
               
            }
        },
        resetAllPastes:(state,action)=>{
               state.pastes=[];
               localStorage.removeItem("pastes");
        },
        removeFromPastes:(state,action)=>{
              const {pasteId,pasteTitle}=action.payload;
              
              const index=state.pastes.findIndex((item)=>item._id===pasteId);
              if (index>=0) {
               // deleting the paste from array
                state.pastes.splice(index,1);
                //updated localstorage after deleting the specific splice
                localStorage.setItem("pastes",JSON.stringify(state.pastes));
               
              }
        },
    }
})

export const {addToPastes,updateToPastes,resetAllPastes,removeFromPastes}=pasteSlice.actions;
export default pasteSlice.reducer
