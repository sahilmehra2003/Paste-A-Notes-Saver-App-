
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Paste from './Components/Paste'
import ViewPaste from './Components/ViewPaste'
import { useSelector } from 'react-redux'

const router=createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
         <Navbar/>
         <Paste/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
         <Navbar/>
         <ViewPaste/>
      </div> 
    }
  ]
)
function App() {
  const theme=useSelector((state)=>state.theme.value)
  return(
    <div className= {`${theme==="dark-theme" ? "bg-black":"bg-white"} w-full h-[100vh]`}>
        
        <RouterProvider router={router}/>
      
    </div>
  )
}

export default App
