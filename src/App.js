import React from "react";
import Nav from "./components/Nav";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart.js";
import Home from "./components/Home.js";
import Shop from "./components/Shop.js";
import SignUp from "./components/SignUp";
import PrivateComponents from "./components/PrivateComponents";
import Login from "./components/Login";

const App = () => {
  let auth = localStorage.getItem("user");
  return (
    <div>
      <div className="navbar">
        <BrowserRouter>
          <div className="nav">
            <Nav />
          </div>
          <div className="content-body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateComponents />}>
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/logout" element={<SignUp />} />
              </Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/login" element = {<Login/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
