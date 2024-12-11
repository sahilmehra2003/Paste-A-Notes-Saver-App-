import { createSlice } from "@reduxjs/toolkit";


const initialTheme=localStorage.getItem("theme") || "dark-theme";
const initialState={
    value:initialTheme
}

export const themeSlice=createSlice(
    {
        name:"theme",
        initialState,
        reducers:{
            toggleTheme:(state)=>{
               state.value=state.value==="dark-theme"?"light-theme":"dark-theme";
                localStorage.setItem("theme",state.value)
            }
        }

    }
)


export const {toggleTheme}=themeSlice.actions;
export default themeSlice.reducer