import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useLocation} from "react-router-dom"

const Navbar = () => {
  const [isPremium,setPremium]=useState(false)
  const [loading,setLoading]=useState(false)
  const pathName=useLocation().pathname
  const checkUser=async()=>{
    try {
      const userToken=localStorage.getItem("token")
      const res=await axios.get("http://localhost:5500/premium/user",{headers:{"Authorization":userToken}})
      setLoading(true)
      console.log(res.data)
      setLoading(false)
      if(res?.data?.isPremium)setPremium(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    checkUser()
  },[])
 
  

  return (
    <div className='w-full xs:h-[90px] sm:h-[90px]  bg-[#50bcbd] flex flex-col items-center xs:gap-[2px] sm:gap-[4px]'>
        <div className='w-full flex my-1 xs:p-2 items-center justify-center '>
         <div className='w-[80%] '>
         <span className='text-white xs:text-[15px] sm:text-[16px]'>Day To Day Expenses</span>
         </div>
         <div className='flex justify-center xs:gap-5 gap-6'>
         <Link to={isPremium?pathName:"/premium"}><span className={`text-white xs:text-[12px] sm:text-[15px]`}>{loading?"...":isPremium?`Premium User`:`Upgrade to Premium`}</span></Link>

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
         <Link to={"/stats"}>
          <span className={`text-white xs:text-[13px] sm:text-[15px] border-0 ${pathName==='/monthly' && `xs:border-b-2 p-1 border-white`} `}>Stats</span>
          </Link>
        
        </div>
      
    </div>
  )
}

export default Navbar
