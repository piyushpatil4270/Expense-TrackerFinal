import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

import Daily_card from "../components/Daily_card";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Income = () => {
  const [addExp, setaddExp] = useState(false);
  const [isExp, setIsExp] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);
  const [showDesc,setShowdesc]=useState(false)

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
    const userToken = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:5500/expense/delete/${id}`,
      {},
      {
        headers: { Authorization: userToken },
      }
    );
    fetchExpenses();
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
                <Daily_card title={expense.title} description={expense.description} />

                <div className="flex gap-5 items-center">
                  <span className="mx-2 text-black xs:text-[12px] sm:text-[15px]">
                    ${expense.amount}
                  </span>
                  <DeleteOutlineIcon  fontSize="5" style={{marginLeft:"8px",marginRight:'8px'}} onClick={() => handleDelete(expense.id)} />
                  
                </div>
              </div>
            );
          })}
        {}
      </div>
      {addExp && (
        <div className="hide-scrollbar max-w-[90%] md:w-[50%] lg:w-[30%] rounded-lg shadow-lg bg-white p-6 mx-auto relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setaddExp(false)}
          >
            &times;
          </button>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-around p-3 border-b">
              <div>
                <span
                  className={`px-3 py-1 border-b-2 ${
                    isExp
                      ? "border-cyan-500 text-cyan-500"
                      : "border-transparent text-gray-500"
                  } cursor-pointer`}
                  onClick={() => setIsExp(true)}
                >
                  Expense
                </span>
              </div>
              <div>
                <span
                  className={`px-3 py-1 border-b-2 ${
                    !isExp
                      ? "border-cyan-500 text-cyan-500"
                      : "border-transparent text-gray-500"
                  } cursor-pointer`}
                  onClick={() => setIsExp(false)}
                >
                  Income
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 mt-4">
              <div className="flex items-center">
                <span className="w-[25%] text-[14px] text-gray-700">Title</span>
                <input
                  className="flex-1 outline-none p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="w-[25%] text-[14px] text-gray-700">
                  Details
                </span>
                <input
                  className="flex-1 outline-none p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="w-[25%] text-[14px] text-gray-700">
                  Amount
                </span>
                <input
                  type="number"
                  min="0"
                  step={1}
                  className="flex-1 outline-none p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="w-[25%] text-[14px] text-gray-700">
                  Category
                </span>
                <select
                  className="flex-1 outline-none p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                </select>
              </div>
            </div>
            <div className="w-full flex justify-center mt-4">
              <button
                className="bg-cyan-500 text-white px-4 py-2 rounded-md"
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
