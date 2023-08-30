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
    // console.log(userData);
    await props.updateData(userData);
    // console.log(props.userData);
    navigate('/Questionnare');
    // try {
    //   const response = await axios.post('https://formbackend-as4m.onrender.com/form/add', userData);
    //   console.log('POST: user is added', response.data);

    //   // Redirect after successful submission
    //   window.location.href = '';
    // } catch (error) {
    //   console.error(error);
    // }

    // Reset form fields
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
    <div className={classes.container}>
      <h1 className={classes.heading1}>Essential 8 Assessment</h1>
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
    </div>
  );
};

export default Essential8Form;
