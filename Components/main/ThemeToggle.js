'use client'
import React from 'react'
import { useEffect, useState } from 'react'

import {FaMoon} from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'
const ThemeToggle = ({ setDarkModeLocal }) => {

    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
      const theme = localStorage.getItem('theme')
      if (theme === "dark") setDarkMode(true)

    }, [])
    useEffect(() => {
        if(darkMode){
            document.documentElement.classList.add("dark")
            localStorage.setItem('theme',"dark")
        }else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem('theme',"light")
        }
        setDarkModeLocal(darkMode)
    }, [darkMode, setDarkModeLocal])
    
    
  return (
    <div className='relative w-16 h-8 flex items-center dark:bg-[#7042f81e] bg-[#7042f861] cursor-pointer rounded-full p-1' onClick={() => setDarkMode(!darkMode)}>
    <FaMoon className='text-white' size={18} />
      <div className='absolute bg-[#f8f8f869] dark:bg-[#7042f88c] w-6 h-6 rounded-full shadow-md transform transition-transform duration-400' style={darkMode ? { left: "2px"} : {right: "2px"}}></div>
      <BsSunFill className='ml-auto text-yellow-300' size={18}/>
    </div>
  )
}

export default ThemeToggle
