import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiEdit2,
} from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";

import { getMe } from "../../Redux/authSlice";
import { updateProfile } from "../../Redux/updateProfile";
import { useTranslation } from "react-i18next";

const Profile = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });


const handleUpdateProfile = async (e) => {
  e.preventDefault();

  const resultAction = await dispatch(
    updateProfile({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    })
  );
 setIsEditing(false)

  if (updateProfile.fulfilled.match(resultAction)) {
    toast.success("Profile updated successfully");
  }
};



  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {

    dispatch(getMe());

  }, [dispatch]);

 

  useEffect(() => {

    if (user) {

      setUserData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });

      if (user.profileImage) {

        setProfileImage(
          `https://ecommerce-vite-two.vercel.app${user.profileImage}`
        );

      }

    }

  }, [user]);

  // تغيير بيانات الحقول

  const handleChange = (e) => {

    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleImageChange = async (e) => {

    const file = e.target.files[0];

    /* console.log("FILE:", file); */

    if (file) return;

    const FormData = new FormData();

    FormData.append("image", file);

    try {

      const res = fetch(
        "https://ecommerce-vite-two.vercel.app/profile/image",
        {
          method: "POST",
          body: {
            credentials: "include",
            FormData,
          },
        }
      );

      const data = res.json();

      console.log("FILE:", data);

      if (!res.ok) {

        console.log(data.message);

        return;

      }

      setProfileImage(
        `https://ecommerce-vite-two.vercel.app${data.image}`
      );

      dispatch(getMe());

    } catch (error) {

      console.log();

    }

  }




  const handleSave = async () => {

    console.log("User data:", userData);

    // هنا تضع API تحديث بيانات المستخدم

    // await fetch(...)

    setIsEditing(false);

  };


  return (

    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-header">

          <h1>
            {t("profile.myProfile")}
          </h1>

          <p>
            {t("profile.managePersonalInformation")}
          </p>

        </div>


        <div
          className="profile-avatar"
          onClick={() => fileInputRef.current.click()}
        >

          {profileImage ? (

            <img
              src={profileImage}
              alt={t("profile.profile")}
            />

          ) : (

            <FiUser />

          )}

          <input
            type="file"
            accept="image"
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
          />

        </div>


        <div className="us">

          <h2>
            {user?.name}
          </h2>

          <p className="profile-email">
            {user?.email}
          </p>

          <button
            className="edit-profile-btn"
            onClick={() => setIsEditing(!isEditing)}
          >

            <FiEdit2 />

            {isEditing
              ? t("profile.cancel")
              : t("profile.editProfile")}

          </button>

        </div>


        <div className="profile-section">

          <div className="profile-section-header">

            <div>

              <h2>
                {t("profile.personalInformation")}
              </h2>

              <p>
                {t("profile.basicAccountInformation")}
              </p>

            </div>

          </div>


          <div className="profile-info">

         

            <div className="profile-field">

              <div className="field-icon">
                <FiUser />
              </div>

              <div className="field-content">

                <span>
                  {t("profile.fullName")}
                </span>

                {isEditing ? (

                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />

                ) : (

                  <strong>
                    {user?.name}
                  </strong>

                )}

              </div>

            </div>


            

            <div className="profile-field">

              <div className="field-icon">
                <FiMail />
              </div>

              <div className="field-content">

                <span>
                  {t("profile.emailAddress")}
                </span>

                {isEditing ? (

                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />

                ) : (

                  <strong>
                    {user?.email}
                  </strong>

                )}

              </div>

            </div>


            {/* Phone */}

            <div className="profile-field">

              <div className="field-icon">
                <FiPhone />
              </div>

              <div className="field-content">

                <span>
                  {t("profile.phoneNumber")}
                </span>

                {isEditing ? (

                  <input
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                  />

                ) : (

                  <strong>
                    {userData.phone ||
                      t("profile.notAdded")}
                  </strong>

                )}

              </div>

            </div>


            {/* Address */}

            <div className="profile-field">

              <div className="field-icon">
                <FiMapPin />
              </div>

              <div className="field-content">

                <span>
                  {t("profile.address")}
                </span>

                {isEditing ? (

                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                  />

                ) : (

                  <strong>
                    {userData.address ||
                      t("profile.notAdded")}
                  </strong>

                )}

              </div>

            </div>


            {/* Join Date */}

            <div className="profile-field">

              <div className="field-icon">
                <FiCalendar />
              </div>

              <div className="field-content">

                <span>
                  {t("profile.memberSince")}
                </span>

                <strong>
                  {t("profile.september2026")}
                </strong>

              </div>

            </div>

          </div>


          {isEditing && (

            <button
              className="save-profile-btn"
              onClick={handleUpdateProfile}
            >

              {t("profile.saveChanges")}

            </button>

          )}

        </div>

      </div>

    </div>

  );

};

export default Profile;