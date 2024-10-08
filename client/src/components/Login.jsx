import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';

const Login = ({ setRoleG }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = () => {
    axios.post('https://book-store-backend-z5yv.onrender.com/api/auth/login', { username, password, role })
      .then(res => {
        if (res.data.login && res.data.role == 'admin') {
          setRoleG('admin');
          navigate('/dashboard');
        }
        else if (res.data.login && res.data.role == 'student') {
          setRoleG('student');
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='login-page'>
      <div className="login-container">
        <h2>Login</h2> <br />
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input type="text" placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role: </label>
          <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className='btn-login' onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login
