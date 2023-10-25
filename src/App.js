import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Footer } from "./Components/Footer";
import Home from "./Components/Home";
import CategoryState from "./context/categories/CategoryState";

function App() {
  return (
    <>
      <CategoryState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />{" "}
            <Route path="/login" element={<Login />} />{" "}
            {/* Corrected path for Login */}
            <Route path="/signup" element={<Signup />} />{" "}
            {/* Corrected path for Signup */}
          </Routes>
         
        </BrowserRouter>
      </CategoryState>
    </>
  );
}

export default App;
