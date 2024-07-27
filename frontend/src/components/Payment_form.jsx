import React, { useState } from 'react'

const Payment_form = () => {
    const [formData,setFormdata]=useState({
        txnid:"",
        amount: '100',
        productinfo: 'Premium Expense Feature',
        firstname: '',
        email: '',
        phone: ''
    })
    const handleChange=(e)=>{
        setFormdata({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await fetch("http://localhost:5500/payu",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({...formData,txnid:'unique_transaction_id_' + new Date().getTime() })
            })
            const payUdata=await response.json()
            const form=document.createElement("form")
            try {
                form.action='http://localhost:5500/payu_response'
            form.method="POST"
            Object.keys(payUdata).forEach(key=>{
                const input=document.createElement("input")
                input.type="hidden"
                input.name=key
                input.value=payUdata[key]
                form.appendChild(input)
            })
            document.body.appendChild(form)
            form.submit()
            .then((res)=>{return res.json()})
            .then((data)=>console.log("The data is ",data))
            } catch (error) {
                console.log(error)
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Pay with PayU</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            placeholder="Amount"
            value={formData.amount}

            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productinfo">
            Product Info
          </label>
          <input
            type="text"
            id="productinfo"
            name="productinfo"
            placeholder="Product Info"
            value={formData.productinfo}
            readOnly

            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Pay with PayU
        </button>
      </form>
    </div>
  )
}

export default Payment_form
