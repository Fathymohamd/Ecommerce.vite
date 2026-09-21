import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/authSlice";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    if (!formData.email) {
      setError(t("login.enterYourEmail"));
      return;
    }
   if (!formData.password) {
      setError(t("login.enterYourPassword"));
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        "https://ecommerce-vite-two.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || t("login.invalidCredentials")
        );
        return;
      }

      setFormData({
        email: "",
        password: "",
      });

      setSuccess(t("login.loginSuccessful"));

      console.log("DATA:", data);
      console.log("USER:", data.user);

      dispatch(setUser(data.user));

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(error);
      setError(t("login.serverError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1>{t("login.welcomeBack")}</h1>
          <p>{t("login.loginToAccount")}</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              {t("login.email")}
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
                placeholder={t("login.enterYourEmail")}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              {t("login.password")}
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
                placeholder={t("login.enterYourPassword")}
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

          {/* Forgot Password */}
          <div className="forgot-password">
            <Link to="/forgotPassword">
              {t("login.forgotPassword")}
            </Link>
          </div>

        
         {error && (
            <div className="error-message">
              {error}
            </div>
          )}

         
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

         
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? t("login.loggingIn")
              : t("login.login")}
          </button>
        </form>

        <div className="register-link">
          <span>{t("login.dontHaveAccount")}</span>

          <Link to="/register">
            {t("login.createAccount")}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;