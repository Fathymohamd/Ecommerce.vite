import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

function Sinup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 const [success, setSuccess] = useState("");
  const signUp = async () => {
    if (!email) return setError("من فضلك ادخل الاميل");
    if (!password) return setError("من فضلك ادخل كلمة المرور");
    setError("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

     if (error) {
     setError(error.message); 
  } else {
    setSuccess("تم انشاء الحساب بنجاح"); 
  setEmail("");
  setPassword("");
   setTimeout(()=>{ navigate("/login")} , 4000)
  }
  };

  return (
    <div>
      <form className="form" onSubmit={(e) => e.preventDefault()}>

        <label className='email'>Email:</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className='password'>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <h1 className="supabase_And">{error}</h1>}
        {success && <h1 className="supabase_And">{success}</h1>}
   <button onClick={signUp} className="form_Sumbut" >
   Sign Up
</button>
      
      </form>
    </div>
  );
}

export default Sinup;


