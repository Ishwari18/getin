import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import CategoryState from "./context/categories/CategoryState";
import CategoryPage from "./Components/pages/CategoryPage";
import EighteenPlusCategory from "./Components/pages/EighteenPlusCategory"
import EighteenPlusUser from "./Components/pages/EighteenPlusUser";
import Profile from "./Components/pages/Profile";
import { AddServicespage } from "./Components/pages/AddServicespage";

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
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/category/18plus/:categoryId" element={<EighteenPlusCategory />} />
            <Route path="/category/:categoryId/user/:userId" element={<EighteenPlusUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sell" element={<AddServicespage />} />
          </Routes>
         
        </BrowserRouter>
      </CategoryState>
    </>
  );
}

export default App;
