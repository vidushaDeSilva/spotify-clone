import React from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='bg-[#003A10] min-h-screen pl-[2vw]'>
        <img src={assets.logo} alt="" className='mt-5 w-[max(10px, 100px)] hidden sm:block'/>
        <img src={assets.logo_small} className='mt-5 w-[max(5vw, 40px)] mr-5 sm:hidden block' alt="" />

        <NavLink to='/add-song' className='flex flex-col gap-5 mt-10'>
            <div className='flex items-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img src={assets.add_song} className='w-5' alt="" />
                <p className='hidden sm:block'>add song</p>
            </div>
        </NavLink>
        <NavLink to='/list-song' className='flex flex-col gap-5 mt-10'>
            <div className='flex items-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img src={assets.song_icon} className='w-5' alt="" />
                <p className='hidden sm:block'>list song</p>
            </div>
        </NavLink>
        <NavLink to='/add-album' className='flex flex-col gap-5 mt-10'>
            <div className='flex items-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img src={assets.add_album} className='w-5' alt="" />
                <p className='hidden sm:block'>add album</p>
            </div>
        </NavLink>
        <NavLink to='/list-album' className='flex flex-col gap-5 mt-10'>
            <div className='flex items-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img src={assets.album_icon} className='w-5' alt="" />
                <p className='hidden sm:block'>list album</p>
            </div>
        </NavLink>
      
    </div>
  )
}

export default Sidebar
