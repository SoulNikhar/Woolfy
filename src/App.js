import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import "./App.css";
import Cart from "./components/Cart.js";
import Home from "./components/Home.js";
import Shop from "./components/Shop.js";
import SignUp from "./components/SignUp";
import PrivateComponents from "./components/PrivateComponents";
import Login from "./components/Login";

// Import dashboard components
import BuyerDashboard from "./components/dashboard/BuyerDashboard.js";
import ProcessorDashboard from "./components/dashboard/ProcessorDashboard.js";
import ProducerDashboard from "./components/dashboard/ProducerDashboard.js";

const App = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const category = auth ? auth.category : "";

  return (
    <div>
      <div className="navbar">
        <BrowserRouter>
          <div className="nav">
            <Nav />
          </div>
          <div className="content-body">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route element={<PrivateComponents />}>
                <Route
                  path="/"
                  element={
                    category === "farmer" ? (
                      <ProducerDashboard />
                    ) : category === "buyer" ? (
                      <BuyerDashboard />
                    ) : category === "processor" ? (
                      <ProcessorDashboard />
                    ) : (
                      <Home/>
                    )
                  }
                />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/logout" element={<SignUp />} />
                <Route path="/Buyerdashboard" element={<BuyerDashboard />} />
                <Route
                  path="/Processordashboard"
                  element={<ProcessorDashboard />}
                />
                <Route
                  path="/Producerdashboard"
                  element={<ProducerDashboard />}
                />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
