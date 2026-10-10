
import React, { useEffect, useState } from "react";
import { getMe, logout } from "../../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../Redux/settingsRedux";
import { updateSettings } from "../../Redux/settingsStoreName";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function AdminSettings() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const user = useSelector((state) => state.auth.user);
  const { settings, loading, errors } = useSelector(
    (state) => state.settings
  );

  const [error, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [settingsData, setSettingsData] = useState({
    setting: "",
    currency: "EGP",
  });

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (settings) {
      setSettingsData({
        setting: settings.setting || "",
        currency: settings.currency || "EGP",
      });
    }
  }, [settings]);

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-two.vercel.app/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        dispatch(logout());
      } else {
        toast.error(t("adminSettings.logoutFailed"));
      }
    } catch (error) {
      console.log(error);
      toast.error(t("adminSettings.somethingWentWrong"));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error(t("adminSettings.fillAllFields"));
      return;
    }

    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error(t("adminSettings.invalidEmail"));
      return;
    }

    const resultAction = await dispatch(
      updateProfile({
        name: formData.name.trim(),
        email,
      })
    );
   setFormData({
      name: "",
      email: "",
    });
  
    if (updateProfile.fulfilled.match(resultAction)) {
      toast.success(t("adminSettings.profileUpdatedSuccessfully"));
    } else {
      setErrors(
        resultAction.payload || t("adminSettings.somethingWentWrong")
      );
    }
  };

  const handleChangesetting = (e) => {
    const { name, value } = e.target;

    setSettingsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitsetting = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!settingsData.setting.trim()) {
      toast.error(t("adminSettings.storeNameRequired"));
      return;
    }

    if (!settingsData.currency) {
      toast.error(t("adminSettings.currencyRequired"));
      return;
    }

    try {
      await dispatch(
        updateSettings({
          setting: settingsData.setting.trim(),
          currency: settingsData.currency,
        })
      ).unwrap();
       setSettingsData({
    setting: "",
    currency: "",
  })

      toast.success(t("adminSettings.settingsUpdatedSuccessfully"));
    } catch (error) {
    
      toast.error(
        typeof error === "string"
          ? error
          : t("adminSettings.somethingWentWrong")
      );
    }
  };

  return (
    <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="admin-page-title">
        <h1>{t("adminSettings.title")}</h1>
        <p>{t("adminSettings.description")}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {successMessage && (
        <div className="error-message">{successMessage}</div>
      )}

      {errors && (
        <div className="error-message">
          {typeof errors === "string" ? errors : ""}
        </div>
      )}

      <div className="admin-settings-grid">
        <div className="admin-form-card">
          <h2>{t("adminSettings.adminProfile")}</h2>

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>{t("adminSettings.name")}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("adminSettings.enterName")}
              />
            </div>

            <div className="admin-form-group">
              <label>{t("adminSettings.email")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("adminSettings.enterEmail")}
              />
            </div>

            <button
              type="submit"
              className="admin-primary-btn"
              disabled={loading}
            >
              {t("adminSettings.saveProfile")}
            </button>
          </form>
        </div>

        <div className="admin-form-card">
          <h2>{t("adminSettings.websiteSettings")}</h2>

          <form onSubmit={handleSubmitsetting}>
            <div className="admin-form-group">
              <label>{t("adminSettings.storeName")}</label>
              <input
                type="text"
                name="setting"
                value={settingsData.setting}
                onChange={handleChangesetting}
                placeholder={t("adminSettings.enterStoreName")}
              />
            </div>

            <div className="admin-form-group">
              <label>{t("adminSettings.currency")}</label>
              <select
                name="currency"
                value={settingsData.currency}
                onChange={handleChangesetting}
              >
                <option value="EGP">EGP</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <button type="submit" className="admin-primary-btn">
              {t("adminSettings.saveSettings")}
            </button>
          </form>
        </div>
      </div>

      <div className="admin-logout-section">
        <h2>{t("adminSettings.logout")}</h2>
        <p>{t("adminSettings.logoutDescription")}</p>

        <button
          type="button"
          className="admin-logout-danger"
          onClick={handleDeleteAccount}
        >
          {t("adminSettings.logoutButton")}
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;

