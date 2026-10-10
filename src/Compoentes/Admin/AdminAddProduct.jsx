
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../../Redux/createSlice";
import { useTranslation } from "react-i18next";

function AdminAddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    images: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error(t("adminAddProduct.titleRequired"));
      return;
    }

    if (!formData.price.trim()) {
      toast.error(t("adminAddProduct.priceRequired"));
      return;
    }

    if (!formData.category.trim()) {
      toast.error(t("adminAddProduct.categoryRequired"));
      return;
    }

    if (!formData.description.trim()) {
      toast.error(t("adminAddProduct.descriptionRequired"));
      return;
    }

    if (!formData.images.trim()) {
      toast.error(t("adminAddProduct.imageRequired"));
      return;
    }

    try {
      const response = await fetch(
        "https://ecommerce-vite-two.vercel.app/api/AdminAddProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: formData.category,
            price: Number(formData.price),
            images: [formData.images.trim()],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message || t("adminAddProduct.addFailed")
        );
        return;
      }

      toast.success(t("adminAddProduct.addSuccess"));
      dispatch(fetchAllProducts());
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error(t("adminAddProduct.somethingWentWrong"));
    }
  };

  return (
    <div>
      <div className="admin-page-title">
        <h1>{t("adminAddProduct.title")}</h1>
        <p>{t("adminAddProduct.subtitle")}</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>{t("adminAddProduct.productName")}</label>
              <input
                type="text"
                name="title"
                placeholder={t("adminAddProduct.enterProductName")}
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div className="admin-form-group">
              <label>{t("adminAddProduct.price")}</label>
              <input
                type="number"
                name="price"
                placeholder={t("adminAddProduct.enterPrice")}
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="admin-form-group">
              <label>{t("adminAddProduct.category")}</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="beauty">{t("categories.beauty")}</option>
                <option value="fragrances">{t("categories.fragrances")}</option>
                <option value="furniture">{t("categories.furniture")}</option>
                <option value="groceries">{t("categories.groceries")}</option>
                <option value="home-decoration">{t("categories.homeDecoration")}</option>
                <option value="kitchen-accessories">{t("categories.kitchenAccessories")}</option>
                <option value="laptops">{t("categories.laptops")}</option>
                <option value="mens-shirts">{t("categories.mensShirts")}</option>
                <option value="mens-shoes">{t("categories.mensShoes")}</option>
                <option value="mens-watches">{t("categories.mensWatches")}</option>
                <option value="mobile-accessories">{t("categories.mobileAccessories")}</option>
                <option value="motorcycle">{t("categories.motorcycle")}</option>
                <option value="skin-care">{t("categories.skinCare")}</option>
                <option value="smartphones">{t("categories.smartphones")}</option>
                <option value="sports-accessories">{t("categories.sportsAccessories")}</option>
                <option value="sunglasses">{t("categories.sunglasses")}</option>
                <option value="tablets">{t("categories.tablets")}</option>
                <option value="tops">{t("categories.tops")}</option>
                <option value="vehicle">{t("categories.vehicle")}</option>
                <option value="womens-bags">{t("categories.womensBags")}</option>
                <option value="womens-dresses">{t("categories.womensDresses")}</option>
                <option value="womens-jewellery">{t("categories.womensJewellery")}</option>
                <option value="womens-shoes">{t("categories.womensShoes")}</option>
                <option value="womens-watches">{t("categories.womensWatches")}</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="admin-form-group">
            <label>{t("adminAddProduct.description")}</label>
            <textarea
              name="description"
              placeholder={t("adminAddProduct.enterDescription")}
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />
          </div>

          {/* Image */}
          <div className="admin-form-group">
            <label>{t("adminAddProduct.imageUrl")}</label>
            <input
              type="text"
              name="images"
              placeholder={t("adminAddProduct.enterImageUrl")}
              value={formData.images}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="admin-form-buttons">
            <button
              type="button"
              className="admin-cancel-btn"
              onClick={() => navigate("/admin/products")}
            >
              {t("adminAddProduct.cancel")}
            </button>

            <button
              type="submit"
              className="admin-primary-btn"
            >
              {t("adminAddProduct.addProduct")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddProduct;
