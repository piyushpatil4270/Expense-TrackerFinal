import { useState } from "react";
import "./App.css"
import Navbar from "./components/Navbar";
import SignIn from "./pages/Signin";
import Main from "./pages/Daily";
import SignUp from "./pages/SignUp";
function App() {
  const [isAuth,setIsAuth]=useState(false)
  return (
    <div className="flex flex-col min-h-screen">
      {isAuth ? (
        <>
          <Navbar />
          <div className="flex-grow m-2 w-auto h-full bg-slate-100">
            <Main />
          </div>
        </>
      ) : (
        <SignUp setIsAuthenticated={setIsAuth} />
      )}
    </div>
  );
}

export default App;
