import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import {Outlet} from 'react-router-dom'
import Footer from './components/footer/Footer'

function App() {

  return (
    <div>
      <header>
        <Header/>
      </header>
      <aside>
        <Sidebar/>
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
