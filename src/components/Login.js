import { wait } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigator = useNavigate();

  const handleLogin = async () => {
    console.warn(email, password);
    if (email !== "" && password !== "") {
      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      console.log(result);
      if (result.email) {
        localStorage.setItem("user", JSON.stringify(result));
        let category = result.category;
        category === "farmer" ? (
          navigator("/producerdashboard")
        ) : category === "buyer" ? (
          navigator("/buyerdashboard")
        ) : (
          navigator("/processordashboard")
        )
        
      } else {
        alert("Entered Invalid Information ");
      }
    }
  };

  return (
    <div className="signup">
      <h1>Login</h1>
      <div className="input-form">
        <p>
          Email:
          <input
            className="inputBox"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          ></input>
        </p>
        <p>
          Password:
          <input
            className="inputBox"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </p>
        <button type="button" onClick={handleLogin}>
          Sign Up
        </button>
        <p>
           
          Create an new account ?? 
          <a
            onClick={() => {
              navigator("/signup");
            }}
          >
            Click Here for signUp
          </a> 
        </p>
      </div>
    </div>
  );
};

export default Login;
