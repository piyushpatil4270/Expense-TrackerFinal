import React from 'react'
import {Link, useLocation} from "react-router-dom"

const Navbar = () => {
  const pathName=useLocation().pathname
  return (
    <div className='w-full xs:h-[75px] sm:h-[90px]  bg-[#50bcbd] flex flex-col items-center xs:gap-[2px] sm:gap-[10px]'>
        <div className='w-full flex my-1 items-center justify-center '>
         <div className='w-[80%]'>
         <span className='text-white xs:text-[15px] sm:text-[16px]'>Day To Day Expenses</span>
         </div>
         <div className=' flex justify-center xs:gap-5 gap-6'>
         <Link to={"/premium"}><span className='text-white xs:text-[12px] sm:text-[15px]'>Premium</span></Link>

         </div>
        </div>
        <div className='w-full flex justify-evenly items-center gap-4 xs:my-2 my-1'>
          <Link to={"/daily"}>
          <span className={`text-white xs:text-[13px] sm:text-[15px] border-0 ${pathName==='/daily' && `xs:border-b-2 p-1 border-white`}`}>Daily</span>
          </Link>
          <Link to={"/monthly"}>
          <span className={`text-white xs:text-[13px] sm:text-[15px] border-0 ${pathName==='/monthly' && `xs:border-b-2 p-1 border-white`} `}>Monthly</span>
          </Link>
         <Link to={"/yearly"}>
         <span className={`text-white xs:text-[13px] sm:text-[15px] border-0 ${pathName==='/yearly' && `xs:border-b-2 p-1 border-white`}`}>Yearly</span>
         </Link>
        
        </div>
      
    </div>
  )
}

export default Navbar
