import React from 'react'
import { supabase } from './supabaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const signIn = async () => {
  if (!email) return setError("من فضلك ادخل الاميل");
    if (!password) return setError("كلمة المرور غير صحيحة");
    setError("");
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
      setError(error.message); 
  }else {
   setError("تم تسجيل الدخول بنجاح");
   setTimeout(()=>{ navigate("/")} , 4000) 
  } 
};
  return (
    <div>
  <form className='form'>

    <label className='email'>email: </label>
  <input type='email'   value={email} onChange={(e) => setEmail(e.target.value)} required/>
  <label className='password'>password: </label>
  <input type="password"  value={password} onChange={(e)=> setPassword(e.target.value)} required/>
       {error && <h1 className="supabase_And">{error}</h1>}
<div className="form_Sumbut" onClick={signIn}>Login</div>
  </form>
    </div>
  )
}

export default Login



// const logout = async () => {
//   await supabase.auth.signOut();
// };


// const getUser = async () => {
//   const { data: { user } } = await supabase.auth.getUser();
//   console.log(user);
// };