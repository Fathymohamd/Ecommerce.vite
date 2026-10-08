import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


import { useTranslation } from "react-i18next"
import {
  FaPlus,
  FaPen,
  FaTrash,
  FaMagnifyingGlass,
  FaStar 
} from "react-icons/fa6";

import {
  FaSpa,
  FaSprayCanSparkles,
  FaCouch,
  FaBasketShopping,
  FaHouse,
  FaKitchenSet,
  FaLaptop,
  FaShirt,
  FaShoePrints,
  FaClock,
  FaMobileScreenButton,
  FaMotorcycle,
  FaHeart,
  FaDumbbell,
  FaGlasses,
  FaTabletScreenButton,
  FaCar,
  FaBagShopping,
  FaPersonDress,
  FaGem,
} from "react-icons/fa6";

import {fetchAllProducts} from "../../Redux/createSlice"

import { useSelector  , useDispatch } from "react-redux";



function AdminProducts() {
     const { t, i18n } = useTranslation()
const Data = useSelector((state) => state.counter.data);

const dispatch = useDispatch();

const [search, setSearch] = useState("");

const [currentPage, setCurrentPage] = useState(1);

const [selectedCategory, setselectedCategory] =
  useState("All Categories");

const filteredProducts = Data.filter((product) => {
  const matchesCategory =
    selectedCategory === "All Categories" ||
    product.category === selectedCategory;

  const matchesSearch = product.title
    ?.toLowerCase()
    .includes(search.toLowerCase());

  return matchesCategory && matchesSearch;
});

const productsPerPage = 10;

const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);

const startIndex = (currentPage - 1) * productsPerPage;

const productsToShow = filteredProducts.slice(
  startIndex,
  startIndex + productsPerPage
);

const pages = Array.from(
  { length: totalPages },
  (_, index) => index + 1
);

const handlePageClick = (page) => {
  setCurrentPage(page);
};

