import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaPaperPlane,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  createContact,
  clearContactState,
} from "../../Redux/Contact";
const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { t } = useTranslation();
const {
  loading,
success, 
  message,
  error,
} = useSelector((state) => state.contact);
const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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

  if (!user) {
    toast.error("Please login first");

    setTimeout(() => {
      navigate("/login");
    }, 1500);

    return;
  }

  const result = await dispatch(
    createContact(formData)
  );

  if (createContact.fulfilled.match(result)) {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }
};

  return (
<div className="contact-page">
  <div className="contact-container">

    <div className="contact-header">
      <h1>{t("contact.contactUs")}</h1>

      <p>
        {t("contact.haveQuestion")}
      </p>
    </div>

    <div className="contact-content">

     
      <div className="contact-info">
        <h2>{t("contact.getInTouch")}</h2>

        <p className="contact-description">
          {t("contact.contactDescription")}
        </p>

        <div className="contact-item">
          <div className="contact-icon">
            <FaEnvelope />
          </div>

          <div>
            <h3>{t("contact.email")}</h3>
            <p>support@example.com</p>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-icon">
            <FaPhone />
          </div>

          <div>
            <h3>{t("contact.phone")}</h3>
            <p>+20 100 000 0000</p>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-icon">
            <FaLocationDot />
          </div>

          <div>
            <h3>{t("contact.location")}</h3>
            <p>{t("contact.egypt")}</p>
          </div>
        </div>
      </div>

  
      <div className="contact-form">
        <h2>{t("contact.sendUsMessage")}</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name">
              {t("contact.fullName")}
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder={t("contact.enterYourName")}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              {t("contact.email")}
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder={t("contact.enterYourEmail")}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">
              {t("contact.message")}
            </label>

            <textarea
              id="message"
              name="message"
              placeholder={t("contact.writeYourMessage")}
              value={formData.message}
              onChange={handleChange}
              rows="6"
            />
          </div>

          {success && (
            <div className="success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="send-message-btn"
          >
            <FaPaperPlane />

            {loading
              ? t("contact.sending")
              : t("contact.sendMessage")}
          </button>

        </form>
      </div>

    </div>
  </div>
</div>
  );
};

export default Contact;