import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import '../Styles/SignUp.css';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange =  (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://auth-backend-rsrp.onrender.com/api/auth/signup', formData)
      

      if (response.status === 201) {
        toast.success("Signup successful! Please log in.");
        navigate('/Login');
      }

    } 
    catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="login-link">
        Already signed up? <NavLink to="/login">Log in</NavLink>
      </p>
    </div>
  );
}

export default SignUp;
