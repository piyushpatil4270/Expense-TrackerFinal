import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full xs:h-[70px] h-[100px]  bg-[#47aeb0] flex flex-col items-center gap-[10px]'>
        <div className='w-full flex my-1 '>
         <div className='w-[80%] px-3'>
         <span className='text-white xs:text-[14px] text-[18px]'>Day To Day Expenses</span>
         </div>
         <div className=' flex justify-center gap-4 items-end'>
          <span className='text-white text-[15px]'>Item 1</span>
          <span className='text-white text-[15px]'>Item 2</span>
          <span className='text-white text-[15px]'>Item 3</span>
         </div>
        </div>
        <div className='w-full flex justify-evenly items-end gap-4 my-1'>
         <span className='text-white border-none border-b border-white'>Daily</span>
         <span className='text-white'>Daily</span>
         <span className='text-white'>Monthly</span>
         <span className='text-white'>Yearly</span>
        </div>
      
    </div>
  )
}

export default Navbar
