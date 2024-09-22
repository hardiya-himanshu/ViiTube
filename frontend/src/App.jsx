import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import LeftSideBar from './components/sidebars/LeftSideBar'
import RightSideBar from './components/sidebars/RightSideBar'
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
    <div>
      <header>
        <Header toggleSidebar={toggleSidebar} toggleSettingbar={toggleSettingbar}/>
      </header>
      <main className={`${darkMode?"bg-customDark":"bg-customLight"} `}>
        <aside>
          <LeftSideBar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>
        </aside>
        <section style={{ height: "calc(100vh - 51px)" }}  className={`${isSidebarVisible?`${isSettingbarVisible?"w-8/12 left-1/2 transform -translate-x-1/2 ":"w-10/12 right-0"}`:`${isSettingbarVisible?"w-10/12 left-0":"w-full"}`} fixed  transition-all ease-in-out duration-0 h-full ${darkMode?"bg-customDark":"bg-customLight"}`}>
          <div className={`${darkMode?"bg-customDark":"bg-customLight"} p-1 h-full `}>
            <div className={`${darkMode?"bg-customDark2 text-customWhite":"bg-customLight2 text-customBlack"} h-full  rounded-lg p-2`}>
              <Outlet/>
            </div>
          </div>
        </section>
        <aside>
          <RightSideBar toggleSettingbar={toggleSettingbar} isSettingbarVisible={isSettingbarVisible}/>
        </aside>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default ViiTubeTheme(App)
