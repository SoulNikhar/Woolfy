import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigator = useNavigate();

  //  ------------ Already SignUp --------------
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigator("/");
    }
  });

  const collectData = async () => {
    console.log("this is from collection ");
    //  ----------- ------ MongoDb connection -----------------
    if (name !== "" && email !== "" && password !== "") {
      let result = await fetch("http://localhost:5000/signup", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();

      // --------------------Local Storage------------------

      localStorage.setItem("user", JSON.stringify(result));

      //  ---------------- Render to Home pagee -------------

      navigator("/");
    } else {
      navigator("/signup");
    }
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
      <div className="input-form">
        <p>
          Name:
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          ></input>
        </p>
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
        <button type="button" onClick={collectData}>
          Sign Up
        </button>
        <p>  Already have an account ?? <a onClick={()=>{navigator("/login")}}>Click Here to login</a> </p>
      </div>
    </div>
  );
};

export default SignUp;
