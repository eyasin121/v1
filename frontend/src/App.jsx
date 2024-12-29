import {Outlet} from'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <>
     <div className=' min-h-screen flex flex-col bg-slate-300'>
       <Navbar/>
       <div className='flex-grow lol'> <Outlet/> </div>
       <div className='mt-auto lol'><Footer/></div>
     </div>
    </>
  )
}

export default App
