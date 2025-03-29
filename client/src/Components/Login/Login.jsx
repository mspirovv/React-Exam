
import { useLogin } from "../../services/apiService";
import { UserContext } from "../../contexts/userContext";

import React from "react";
import './Login.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { useActionState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useLogin();
  const { userLoginHandler } = useContext(UserContext);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const loginHandler = async (_, formData) => {
    const { email, password } = Object.fromEntries(formData);

    const authData = await login(email, password);

    userLoginHandler(authData);
    navigate(-1)

    console.log('login succesful')
  };

  const [_, loginAction, isPending] = useActionState(loginHandler, { email: '', password: '  ' });

  return (
    <div className="login-container">
      <div className="form-box">
        <h2 className="title">Login</h2>
        <form action={loginAction}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="input-field" />
            {/* {errors.email && <p className="error-text">{errors.email.message}</p>} */}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" className="input-field" />
            {/* {errors.password && <p className="error-text">{errors.password.message}</p>} */}
          </div>

          <button type="submit" className="submit-btn">Login</button>
          <div className="text-center">
            <p>Don't have an account?</p>
            <Link to='/register'>Register here!</Link>
          </div>

        </form>

      </div>
    </div>
  );
}
