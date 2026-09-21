import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa6";

import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

if (!formData.name) {
  setError(t("register.enterYourName"));
  return;
}

if (!formData.email) {
  setError(t("register.enterYourEmail"));
  return;
}

if (!formData.password) {
  setError(t("register.enterYourPassword"));
  return;
}

if (!formData.confirmPassword) {
  setError(t("register.confirmYourPassword"));
  return;
}

    if (formData.password !== formData.confirmPassword) {
      setError(t("register.passwordsDoNotMatch"));
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://ecommerce-vite-two.vercel.app/Sinup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      } else {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setSuccess("Account created successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-header">
          <h1>{t("register.createAccount")}</h1>

          <p>
            {t("register.createAccountAndStartShopping")}
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">
              {t("register.fullName")}
            </label>

            <div
              className={`input-wrapper ${
                i18n.language === "ar" ? "rtl" : "ltr"
              }`}
            >
              <FaUser />

              <input
                id="name"
                type="text"
                name="name"
                placeholder={t("register.enterYourName")}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              {t("register.email")}
            </label>

            <div
              className={`input-wrapper ${
                i18n.language === "ar" ? "rtl" : "ltr"
              }`}
            >
              <FaEnvelope />

              <input
                id="email"
                type="text"
                name="email"
                placeholder={t("register.enterYourEmail")}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              {t("register.password")}
            </label>

            <div
              className={`input-wrapper ${
                i18n.language === "ar" ? "rtl" : "ltr"
              }`}
            >
              <FaLock />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t(
                  "register.enterYourPassword"
                )}
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className={`password-toggle ${
                  i18n.language === "ar" ? "rtl" : "ltr"
                }`}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">
              {t("register.confirmPassword")}
            </label>

            <div
              className={`input-wrapper ${
                i18n.language === "ar" ? "rtl" : "ltr"
              }`}
            >
              <FaLock />

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder={t(
                  "register.confirmYourPassword"
                )}
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                className={`password-toggle ${
                  i18n.language === "ar" ? "rtl" : "ltr"
                }`}
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading
              ? t("register.creatingAccount")
              : t("register.createAccount")}
          </button>
        </form>

        <div className="login-link">
          <span>
            {t("register.alreadyHaveAccount")}
          </span>

          <Link to="/login">
            {t("register.login")}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;