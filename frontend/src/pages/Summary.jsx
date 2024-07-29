import React, { useEffect, useRef, useState } from "react";
import html2Canvas from "html2canvas"
import jsPdf from "jspdf"

const ExpenseTable = () => {
    const [isPremium,setPremium]=useState(false)
  const expenses = [
    {
      title: "Groceries",
      description: "Weekly grocery shopping",
      amount: 50,
      date: "2024-07-28",
    },
    {
      title: "Rent",
      description: "Monthly house rent",
      amount: 500,
      date: "2024-07-01",
    },
    {
      title: "Utilities",
      description: "Electricity and water bill",
      amount: 100,
      date: "2024-07-15",
    },
    {
      title: "Transport",
      description: "Monthly transport pass",
      amount: 60,
      date: "2024-07-10",
    },
  ];
  let i=0
  const tableRef1=useRef()
  const tableRef2=useRef()

  const downLoad1=()=>{
    const input=tableRef1.current
    html2Canvas(input)
    .then(canvas=>{
        const imgData=canvas.toDataURL('image/png')
        const pdf=new jsPdf()
        pdf.addImage(imgData,'PNG',0,0)
        pdf.save(`expenses${i}.pdf`)
        i++
    })
  }

  const downLoad2=()=>{
    const input=tableRef2.current
    html2Canvas(input)
    .then(canvas=>{
        const imgData=canvas.toDataURL('image/png')
        const pdf=new jsPdf()
        pdf.addImage(imgData,'PNG',0,0)
        pdf.save(`expenses.pdf`)
        
    })
  }
  useEffect(()=>{
    const premiumUser=localStorage.getItem("premium")
    if(premiumUser)setPremium(true)
  },[])

  return (
    <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col p-2 items-center justify-center">
      <h2 className="p-2 xs:text-[13px] sm:text-[15px] font-semibold text-center">Monthly Expense Summary</h2>
      <table ref={tableRef1} className="w-full border-collapse table-auto ">
        <thead className="w-full">
          <tr className="bg-gray-200 w-full">
            <th className="p-2 border text-center xs:text-[13px] sm:text-[15px]">Date</th>
            <th className="p-2 border text-center xs:text-[13px] sm:text-[15px]">Category</th>
            <th className="p-2 border text-center xs:text-[13px] sm:text-[15px] ">Title</th>
            <th className="p-2 border text-center xs:text-[13px] sm:text-[15px]">Description</th>
            <th className="p-2 border text-center xs:text-[13px] sm:text-[15px]">Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr className="even:bg-gray-100 w-full">
              <td className="p-2 border text-center xs:text-[10px] sm:text-[13px]">{expense.date}</td>
              <td className="p-2 border text-center xs:text-[10px] sm:text-[13px] ">Transport</td>
              <tr className="p-2 border text-center xs:text-[10px] sm:text-[13px]">{expense.title}</tr>
              <td className="p-2 border text-center xs:text-[10px] sm:text-[13px]">{expense.description}</td>
              <td className="p-2 border text-center xs:text-[10px] sm:text-[13px]">{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPremium && <button className="p-[2px] my-2 xs:text-[12px] sm:text-[15px] bg-green-500 text-white " onClick={downLoad1}>Download</button>}
      </div>
      <div className="w-full flex flex-col justify-center items-center p-2">
      <h2 className="p-2 xs:text-[13px] sm:text-[15px] font-semibold">Yearly Expense Summary</h2>
      <table ref={tableRef2} className="w-full border-collapse table-auto">
        <thead className="w-full">
          <tr className="bg-gray-200 w-full">
            <th className="p-2 border text-center xs:text-[13px] sm:text-[15px]">Month</th>
            <th className="p-2 border text-center xs:text-[13px] sm:text-[15px]">Income</th>
            <th className="p-2 border text-center xs:text-[13px] sm:text-[15px] ">Expense</th>
            <th className="p-2 border text-center xs:text-[13px] sm:text-[15px]">Savings</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr className="even:bg-gray-100 w-full">
              <td className="p-2 border text-center xs:text-[10px] sm:text-[13px]">March</td>
              <tr className="p-2 border text-center xs:text-[10px] sm:text-[13px]">77852</tr>
              <td className="p-2 border text-center xs:text-[10px] sm:text-[13px]">55</td>
              <td className="p-2 border text-center xs:text-[10px] sm:text-[13px]">100000</td>
            </tr>
          ))}
        </tbody>
      </table>
     {isPremium && <button className="p-[2px] my-2 xs:text-[12px] sm:text-[15px] bg-green-500 text-white " onClick={downLoad2}>Download</button>}
      </div>
      
      
    </div>
  );
};

export default ExpenseTable;
