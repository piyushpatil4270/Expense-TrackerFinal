import React, { useEffect, useState } from 'react'
import Monthly_Card from '../components/Monthly_Card'
import moment from 'moment'
import Month_Cal from "../components/Month_Cal"
import axios from 'axios'

const Monthly = () => {
  const[currMonth,setCurrMonth]=useState(moment.utc().startOf('month').toDate());
  const [expenses,setExpenses]=useState([])
  const getExpenses=async()=>{
    try {
      const userToken=localStorage.getItem("token")
    const res=await axios.post("http://localhost:5500/expense/getbyMonth",{month:currMonth},{
      headers:{'Authorization':userToken}
    })
    setExpenses(res.data)

    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(()=>{
    console.log("current month is ",currMonth)
    getExpenses()

  },[currMonth])
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <Month_Cal currMonth={currMonth} setCurrMonth={setCurrMonth} />
     {expenses.map((expense)=>{
      const newDate=moment.utc(expense.date).format("YYYY-MM-DD")
      return <Monthly_Card title={expense.title} description={expense.description} date={newDate} amount={expense.amount} category={expense?.category} />
     })} 
      
    </div>
  )
}

export default Monthly
