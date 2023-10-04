import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("farmer"); // Default category is "farmer"
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [farmName, setFarmName] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [farmingActivities, setFarmingActivities] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [processingFacilities, setProcessingFacilities] = useState("");
  const [productionPractices, setProductionPractices] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const navigator = useNavigate();

  // ------------ Already Signed Up --------------
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigator("/");
    }
  });

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSpecializationChange = (event) => {
    setSpecializations(event.target.value.split(",").map((s) => s.trim()));
  };

  const collectData = async () => {
    console.log("this is from collection ");
    // ----------- MongoDB connection -----------------
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      category !== "" &&
      dateOfBirth !== "" &&
      gender !== "" &&
      nationalID !== "" &&
      phoneNumber !== "" &&
      street !== "" &&
      city !== "" &&
      state !== "" &&
      zipCode !== "" &&
      country !== "" &&
      farmName !== "" &&
      farmLocation !== "" &&
      farmSize !== "" &&
      farmingActivities !== "" &&
      experienceYears !== "" &&
      processingFacilities !== "" &&
      productionPractices !== ""
    ) {
      const userData = {
        name,
        email,
        password,
        category,
        personalInfo: {
          dateOfBirth,
          gender,
          nationalID,
        },
        contactInfo: {
          phoneNumber,
          address: {
            street,
            city,
            state,
            zipCode,
            country,
          },
        },
        farmInfo: {
          farmName,
          farmLocation,
          farmSize,
          farmingActivities,
          experienceYears,
        },
        woolInfo: {},
      };

      // Include woolInfo only for the "farmer" category
      if (category === "farmer") {
        userData.woolInfo = {
          processingFacilities,
          productionPractices,
          specializations,
        };
      }

      let result = await fetch("http://localhost:5000/signup", {
        method: "post",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();

      // --------------------Local Storage------------------
      localStorage.setItem("user", JSON.stringify(result));

      // ---------------- Render to Home page -----------------
      navigator("/");
    } else {
      alert("Please enter all required fields");
      navigator("/signup");
    }
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
      <div className="input-form">
        <p>Name:</p>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <p>Email:</p>
        <div>
          <input
            className="inputBox"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <p>Password:</p>
        <div>
          <input
            className="inputBox"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <p>Category:</p>
        <div>
          <select value={category} onChange={handleCategoryChange}>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <p>Date of Birth:</p>
        <div>
          <input
            className="inputBox"
            type="date"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
          />
        </div>
        <p>Gender:</p>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
        </div>
        <p>National ID:</p>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter National ID"
            value={nationalID}
            onChange={(e) => {
              setNationalID(e.target.value);
            }}
          />
        </div>
        <p>Phone Number:</p>
        <div>
          <input
            className="inputBox"
            type="tel"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>
        <p>Address:</p>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </div>
        <p>Farm Name:</p>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Farm Name"
            value={farmName}
            onChange={(e) => {
              setFarmName(e.target.value);
            }}
          />
        </div>
        <p>Farm Location:</p>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Farm Location"
            value={farmLocation}
            onChange={(e) => {
              setFarmLocation(e.target.value);
            }}
          />
        </div>
        <p>Farm Size (Acres):</p>
        <div>
          <input
            className="inputBox"
            type="number"
            placeholder="Enter Farm Size"
            value={farmSize}
            onChange={(e) => {
              setFarmSize(e.target.value);
            }}
          />
        </div>
        <p>Farming Activities:</p>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Farming Activities"
            value={farmingActivities}
            onChange={(e) => {
              setFarmingActivities(e.target.value);
            }}
          />
        </div>
        <p>Experience Years:</p>
        <div>
          <input
            className="inputBox"
            type="number"
            placeholder="Enter Experience Years"
            value={experienceYears}
            onChange={(e) => {
              setExperienceYears(e.target.value);
            }}
          />
        </div>
        {category === "farmer" && (
          <div>
            <p>Processing Facilities:</p>
            <div>
              <input
                className="inputBox"
                type="text"
                placeholder="Enter Processing Facilities"
                value={processingFacilities}
                onChange={(e) => {
                  setProcessingFacilities(e.target.value);
                }}
              />
            </div>
            <p>Production Practices:</p>
            <div>
              <input
                className="inputBox"
                type="text"
                placeholder="Enter Production Practices"
                value={productionPractices}
                onChange={(e) => {
                  setProductionPractices(e.target.value);
                }}
              />
            </div>
            <p>Specializations (comma-separated):</p>
            <div>
              <input
                className="inputBox"
                type="text"
                placeholder="Enter Specializations"
                value={specializations}
                onChange={handleSpecializationChange}
              />
            </div>
          </div>
        )}
        <button type="button" onClick={collectData}>
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <a
            onClick={() => {
              navigator("/login");
            }}
          >
            Click Here to login
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
