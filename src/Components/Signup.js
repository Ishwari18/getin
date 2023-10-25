import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/.Signup.css";

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: '', number: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    console.log(json);
    if (json.authtoken) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      setShowAlert(true);

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      navigate('/signup');
    } else {
      alert('Sign up failed. Please check the entered information.');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='Signup'>
      {showAlert && (
        <div className="alert alert-success" role="alert">
          Sign up was successful!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name *
          </label>
          <input
            type="text"
            className="form-control"
            value={credentials.name}
            onChange={onChange}
            id="name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Number *
          </label>
          <input
            type="number"
            className="form-control"
            value={credentials.number}
            onChange={onChange}
            id="number"
            name="number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password *
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>

        <button type="submit" className='contact-submitbtn'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
