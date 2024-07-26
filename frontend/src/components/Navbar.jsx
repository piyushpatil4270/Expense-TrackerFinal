import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full xs:h-[75px] sm:h-[90px]  bg-[#47aeb0] flex flex-col items-center xs:gap-[2px] sm:gap-[10px]'>
        <div className='w-full flex my-1 items-center justify-center '>
         <div className='w-[80%]'>
         <span className='text-white xs:text-[15px] sm:text-[16px]'>Day To Day Expenses</span>
         </div>
         <div className=' flex justify-center xs:gap-5 gap-6'>
          <span className='text-white xs:text-[12px] sm:text-[15px]'>1</span>
          <span className='text-white xs:text-[12px] sm:text-[15px]'>2</span>
          <span className='text-white xs:text-[12px] sm:text-[15px]'>3</span>
         </div>
        </div>
        <div className='w-full flex justify-evenly items-center gap-4 xs:my-2 my-1'>
         <span className='text-white xs:text-[13px] sm:text-[15px] border-0 xs:border-b-2 p-1 border-white'>Daily</span>
         <span className='text-white xs:text-[13px] sm:text-[15px] '>Daily</span>
         <span className='text-white xs:text-[13px] sm:text-[15px]'>Monthly</span>
         <span className='text-white xs:text-[13px] sm:text-[15px]'>Yearly</span>
        </div>
      
    </div>
  )
}

export default Navbar
