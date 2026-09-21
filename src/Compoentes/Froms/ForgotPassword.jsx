import React from 'react'

import {useState} from 'react'

import { useTranslation } from "react-i18next";

function ForgotPassword() {

  const {t , i18n} = useTranslation()

  const [email, setEmail] = useState("");

  const [error , setError] = useState("")

  const handLeSubmit = async(e)=>{

   try {

     const res = await fetch("https://ecommerce-vite-two.vercel.app/api/users/ForgotPassword" , {

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

       {error && <p id='error'>{error}</p>}

      <div className="forgot-card">

        <h2>{t("forgotPassword.title")}</h2>

        <p>
          {t("forgotPassword.description")}
        </p>

       <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder={t("forgotPassword.emailPlaceholder")}
/>

        <button onClick={handLeSubmit}>
          {t("forgotPassword.sendResetLink")}
        </button>

      </div>

    </div>

      </>

  );
  }


export default ForgotPassword