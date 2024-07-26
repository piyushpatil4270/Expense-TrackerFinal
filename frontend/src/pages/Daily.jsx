import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios"

const Income = () => {
  const [addExp, setaddExp] = useState(false);
  const [isExp, setIsExp] = useState(false);
  const [category, setCategory] = useState("");
  const [title,setTitle]=useState("")
  const [details,setDetails]=useState("")
  const [amount,setAmount]=useState("")
  const [data,setData]=useState([])


  const handleExpense=async()=>{
   
    try {
      if(title===""||amount===""){
        alert("All Fields are Mandatory")
        return
      }
      setaddExp(false);
     
        const res=await axios.post("http://localhost:5500/expense/add",{
          category:category,
          amount:amount,
          title:title,
          description:details
        })
        fetchExpenses()
       
    } catch (error) {
      console.log(error)
    }


   
  }

  const fetchExpenses=async()=>{
    try {
      const res=await axios.get('http://localhost:5500/expense/all')
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchExpenses()
  },[])

  return (
    <div className="w-full h-full flex flex-col gap-4 mt-2 justify-center items-center">
      <div className="flex flex-col items-center w-full px-4 py-4 gap-4">
        <div className="w-full flex justify-between bg-slate-300">
          <span className="m-1 text-black xs:text-[14px] sm:text-[18px]">
            Total Expense:
          </span>
          <span className="m-1 text-black xs:text-[14px] text-[18px]">
            $45555
          </span>
        </div>
        {data && data?.map((expense)=>{
          return <div className="w-full flex justify-between ">
          <span className="mx-2 text-black xs:text-[12px] sm:text-[15px]">
            {expense.title}
          </span>
          <span className="mx-2 text-black xs:text-[12px] sm:text-[15px]">
            ${expense.amount}
          </span>
        </div>
        })}
        {/*<div className='w-full flex justify-between bg-slate-300 '>
    <span className='m-1 text-black xs:text-[14px] sm:text-[18px]'>Total Expense:</span>
    <span className='m-1 text-black xs:text-[14px] sm:text-[18px]'>$55564545</span>
    </div>*/}
      </div>
      {addExp && (
        <div className="xs:w-[75%] sm:w-[35%] rounded-sm xs:gap-[10px] sm:gap-[25px] flex flex-row justify-center items-center bg-[#e5e4df]">
          <div className=" w-full flex flex-col gap-4 p-2 items-center justify-center ">
            <div className="w-[80%] flex items-center justify-between gap-5  p-3">
              <div className="mx-3 ">
                <span
                  className={`px-2 py-[2px] border-0 xs:text-[14px] sm:text-[14px] ${
                    isExp && `border-cyan-400`
                  } border-b-[2px] cursor-pointer`}
                  onClick={() => setIsExp(true)}
                >
                  Expense
                </span>
              </div>
              <div className="mx-3">
                <span
                  className={`px-2 py-[2px] xs:text-[14px] sm:text-[14px] border-0 ${
                    !isExp && `border-cyan-400`
                  }  border-b-[2px] cursor-pointer`}
                  onClick={() => setIsExp(false)}
                >
                  Income
                </span>
              </div>
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <span className="xs:w-[15%] sm:w-[25%] xs:text-[12px] sm:text-[14px]">
                Title
              </span>{" "}
              <input className="flex-1 outline-none" onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <span className="xs:w-[15%] sm:w-[25%] xs:text-[12px] sm:text-[14px]">
                Details
              </span>{" "}
              <input className="flex-1 outline-none" onChange={(e)=>setDetails(e.target.value)} />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <span className="xs:w-[15%] sm:w-[25%] xs:text-[12px] sm:text-[14px]">
                Amount
              </span>{" "}
              <input type="number"  min="0"  step={1} className="flex-1 outline-none" onChange={(e)=>setAmount(e.target.value)} />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <span className="xs:w-[15%] sm:w-[25%] xs:text-[12px] sm:text-[14px]">
                Category
              </span>
              <select className="outline-none xs:w-[15%] sm:w-[25%] xs:text-[12px] sm:text-[14px] p-[4px] bg-white border rounded">
                <option value="" >Select Category</option>
                <option value="food" onClick={()=>setCategory("Food")}>Food</option>
                <option value="transport" onClick={()=>setCategory("Transport")} >Transport</option>
                <option value="entertainment"  onClick={()=>setCategory("Entertainment")}>Entertainment</option>
                <option value="utilities"  onClick={()=>setCategory("Utilities")}>Utilities</option>
              </select>
            </div>

            <div className="w-full flex items-center justify-center gap-2">
              <button
                className="bg-cyan-300 w-fit px-[7px] p-[2px] text-[12px] rounded-md"
                onClick={handleExpense}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {!addExp && (
        <button
          className="w-fit h-fit bg-cyan-300 flex items-center justify-center xs:p-[2px]  sm:p-[3px] text-white xs:text-[12px] sm:text-[14px]"
          onClick={() => setaddExp(true)}
        >
          Add Expense
        </button>
      )}
    </div>
  );
};

export default Income;
