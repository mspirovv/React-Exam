import { useLogin } from "../../services/apiService";
import { UserContext } from "../../contexts/userContext";
import React, { useState } from "react";
import './Login.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useLogin();
  const { userLoginHandler } = useContext(UserContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const loginHandler = async (data) => {
    setIsSubmitting(true);

    try {
      const { email, password } = data;
      const authData = await login(email, password);

      userLoginHandler(authData);
      toast.success("Login successful!", { position: "top-right" });
      navigate(-1);
    } catch (error) {

      toast.error(error.message || "Login failed! Please try again.", { position: "top-right" });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  return (
    <div className="login-container">
      <div className="form-box">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit(loginHandler)}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              className="input-field"
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password")}
              className="input-field"
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            Login
          </button>

          <div className="text-center">
            <p>Don't have an account?</p>
            <Link to='/register'>Register here!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
