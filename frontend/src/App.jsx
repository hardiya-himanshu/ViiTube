import { useState } from 'react'
import './App.css'
import ViiTubeTheme from './utils/ViiTubeTheme'

function App({darkMode, onToggleTheme}) {

  return (
    <div className={`${darkMode?"bg-green-500":"bg-pink-800"} `}>
      <br />
        <button onClick={onToggleTheme}>click</button>
    </div>
  )
}

export default ViiTubeTheme(App)
