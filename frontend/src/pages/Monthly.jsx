import React from 'react'
import Monthly_Card from '../components/Monthly_Card'

const Monthly = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <Monthly_Card/>
      <Monthly_Card/>
      <Monthly_Card/>
    </div>
  )
}

export default Monthly
