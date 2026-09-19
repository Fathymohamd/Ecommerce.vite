import React, { useEffect, useState } from "react";

import {
  FiUser,
  FiLock,
  FiGlobe,
  FiBell,
  FiMoon,
  FiTrash2,
  FiEyeOff,
  FiEye,
} from "react-icons/fi";

import { updateProfile, changePassword } from "../../Redux/settingsRedux";

import { Notifications } from "../../Redux/Notifications";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";

import { useTranslation } from "react-i18next";

import { updateDarkMode } from "../../Redux/darkMode";

import { getMe, logout } from "../../Redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
const Settings = () => {
  const [language, setLanguage] = useState("English");
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
      
  const loading = useSelector((state) => state.settings.loading);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.settings.error);
  const errorPassword = useSelector(
    (state) => state.settings.errorPassword
  );
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        dispatch(logout());
      }

      setShowLogoutModal();
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
      updateProfile({
        name: formData.name,
        email: formData.email,
      })
    );

    if (updateProfile.fulfilled.match(resultAction)) {
      toast.success(t("settings.profileUpdatedSuccessfully"));
    }

    setFormData({
      name: "",
      email: "",
    });
  };

  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitPassowrd = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
      changePassword({
        password: passwordData.password,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      })
    );

    if (changePassword.fulfilled.match(resultAction)) {
      toast.success(t("settings.passwordChangedSuccessfully"));

      setPasswordData({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">

        {/* Account */}
        <section className="settings-section">
          <div className="section-title">
            <FiUser />

            <div>
              <h2>{t("settings.account")}</h2>
              <p>{t("settings.managePersonalInformation")}</p>
            </div>
          </div>

          <div className="settings-content">

            {/* Full Name */}
            <div className="input-group">
              <label>{t("settings.fullName")}</label>

              <input
                name="name"
                type="text"
                placeholder={t("settings.enterYourName")}
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <label>{t("settings.emailAddress")}</label>

              <input
                name="email"
                type="email"
                placeholder={t("settings.enterYourEmail")}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Save Button */}
            <button
              type="button"
              className="save-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? t("settings.saving")
                : t("settings.saveChanges")}
            </button>
          </div>
        </section>

        {/* Security */}
        <section className="settings-section">
          <div className="section-title">
            <FiLock />

            <div>
              <h2>{t("settings.security")}</h2>
              <p>{t("settings.keepAccountSecure")}</p>
            </div>
          </div>

          <div className="settings-content">

            {/* Current Password */}
            <div className="input-group">
              <label>{t("settings.currentPassword")}</label>

              <div className="password-input">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("settings.currentPassword")}
                  value={passwordData.password}
                  onChange={handlePasswordChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                >
                  {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="input-group">
              <label>{t("settings.newPassword")}</label>

              <div className="password-input">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder={t("settings.newPassword")}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label>{t("settings.confirmPassword")}</label>

              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder={t("settings.confirmPassword")}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {errorPassword && (
              <div className="error-message">
                {errorPassword}
              </div>
            )}

            <button
              className="save-btn"
              onClick={handleSubmitPassowrd}
            >
              {t("settings.changePassword")}
            </button>
          </div>
        </section>

        {/* Language */}
        <section className="settings-section">
          <div className="section-title">
            <FiGlobe />

            <div>
              <h2>{t("settings.language")}</h2>
              <p>{t("settings.choosePreferredLanguage")}</p>
            </div>
          </div>

          <div className="settings-row">
            <div>
              <strong>{t("settings.language")}</strong>
              <p>{t("settings.selectYourLanguage")}</p>
            </div>

            <select
              value={language}
              onChange={(e) => {
                const lang = e.target.value;
                setLanguage(lang);
                changeLanguage(lang);
              }}
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
        </section>

        {/* Notifications */}
        <section className="settings-section">
          <div className="section-title">
            <FiBell />

            <div>
              <h2>{t("settings.notifications")}</h2>
              <p>{t("settings.controlNotificationPreferences")}</p>
            </div>
          </div>

          <div className="settings-row">
            <div>
              <strong>{t("settings.pushNotifications")}</strong>
              <p>{t("settings.receiveOrderNotifications")}</p>
            </div>

            <label className="switch">
              <input
                name="checkbox"
                type="checkbox"
                checked={notifications}
                onChange={() =>{
                  
                       if (!user) {

      toast.error(t("productsShopNow.pleaseLoginFirst"));

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return;
    }
      
                  dispatch(Notifications(!notifications))
                }}
              />

              <span></span>
            </label>
          </div>
        </section>

        {/* Appearance */}
        <section className="settings-section">
          <div className="section-title">
            <FiMoon />

            <div>
              <h2>{t("settings.appearance")}</h2>
              <p>{t("settings.customizeAppearance")}</p>
            </div>
          </div>

          <div className="settings-row">
            <div>
              <strong>{t("settings.darkMode")}</strong>
              <p>{t("settings.useDarkTheme")}</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
             
                onChange={() =>{
   
                       if (!user) {

      toast.error(t("productsShopNow.pleaseLoginFirst"));

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return;
    }
                  dispatch(updateDarkMode(!darkMode))
                }}
              />

              <span></span>
            </label>
          </div>
        </section>

        {/* Delete Account */}
        <section className="settings-section danger-section">
          <div className="section-title">
            <FiTrash2 />

            <div>
              <h2>{t("settings.deleteAccount")}</h2>
              <p>{t("settings.permanentlyDeleteAccount")}</p>
            </div>
          </div>

          <button
            className="delete-btn"
            onClick={() => setShowLogoutModal(true)}
          >
            {t("settings.deleteAccount")}
          </button>

          {showLogoutModal && (
            <div className="delete-modal-overlay">
              <div className="delete-modal">

                <div className="delete-modal-icon">
                  ⚠️
                </div>

                <h2>{t("settings.deleteAccountQuestion")}</h2>

                <p>
                  {t("settings.deleteAccountWarning")}
                </p>

                <div className="delete-modal-actions">

                  <button
                    className="delete-cancel-btn"
                    onClick={() => setShowLogoutModal(false)}
                  >
                    {t("settings.cancel")}
                  </button>

                  <button
                    className="delete-confirm-btn"
                    onClick={handleDeleteAccount}
                  >
                    {t("settings.deleteAccount")}
                  </button>

                </div>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Settings;