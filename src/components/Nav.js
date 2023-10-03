import React from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  let auth = localStorage.getItem("user");
  let navigate = useNavigate();
  let logOutUser = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <ul>
          {!auth ? (
            <>
              <p><Link Link to="/signup">SignUp </Link></p>
              <p><Link to="/login">Login</Link></p>
            </>
          ) : (
            <>
              <p><Link to="/">Dashboard</Link>
              </p>
              <p><Link to="/shop">Shop</Link>
              </p>
              <p><Link to="/cart">Cart</Link>
              </p>
              <Link to="/logout" onClick={logOutUser}>Logout <a>({JSON.parse(auth).name})</a> </Link>
            </>
          )}
      </ul>
    </div>
  );
};

export default Nav;
