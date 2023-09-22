import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import classes from "./Form.module.css";


const Essential8Form = (props) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    companyName: "",
    phoneNumber: "",
    email: "",
  });

  // Add a new state for the checkbox
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (/\d/.test(userData.name)) {
      alert("Please enter a valid name without numbers.");
      return;
    }
  
    if (/\d/.test(userData.companyName)) {
      alert("Please enter a valid Company Name without numbers.");
      return;
    }

    // Basic validation for phone number (only numbers)
    if (!/^\d+$/.test(userData.phoneNumber) && !/^\d{10}$/.test(userData.phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }
  
    // Basic validation for email (contains @ and .)
    if (!/^.+@.+\..+$/.test(userData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(userData.phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Check if the user has agreed to terms
    if (!isAgreed) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    await props.updateData(userData);
    navigate('/Questionnare');
    setUserData({
      name: "",
      companyName: "",
      phoneNumber: "",
      email: "",
    });
  };
  const handleTermsCondition=()=>{
    navigate('/terms-and-conditions');
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const isFormValid =
    userData.name &&
    userData.companyName &&
    userData.phoneNumber &&
    userData.email;

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes['logo-container']}>
          <img
            src="/Cyber Ethos Logo.png"
            alt="Cyber Ethos Logo"
            width={319.02}
            height={142.92}
            className={classes.logo}
          />
        </div>
      </header>
      <p className={classes['logo-text']}>Essential 8 Assessment</p>
      <form className={classes.input} onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          placeholder="Name"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="text"
          id="company"
          placeholder="Company Name"
          name="companyName"
          value={userData.companyName}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="tel"
          id="phone"
          placeholder="Phone Number"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="email"
          id="email"
          placeholder="Email Address"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
        <br />

        {/* Add the checkbox */}
        <label className={classes.checkboxLabel}>
          <input
            type="checkbox"
            id="agreeCheckbox"
            checked={isAgreed}
            onChange={handleCheckboxChange}
            className={classes.checkbox}
          />
          <div className={classes.checkboxText}>
            By clicking "Start," you agree to our{' '} &nbsp;
            <p
              onClick={handleTermsCondition}
              className={classes.checkboxLink}
            >
              Terms and Conditions
            </p>
            .
          </div>
        </label>
        <br />

        <button
          type="submit"
          id="submitButton"
          className={
            isFormValid && isAgreed ? classes.activeButton : classes.inactiveButton
          }
        >
          Start
        </button>
      </form>
      <div className={`${classes.empty}`}>
        {/* No additional content needed */}
      </div>
    </div>
  );
};

export default Essential8Form;
