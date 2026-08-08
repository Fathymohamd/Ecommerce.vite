import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
function Login() {
  const {t} = useTranslation()
  const navigate = useNavigate()
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
const handleLogin = async (e) => {
  e.preventDefault();

  const res = await fetch("https://ecommerce-vite-fgou.vercel.app/login", {
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
    <label className='email'>{t("Email")} :</label>
  <input type='email' value={email}  placeholder={t("Email")}  onChange={(e) => setEmail(e.target.value)} name='email'/>
  <label className='password'>{t("Password")} </label>
  <input type="password" value={password}  placeholder={t("Password")} onChange={(e) => setPassword(e.target.value)} name='password' />

<div className="login-actions">
  <button type="submit" className="form_Sumbut">
     {t("Login")}
  </button>
<Link to="/forgotPassword" className='link'><p className="forgot-password">
    {t("Forgot Password?")}
  </p></Link>
 
</div>
  </form>
    </div>
  )
}

export default Login


