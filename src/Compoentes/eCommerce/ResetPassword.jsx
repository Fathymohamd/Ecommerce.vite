import React, { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  const { t } = useTranslation();

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
        `http://localhost:5000/api/reset-password/${token}`,
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

          <input
            type="password"
            placeholder={t("resetPassword.newPassword")}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder={t("resetPassword.confirmPassword")}
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button type="submit">
            {t("resetPassword.changePassword")}
          </button>

        </form>

      </div>

    </div>

  );

}

export default ResetPassword;