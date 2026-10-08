import { getMe, logout } from "../../Redux/authSlice";
import React, { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";

import { updateProfile } from "../../Redux/settingsRedux";

import { useTranslation } from "react-i18next";
import { updateSettings } from "../../Redux/settingsStoreName";
import { toast } from "react-hot-toast";

function AdminSettings() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
   const { settings, loading, errors } = useSelector(
    (state) => state.settings
  );

  
  const  dispatch  = useDispatch();

  const [error , setErrors] = useState("")
  const [successMessage , setSuccessMessage] = useState("")

    useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch("https://ecommerce-vite-two.vercel.app/logout", {
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

  const user = useSelector((state) => state.auth.user);


  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

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
  if (!formData.name.trim() && !formData.email.trim()) {
    setErrors(t("profile.fillAllFields"));
    return;
  }
  
  if (!formData.name.trim()) {
    setErrors(t("profile.nameRequired"));
    return;
  }
  
if (!formData.email.trim()) {
  setErrors(t("profile.emailRequired"));
  return;
}

const email = formData.email.trim();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  setErrors(t("profile.invalidEmail"));
  return;
}
      const resultAction = await dispatch(
        updateProfile({
          name: formData.name,
          email: formData.email,
        })
      );
  
      if (updateProfile.fulfilled.match(resultAction)) {
        toast.success(t("settings.profileUpdatedSuccessfully"));
      }
    setErrors("")
      setFormData({
        name: "",
        email: "",
      });
    };
  
  const [settingsData , setsettingsData] = useState({
  setting : settings?.setting || "",
  currency : settings?.currency || "EGP"
  })

    const handleChangesetting = (e) => {
    const { name, value } = e.target;

    setsettingsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmitsetting = async (e) => {
  e.preventDefault();

  try {
    if (!settingsData.setting.trim()) {
      setSuccessMessage("Please enter store name");
      return;
    }

    if (!settingsData.currency) {
      setSuccessMessage("Please select currency");
      return;
    }

    const resultAction = await dispatch(
      updateSettings({
        setting: settingsData.setting,
        currency: settingsData.currency,
      })
    ).unwrap();

    if (updateSettings.fulfilled.match(resultAction)) {
      toast.success(t("settings.profileUpdatedSuccessfully"));

      setSuccessMessage("");

      setsettingsData({
        setting: "",
        currency: "",
      });
    }

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>

      <div className="admin-page-title">
        <h1>Settings</h1>
        <p>Manage your account and website settings</p>
      </div>



        {error && (
              <div className="error-message">
                {error}
              </div>
            )}
     {successMessage && (
              <div className="error-message">
                {successMessage}
              </div>
            )}
<div className="admin-settings-grid">

  <div className="admin-form-card">
  <h2>Admin Profile</h2>

  <form onSubmit={handleSubmit}>

    <div className="admin-form-group">
      <label>Name</label>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
    </div>

    <div className="admin-form-group">
      <label>Email</label>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        
      />
    </div>

    <button
      type="submit"
      className="admin-primary-btn"
    >
      Save Profile
    </button>

  </form>
</div>

   
        <div className="admin-form-card">
          <h2>Website Settings</h2>

          <form onSubmit={handleSubmitsetting}>
            <div className="admin-form-group">
              <label>Store Name</label>

              <input
              name="setting"
                value={settingsData.setting}
                onChange={handleChangesetting}
              />
            </div>

            <div className="admin-form-group">
              <label>Currency</label>

              <select onChange={handleChangesetting}>
               <option value="EGP">EGP</option>
               <option value="USD">USD</option>
              </select>
            </div>

            <button className="admin-primary-btn">
              Save Settings
            </button>
          </form>
        </div>

      </div>

      {/* Logout */}
      <div className="admin-logout-section">
        <h2>Logout</h2>

        <p>Logout from the admin account.</p>
  
        <button className="admin-logout-danger"  onClick={handleDeleteAccount}>
          {t("settings.deleteAccount")}
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;