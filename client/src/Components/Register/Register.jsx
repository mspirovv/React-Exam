import { useRegister } from '../../services/apiService';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from 'react-router';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/userContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match!")
    .required("Confirm Password is required"),
});

export default function Register() {
  const { register: registerUser } = useRegister();
  const { userLoginHandler } = useContext(UserContext);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });


  useEffect(() => {
    if (!hasError) return;

    const timeout = setTimeout(() => setHasError(false), 3000);
    return () => clearTimeout(timeout);
  }, [hasError]);

  const registerHandler = async (data) => {
    setIsSubmitting(true);
    setHasError(false);

    try {
      const authData = await registerUser(data.email, data.password);
      userLoginHandler(authData);
      toast.success("Registration successful!", { position: "top-right" });
      navigate('/catalog');
    } catch (error) {
      setHasError(true);
      toast.error("Registration failed! Please try again.", { position: "top-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="form-box">
          <h2 className="title">Register</h2>
          <form onSubmit={handleSubmit(registerHandler)}>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
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
                {...register("password")}
                className="input-field"
              />
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                className="input-field"
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || hasError}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <div className="text-center">
              <p>Already have an account?</p>
              <Link to='/login'>Login here!</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
