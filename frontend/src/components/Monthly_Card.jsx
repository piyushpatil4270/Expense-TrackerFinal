import React from 'react'

const Monthly_Card = () => {
  return (
    <div className='w-full h-fit  flex gap-1 items-center flex-col justify-center bg-slate-300'>
        <span className='p-[2px] my-1 xs:text-[12px] font-bold sm:text-[14px]'>11-Feb-2024</span>
        <div className='flex w-full  p-2 justify-start items-start'>
        <div className='flex-1 flex flex-col items-center justify-center p-[2px]'>
        <span className='xs:text-[12px] font-semibold sm:text-[14px]'>Income</span>
        <div className='flex flex-col gap-[2px] p-1'>
        <div className='flex justify-between w-full items-center xs:gap-2 sm:gap-[30%]'>
            <span className='xs:text-[12px] sm:text-[14px]'>Income_Name</span>
            <span className='xs:text-[12px] sm:text-[14px]'>Income_Name</span>
        </div>
        </div>

    </div>
    
    <div className='flex-1 flex flex-col items-center justify-center p-[2px]'>
        <span className='xs:text-[12px] font-semibold sm:text-[14px]'>Expense</span>
        <div className=' flex flex-col gap-[2px] p-1'>
        <div className='flex w-full justify-between items-center xs:gap-2 sm:gap-[30%]'>
            <span className='xs:text-[12px] sm:text-[14px]'>Income_Name</span>
            <span className='xs:text-[12px] sm:text-[14px]'>Income_Name</span>
        </div>
        <div className='flex w-full justify-between items-center xs:gap-2 sm:gap-[30%]'>
            <span className='xs:text-[12px] sm:text-[14px]'>Income_Name</span>
            <span className='xs:text-[12px] sm:text-[14px]'>Income_Name</span>
        </div>
        <div className='flex w-full justify-between items-center xs:gap-2 sm:gap-[30%]'>
            <span className='xs:text-[12px] sm:text-[14px]'>Income_Name</span>
            <span className='xs:text-[12px] sm:text-[14px]'>Income_Name</span>
        </div>
        </div>
    </div>
    </div>
        </div>
    
   
  )
}

export default Monthly_Card
