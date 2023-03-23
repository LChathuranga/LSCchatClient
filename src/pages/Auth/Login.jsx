import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  handleLoginFormValidation,
  handleResponseData,
} from "../../utils/Validations";
import axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) navigate("/");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleLoginFormValidation({ values: values })) {
      const { password, userName } = values;
      const { data } = await axios.post(loginRoute, {
        userName,
        password,
      });
      if (handleResponseData({ data })) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>LCLS Chat</h1>
          </div>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            id=""
            onChange={(e) => handleChange(e)}
            min={3}
          />

          <input
            type="password"
            name="password"
            placeholder="User Password"
            id=""
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login User</button>
          <span>
            don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: #fff;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1 rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: #fff;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      curser: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: #fff;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: none;
      }
    }
  }
`;

export default Login;
