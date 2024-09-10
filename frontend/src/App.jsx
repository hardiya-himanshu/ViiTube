import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import {Outlet} from 'react-router-dom'
import Footer from './components/footer/Footer'

function App() {
  
  const[isSidebarVisible, setSidebarState] = useState(false)
  const toggleSidebar = ()=>{
    setSidebarState(!isSidebarVisible)
  }

  return (
    <div>
      <header>
        <Header toggleSidebar={toggleSidebar}/>
      </header>
      <aside>
        <Sidebar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>
      </aside>
      <section>
        <Outlet />
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default App
