import React from 'react'
import ViiTubeTheme from '../../utils/ViiTubeTheme'

function LeftSideBar({darkMode, isSidebarVisible, toggleSidebar}) {
  const sidebarItems = ["Home", "Channel", "Dashboard", "Subscriptions", "Subscribers", "Watch History", "Playlists", "Liked Videos", "Comments", "Tweets"]
  return (
    <div className={`${darkMode?"bg-customDark text-customWhite":"bg-customLight text-customBlack"} ${isSidebarVisible?"transform translate-x-0 transition-transform duration-0 ease-in-out":"transform -translate-x-full left-0 transition-transform duration-0 ease-in-out"} min-w-40  absolute w-2/12 top-0 h-full z-30`}>
      <div className='absolute px-4 py-3  z-50 w-full'>
        <svg onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 22" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
      <div className='p-3 flex flex-col justify-between h-full z-40 pt-16'>
        <ul className='flex flex-col gap-3'>
          {
            sidebarItems.map((item, index)=>(
              <li key={index} className={`py-2 hover:cursor-pointer px-2 rounded-lg ${darkMode?"hover:bg-zinc-800":"hover:bg-zinc-200"} duration-100`}>
                  <div>
                    {item}
                  </div>
              </li>
            ))
          }
        </ul>
        <ul>
          <li className={`py-2 hover:cursor-pointer px-2 rounded-lg ${darkMode?"hover:bg-zinc-800":"hover:bg-zinc-200"} duration-100`}>
            <div>
              Settings
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ViiTubeTheme(LeftSideBar)
