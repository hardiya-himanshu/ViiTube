import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebars/LeftSidebar'
import Settingbar from './components/sidebars/RightSidebar'
import {Outlet} from 'react-router-dom'
import Footer from './components/footer/Footer'
import ViiTubeTheme from './utils/ViiTubeTheme'

function App({darkMode}) {
  
  const[isSidebarVisible, setSidebarState] = useState(false)
  const toggleSidebar = ()=>{
    setSidebarState(!isSidebarVisible)
  }
  const[isSettingbarVisible, setSettingbarState] = useState(false)
  const toggleSettingbar = ()=>{
    setSettingbarState(!isSettingbarVisible)
  }

  return (
    <div className='border-2 border-red-500 '>
      <header>
        <Header toggleSidebar={toggleSidebar} toggleSettingbar={toggleSettingbar}/>
      </header>
      <main className={`${darkMode?"bg-customDark":"bg-customLight"}`}>
        <aside>
          <Sidebar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>
        </aside>
        <section style={{ height: "calc(100vh - 54px)" }}  className={`${isSidebarVisible?"w-10/12":"w-full"} transition-all ease-in-out duration-300 h-full`}>
        
        <div className={`${darkMode?"bg-customDark":"bg-customLight"} relative h-full p-1 `}>
          <div className={`${darkMode?"bg-customDark2 text-customWhite":"bg-customLight2 text-customBlack"} h-full  rounded-lg p-2`}>
            <Outlet/>
          </div>
        </div>
        </section>
        <aside>
          <Settingbar toggleSettingbar={toggleSettingbar} isSettingbarVisible={isSettingbarVisible}/>
        </aside>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default ViiTubeTheme(App)
