
import { useRegister } from '../../services/apiService';
// import AuthContext from "../../contexts/authContext";
import './Register.css'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from 'react-router';

export default function Register() {

  const { register } = useRegister()

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup .string() .oneOf([yup.ref("password"), null], "Passwords must match!") .required("Confirm Password is required!S"),
});

  const registerHandler = async (formData) => {
    const { email,password } = Object.fromEntries(formData);
    const confirmPassword = formData.get('confirm-password');
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    
    // const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
      console.log('Password missmatch!');

      return;
    }
    const authData = await register(email,password);
    console.log ('reg succesfull!')
  }

  return (
      <>
    <div className="register-container">
      <div className="form-box">
        <h2 className="title">Register</h2>
        <form action={registerHandler}>
          <div className="input-group">
            <label htmlFor='email'>Email:</label>
            <input type="email" id='email' name='email' className="input-field" />
            {/* {errors.email && <p className="error-text">{errors.email.message}</p>} */}
          </div>

          <div className="input-group">
            <label htmlFor='password'>Password:</label>
            <input type="password" id='password' name='password' className="input-field" />
            {/* {errors.password && <p className="error-text">{errors.password.message}</p>} */}
          </div>

          <div className="input-group">
            <label htmlFor='confirm-pasword'>Confirm Password:</label>
            <input type="password" id='confirm-password' name='confirm-password' className="input-field" />
            {/* {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>} */}
            </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
          <p class="text-center"> 
           <p> Already have an account? </p>
            <Link to='/login'>Login here!</Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );

}