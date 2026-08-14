import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Sinup() {
  const {t } = useTranslation()
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("https://ecommerce-vite-9iwf.vercel.app/Sinup" , {
    method: "POST",
     headers : {
       "Content-Type": "application/json",
     },
     body : JSON.stringify({
      firstName,
      email,
      password,
     })
    })
    const data = await res.json();
      if (!res.ok) {
    setError(data.message);
    return;
  } else{
  
     setfirstName(""),
    setEmail(""),
    setPassword(""),
   
      setTimeout(()=>{
  navigate("/login");
} , 3000)
  }

  };

  return (
    <div>
      <form className="form" onSubmit={handleSignup}>
         {error && (<p className="error">{error}</p>)}
        <label className="Fris_Name">{t("Firs_Name")}</label>
        <input name="firstName"
          type="text" placeholder={t("Firs_Name")}
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
        />

        <label className="email">{t("Email")} :</label>
        <input name="email" placeholder={t("Email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="password">{t("Password")}</label>
    <input
  type="password"
  name="password" placeholder={t("Password")}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
<div className="login-actions">
 <button className="form_Sumbut" type="submit">
          {t("Sign Up")}
        </button>
  
</div>
       
      </form>
    </div>
  );
}

export default Sinup;