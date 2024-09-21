import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebars/LeftSidebar'
import {Outlet} from 'react-router-dom'
import Footer from './components/footer/Footer'
import ViiTubeTheme from './utils/ViiTubeTheme'

function App({darkMode}) {
  
  const[isSidebarVisible, setSidebarState] = useState(false)
  const toggleSidebar = ()=>{
    setSidebarState(!isSidebarVisible)
  }

  return (
    <div>
      <header>
        <Header toggleSidebar={toggleSidebar}/>
      </header>
      <main className={`${darkMode?"bg-customDark":"bg-customLight"}`}>
        <aside>
          <Sidebar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>
        </aside>
        <section style={{ height: "calc(100vh - 50px)" }} className={`${isSidebarVisible?"w-10/12":"w-full"} fixed right-0 transition-all ease-in-out duration-300`}>
        <div className={`${darkMode?"bg-customDark":"bg-customLight"} relative h-full p-1`}>
          <div className={`${darkMode?"bg-customDark2 text-customWhite":"bg-customLight2 text-customBlack"} h-full  rounded-lg p-2`}>
            <Outlet/>
          </div>
        </div>
        </section>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default ViiTubeTheme(App)
