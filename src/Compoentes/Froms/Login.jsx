import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link } from "react-router-dom"
function Login() {
  const navigate = useNavigate()
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
const handleLogin = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
     credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.message);
    return;
  }else {
    setEmail("")
    setPassword("")
setTimeout(()=>{
    navigate("/");
} , 3000)
  }

};
  return (
    <div>
  <form className='form' onSubmit={handleLogin}>
  {error && <p className='error'>{error}</p>}
    <label className='email'>email: </label>
  <input type='email' value={email}   onChange={(e) => setEmail(e.target.value)} name='email'/>
  <label className='password'>password: </label>
  <input type="password" value={password}   onChange={(e) => setPassword(e.target.value)} name='password' />

<div className="login-actions">
  <button type="submit" className="form_Sumbut">
    Login
  </button>
<Link to="/forgotPassword" className='link'><p className="forgot-password">
    Forgot Password?
  </p></Link>
 
</div>
  </form>
    </div>
  )
}

export default Login


