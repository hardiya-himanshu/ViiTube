import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import LeftSideBar from './components/sidebars/LeftSideBar'
import RightSideBar from './components/sidebars/RightSideBar'
import {Outlet} from 'react-router-dom'
import Footer from './components/footer/Footer'
import ViiTubeTheme from './utils/ViiTubeTheme'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from './store/themeSlice'

function App() {
  
  const[isSidebarVisible, setSidebarState] = useState(false)
  const toggleSidebar = ()=>{
    setSidebarState(!isSidebarVisible)
  }
  const[isSettingbarVisible, setSettingbarState] = useState(false)
  const toggleSettingbar = ()=>{
    setSettingbarState(!isSettingbarVisible)
  }

  const darkMode = useSelector((state)=>state.theme.darkMode)
  const dispatch = useDispatch()

  const handleTheme = ()=>{
      dispatch(toggleTheme())
  }

  const authStatus = useSelector(state => state.auth.status)

  
  return (
    <div>
      <header>
        <Header darkMode={darkMode} toggleSidebar={toggleSidebar} toggleSettingbar={toggleSettingbar} onToggleTheme={handleTheme}/>
      </header>
      <main className={`${darkMode?"bg-customDark":"bg-customLight"} `}>
        <aside>
          <LeftSideBar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} authStatus={authStatus}/>
        </aside>
        <section style={{ height: "calc(100vh - 51px)" }}  className={`${isSidebarVisible?`${isSettingbarVisible?"w-8/12 left-1/2 transform -translate-x-1/2 ":"w-10/12 right-0"}`:`${isSettingbarVisible?"w-10/12 left-0":"w-full"}`} fixed  transition-all ease-in-out duration-0 h-full ${darkMode?"bg-customDark":"bg-customLight"}`}>
          <div className={`${darkMode?"bg-customDark":"bg-customLight"} p-1 h-full `}>
            <div className={`${darkMode?"bg-customDark2 text-customWhite":"bg-customLight2 text-customBlack"} h-full  rounded-lg p-2`}>
              <Outlet/>
            </div>
          </div>
        </section>
        <aside>
          <RightSideBar toggleSettingbar={toggleSettingbar} isSettingbarVisible={isSettingbarVisible} authStatus={authStatus}/>
        </aside>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default ViiTubeTheme(App)