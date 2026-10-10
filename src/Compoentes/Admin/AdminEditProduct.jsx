
import React, { useState } from "react";;
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "smartphones",
    description: "",
    images: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error(t("adminEditProduct.nameRequired"));
      return;
    }

    if (!formData.price) {
      toast.error(t("adminEditProduct.priceRequired"));
      return;
    }

    if (!formData.category) {
      toast.error(t("adminEditProduct.categoryRequired"));
      return;
    }

    if (!formData.description.trim()) {
      toast.error(t("adminEditProduct.descriptionRequired"));
      return;
    }

    if (!formData.images.trim()) {
      toast.error(t("adminEditProduct.imageRequired"));
      return;
    }

    if (Number(formData.price) <= 0) {
      toast.error(t("adminEditProduct.priceGreaterThanZero"));
      return;
    }

    try {
      const response = await fetch(
        `https://ecommerce-vite-two.vercel.app/api/updatedProduct/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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
        setError(
          data.message || t("adminEditProduct.updateFailed")
        );
        return;
      }

      toast.success(t("adminEditProduct.updateSuccess"));
      navigate("/admin/products");
    } catch (error) {
      console.error("Update product error:", error);
      setError(t("adminEditProduct.somethingWentWrong"));
    }
  };

  return (
    <div>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="admin-page-title">
        <h1>{t("adminEditProduct.title")}</h1>
        <p>{t("adminEditProduct.subtitle")}</p>
      </div>

      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>{t("adminEditProduct.productName")}</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label>{t("adminEditProduct.price")}</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label>{t("adminEditProduct.category")}</label>
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

          <div className="admin-form-group">
            <label>{t("adminEditProduct.description")}</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />
          </div>

          <div className="admin-form-group">
            <label>{t("adminEditProduct.imageUrl")}</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form-buttons">
            <button
              type="button"
              className="admin-cancel-btn"
              onClick={() => navigate("/admin/products")}
            >
              {t("adminEditProduct.cancel")}
            </button>

            <button
              type="submit"
              className="admin-primary-btn"
            >
              {t("adminEditProduct.saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProduct;

