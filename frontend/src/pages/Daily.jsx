import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

const Income = () => {
  const [addExp, setaddExp] = useState(false);
  const [isExp, setIsExp] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);

  const handleExpense = async () => {
    try {
      if (title === "" || amount === "") {
        alert("All Fields are Mandatory");
        return;
      }
      setaddExp(false);
      const userToken = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5500/expense/add",
        {
          category: category,
          amount: amount,
          title: title,
          description: details,
        },
        { headers: { Authorization: userToken } }
      );
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const userToken=localStorage.getItem("token")
    const res=await axios.post(`http://localhost:5500/expense/delete/${id}`,{}, {
      headers: { Authorization: userToken },
    },
  )
  fetchExpenses()
  };

  const fetchExpenses = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5500/expense/all", {
        headers: { Authorization: userToken },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 mt-2 justify-center items-center hide-scrollbar">
      <div className="flex flex-col items-center w-full px-4 py-4 gap-4">
        <div className="w-full flex justify-between bg-slate-300">
          <span className="m-1 text-black xs:text-[14px] sm:text-[18px]">
            Total Expense:
          </span>
          <span className="m-1 text-black xs:text-[14px] text-[18px]">
            $45555
          </span>
        </div>
        {data &&
          data?.map((expense) => {
            return (
              <div className="w-full flex justify-between ">
                <span className="mx-2 text-black xs:text-[12px] sm:text-[15px]">
                  {expense.title}
                </span>
                <div className="flex gap-5">
                  <span className="mx-2 text-black xs:text-[12px] sm:text-[15px]">
                    ${expense.amount}
                  </span>
                  <button
                    className="bg-red-600 text-white w-5 h-5 text-[10px] rounded-full"
                    onClick={() => handleDelete(expense.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
        {}
      </div>
      {addExp && (
        <div className="hide-scrollbar max-w-[90%] md:w-[50%] lg:w-[30%] rounded-sm gap-4 flex flex-col justify-center items-center bg-[#e5e4df] p-4 mx-auto relative">
          <button
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            onClick={() => setaddExp(false)}
          >
            X
          </button>
          <div className="w-full flex flex-col gap-4 items-center">
            <div className="w-full flex items-center justify-around gap-5 p-3">
              <div>
                <span
                  className={`px-2 py-[2px] border-0 text-[14px] ${
                    isExp ? "border-cyan-400" : ""
                  } border-b-[2px] cursor-pointer`}
                  onClick={() => setIsExp(true)}
                >
                  Expense
                </span>
              </div>
              <div>
                <span
                  className={`px-2 py-[2px] text-[14px] border-0 ${
                    !isExp ? "border-cyan-400" : ""
                  } border-b-[2px] cursor-pointer`}
                  onClick={() => setIsExp(false)}
                >
                  Income
                </span>
              </div>
            </div>

            <div className="w-full flex items-center justify-between gap-2">
              <span className="w-[25%]  xs:text-[12px] sm:text-[14px] ">
                Title
              </span>
              <input
                className="flex-1 outline-none p-1 border border-gray-300 rounded-sm"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="w-full flex items-center justify-between gap-2">
              <span className="w-[25%]  xs:text-[12px] sm:text-[14px] ">
                Details
              </span>
              <input
                className="flex-1 outline-none p-1 border border-gray-300 rounded-sm"
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <div className="w-full flex items-center justify-between gap-2">
              <span className="w-[25%]  xs:text-[12px] sm:text-[14px] ">
                Amount
              </span>
              <input
                type="number"
                min="0"
                step={1}
                className="flex-1 outline-none p-1 border border-gray-300 rounded-sm"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="w-full flex items-center justify-between gap-2">
              <span className="w-[25%]  xs:text-[12px] sm:text-[14px] ">
                Category
              </span>
              <select
                className="outline-none w-[75%] xs:text-[12px] sm:text-[14px] p-1 bg-white border border-gray-300 rounded-sm"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
              </select>
            </div>

            <div className="w-full flex items-center justify-center gap-2 mt-4">
              <button
                className="bg-cyan-300 w-fit px-4 py-2 text-[12px] rounded-md"
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
