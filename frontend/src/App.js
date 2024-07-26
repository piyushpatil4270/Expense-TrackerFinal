import { useState } from "react";
import "./App.css"
import Navbar from "./components/Navbar";
import SignIn from "./pages/Signin";
import Main from "./pages/Daily";
import SignUp from "./pages/SignUp";
import {Routes,Route} from "react-router-dom"
function App() {
  const [isAuth,setIsAuth]=useState(false)
  return (
    <div className="flex flex-col min-h-screen">
      {isAuth ? (
        <>
          <Navbar />
          <div className="flex-grow m-2 w-auto h-full bg-slate-100">
            <Routes>
              <Route path="/" element={<Main />} />
           
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<SignUp setIsAuth={setIsAuth} />} />
          <Route path="/signin" element={<SignIn />} />
         
        </Routes>
      )}
    </div>
  );
}

export default App;
