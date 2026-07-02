import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sinup() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/Sinup" , {
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
  }
  setTimeout(()=>{
  navigate("/login");
} , 3000)

  };

  return (
    <div>
      <form className="form" onSubmit={handleSignup}>
         {error && (<p className="error">{error}</p>)}
        <label className="Fris_Name">Fris_Name:</label>
        <input name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
        />

        <label className="email">Email:</label>
        <input name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="password">Password:</label>
    <input
  type="password"
  name="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

        <button className="form_Sumbut" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Sinup;