useEffect(() => {
  setCurrentPage(1);
   dispatch(fetchAllProducts());
}, [ dispatch  , search, selectedCategory]);


  const categories = [
    {
      id: 1,
      title: "Beauty",
      category: "beauty",
      translationKey: "beauty",
      icon: <FaSpa />,
    },
    {
      id: 2,
      title: "Fragrances",
      category: "fragrances",
      translationKey: "fragrances",
      icon: <FaSprayCanSparkles />,
    },
    {
      id: 3,
      title: "Furniture",
      category: "furniture",
      translationKey: "furniture",
      icon: <FaCouch />,
    },
    {
      id: 4,
      title: "Groceries",
      category: "groceries",
      translationKey: "groceries",
      icon: <FaBasketShopping />,
    },
    {
      id: 5,
      title: "Home Decoration",
      category: "home-decoration",
      translationKey: "homeDecoration",
      icon: <FaHouse />,
    },
    {
      id: 6,
      title: "Kitchen Accessories",
      category: "kitchen-accessories",
      translationKey: "kitchenAccessories",
      icon: <FaKitchenSet />,
    },
    {
      id: 7,
      title: "Laptops",
      category: "laptops",
      translationKey: "laptops",
      icon: <FaLaptop />,
    },
    {
      id: 8,
      title: "Men's Shirts",
      category: "mens-shirts",
      translationKey: "mensShirts",
      icon: <FaShirt />,
    },
    {
      id: 9,
      title: "Men's Shoes",
      category: "mens-shoes",
      translationKey: "mensShoes",
      icon: <FaShoePrints />,
    },
    {
      id: 10,
      title: "Men's Watches",
      category: "mens-watches",
      translationKey: "mensWatches",
      icon: <FaClock />,
    },
    {
      id: 11,
      title: "Mobile Accessories",
      category: "mobile-accessories",
      translationKey: "mobileAccessories",
      icon: <FaMobileScreenButton />,
    },
    {
      id: 12,
      title: "Motorcycle",
      category: "motorcycle",
      translationKey: "motorcycle",
      icon: <FaMotorcycle />,
    },
    {
      id: 13,
      title: "Skin Care",
      category: "skin-care",
      translationKey: "skinCare",
      icon: <FaHeart />,
    },
    {
      id: 14,
      title: "Smartphones",
      category: "smartphones",
      translationKey: "smartphones",
      icon: <FaMobileScreenButton />,
    },
    {
      id: 15,
      title: "Sports Accessories",
      category: "sports-accessories",
      translationKey: "sportsAccessories",
      icon: <FaDumbbell />,
    },
    {
      id: 16,
      title: "Sunglasses",
      category: "sunglasses",
      translationKey: "sunglasses",
      icon: <FaGlasses />,
    },
    {
      id: 17,
      title: "Tablets",
      category: "tablets",
      translationKey: "tablets",
      icon: <FaTabletScreenButton />,
    },
    {
      id: 18,
      title: "Tops",
      category: "tops",
      translationKey: "tops",
      icon: <FaShirt />,
    },
    {
      id: 19,
      title: "Vehicle",
      category: "vehicle",
      translationKey: "vehicle",
      icon: <FaCar />,
    },
    {
      id: 20,
      title: "Women's Bags",
      category: "womens-bags",
      translationKey: "womensBags",
      icon: <FaBagShopping />,
    },
    {
      id: 21,
      title: "Women's Dresses",
      category: "womens-dresses",
      translationKey: "womensDresses",
      icon: <FaPersonDress />,
    },
    {
      id: 22,
      title: "Women's Jewellery",
      category: "womens-jewellery",
      translationKey: "womensJewellery",
      icon: <FaGem />,
    },
    {
      id: 23,
      title: "Women's Shoes",
      category: "womens-shoes",
      translationKey: "womensShoes",
      icon: <FaShoePrints />,
    },
    {
      id: 24,
      title: "Women's Watches",
      category: "womens-watches",
      translationKey: "womensWatches",
      icon: <FaClock />,
    },
  ];


  return (

    <div className="admin-products-page">

      
      <div className="admin-page-title admin-product-title">
        <div>
          <h1>Products</h1>
          <p>Manage your store products</p>
        </div>

        <Link
          to="/admin/products/add"
          className="admin-primary-btn"
        >
          <FaPlus />
          <span>Add Product</span>
        </Link>
      </div>


      <div className="admin-products-card">

       
        <div className="admin-products-toolbar">

     
          <div className="admin-products-search">
            <FaMagnifyingGlass />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

<select
  className="admin-products-filter"
  value={selectedCategory}
  onChange={(e) => setselectedCategory(e.target.value)}
>
  <option value="All Categories">
    All Categories
  </option>

  {categories.map((category) => (
    <option
      key={category.id}
      value={category.category}
    >
      {category.title}
    </option>
  ))}
</select>

        </div>


        <div className="admin-products-count">
          <span>
            Showing <strong>{Data.length}</strong> products
          </span>
        </div>

    
        <div className="admin-table-container">
          <table className="admin-table">

            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

      <tbody>
  {productsToShow.length > 0 ? (
    productsToShow.map((product) => (
      <tr key={product.id}>
        <td>
          <div className="admin-product-info">
            <div className="admin-product-image">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                />
              ) : (
                product.title?.charAt(0)
              )}
            </div>

            <div>
              <strong>{product.title}</strong>
              <small>ID: #{product.id}</small>
            </div>
          </div>
        </td>

        <td>
          <span className="admin-category-badge">
            {product.category}
          </span>
        </td>

        <td>
          <strong className="admin-product-price">
            ${product.price}
          </strong>
        </td>

        <td>
          <span className="admin-product-rating">
            <FaStar  color="#f5b301" /> {product.rating}
          </span>
        </td>

        <td>
          <div className="admin-table-actions">
            <Link
              to={`/admin/products/edit/${product.id}`}
              className="admin-edit-btn"
              title="Edit Product"
            >
              <FaPen />
            </Link>

    
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="5"
        className="admin-no-products"
      >
        No products found
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>
       
      </div>
       <div className="pagination">

        <p>{t("pagination.prev")}</p>

        {pages.map((item) => (

          <p
            key={item}
            className={currentPage === item ? "active" : ""}
            onClick={() => handlePageClick(item)}
          >

            {item}

          </p>

        ))}

        <p>{t("pagination.next")}</p>

      </div>
    </div>
  );
}

export default AdminProducts;