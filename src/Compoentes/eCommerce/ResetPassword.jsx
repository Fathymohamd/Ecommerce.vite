import React, { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
function ResetPassword() {
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();

  const navigate = useNavigate();

const { t, i18n } = useTranslation();

const isArabic = i18n.language === "ar";

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password == "" && confirmPassword == "") {

      setMessage(
        t("resetPassword.passwordRequired")
      );

      return;
    }

    if (password !== confirmPassword) {

      setMessage(
        t("resetPassword.passwordsDoNotMatch")
      );

      return;
    }

    try {

      const res = await fetch(
        `https://ecommerce-vite-two.vercel.app/api/reset-password/${token}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            password,
            token,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        setMessage(data.message);

        return;

      } else {

        setMessage(data.message);

        setPassword("");

        setConfirmPassword("");

        setTimeout(() => {

          navigate("/Login");

        }, 3000);

      }

    } catch (error) {

      setMessage(
        t("resetPassword.somethingWentWrong")
      );

    }

  };

  return (

    <div className="reset-container">

      <div className="reset-card">

        <h2>
          {t("resetPassword.title")}
        </h2>

        <p>
          {t("resetPassword.description")}
        </p>

        {message && (
          <p className="message">
            {message}
          </p>
        )}
<form onSubmit={handleSubmit}>

  <div className="password-input-wrapper">

    <input
      type={showPassword ? "text" : "password"}
      placeholder={t("resetPassword.newPassword")}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      type="button"
         className={`password-toggle ${
                  i18n.language === "ar" ? "rtl" : "ltr"
                }`}
  
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOff size={18} />
      ) : (
        <Eye size={18} />
      )}
    </button>

  </div>

  <div className="password-input-wrapper">

    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder={t("resetPassword.confirmPassword")}
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />

    <button
      type="button"
        className={`password-toggle ${
                  i18n.language === "ar" ? "rtl" : "ltr"
                }`}
  
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
    >
      {showConfirmPassword ? (
        <EyeOff size={18} />
      ) : (
        <Eye size={18} />
      )}
    </button>

  </div>

  <button type="submit">
    {t("resetPassword.changePassword")}
  </button>

</form>

      </div>

    </div>

  );

}

export default ResetPassword;