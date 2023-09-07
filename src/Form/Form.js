import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import classes from "./Form.module.css";

const Essential8Form = (props) => {
    const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    companyName: "",
    phoneNumber: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.updateData(userData);
    navigate('/Questionnare');
    setUserData({
      name: "",
      companyName: "",
      phoneNumber: "",
      email: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid =
    userData.name &&
    userData.companyName &&
    userData.phoneNumber &&
    userData.email;

  return (
    <div className={classes.container} >
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
        <button
          type="submit"
          id="submitButton"
          className={
            isFormValid ? classes.activeButton : classes.inactiveButton
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
