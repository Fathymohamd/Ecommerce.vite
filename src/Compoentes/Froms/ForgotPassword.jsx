import React from 'react'
import {useState} from 'react'
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error , setError] = useState("")
  const handLeSubmit = async(e)=>{
   try {
     const res = await fetch("https://ecommerce-vite-fgou.vercel.app/api/users/ForgotPassword" , {
       method: "POST",
      credentials: "include",
       headers : { "Content-Type": "application/json"},
       body : JSON.stringify({email})
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.message);
       return
    }else {
      setError(data.message);
      setEmail("")
    }
   }catch(error){
    console.log(error)
   }
   }

    return (
      <>
   
    <div className="forgot-container">
       {error && <p className='error' id='error'>{error}</p>}
      <div className="forgot-card">
        <h2>Forgot Password</h2>
       
        <p>
          Enter your email address and we'll send you a password reset link.
        </p>

       <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
/>

        <button onClick={handLeSubmit}>Send Reset Link</button>
      </div>
    </div>
      </>
   
  );

  }
 


export default ForgotPassword