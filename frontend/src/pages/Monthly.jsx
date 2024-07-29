import React, { useEffect, useState } from 'react'
import Monthly_Card from '../components/Monthly_Card'
import moment from 'moment'
import Month_Cal from "../components/Month_Cal"
import axios from 'axios'

const Monthly = () => {
  const[currMonth,setCurrMonth]=useState(moment.utc().startOf('month').toDate());
  const [expenses,setExpenses]=useState([])
  const [totalPages,setTotalPages]=useState(1)
  const [currPage,setCurrPage]=useState(1)
  const itemsPerPage=5
  const getExpenses=async()=>{
    try {
      const userToken=localStorage.getItem("token")
    const res=await axios.post("http://localhost:5500/expense/getbyMonth",{month:currMonth,limit:itemsPerPage,page:currPage},{
      headers:{'Authorization':userToken}
    })
    if(res.data.expenses)setExpenses(res.data.expenses)
    if(res.data.total)setTotalPages(Math.ceil(res.data.total/itemsPerPage))

    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(()=>{
    console.log("current month is ",currMonth)
    getExpenses()
    console.log("Total-Pages ",totalPages)

  },[currMonth,currPage])
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <Month_Cal currMonth={currMonth} setCurrMonth={setCurrMonth} />
     {expenses.map((expense)=>{
      const newDate=moment.utc(expense.date).format("YYYY-MM-DD")
      return <Monthly_Card title={expense.title} description={expense.description} date={newDate} amount={expense.amount} category={expense?.category} />
     })} 
     <div className="w-full flex justify-between items-center">
     <button className={`m-5 p-[4px] text-[14px] rounded-sm ${currPage>1?'bg-black':'bg-slate-400'}  text-white`}  onClick={()=>{
      if(currPage>1){
        setCurrPage(currPage-1)
      }
     }}>Prev</button>
      <button  className={`m-5 p-[4px] text-[14px] rounded-sm ${currPage<totalPages?"bg-black":"bg-slate-400"} text-white`}
      onClick={()=>{
        if(currPage<totalPages){
          setCurrPage(currPage+1)
        }
      }}
      >Next</button>
      </div>
      
    </div>
  )
}

export default Monthly
