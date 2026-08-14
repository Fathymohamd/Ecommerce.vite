import React, { useState  , useEffect} from "react";
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { useSelector , useDispatch } from 'react-redux'
import {fetchAllProducts    , addToCart} from  "../../Redux/createSlice"
import {useTranslation} from "react-i18next"
import toast from "react-hot-toast"
function Pagination() {
const [currentPage, setCurrentPage] = useState(1);
const [products, setProducts] = useState([]);

const handleAddToCart = (product) => {
  
  dispatch(addToCart(product));
toast.success(t("Product added to cart!"), {
  duration: 3000,
  position: "top-right",
  style: {
    background: "#ffffff",
    color: "#222",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: "500",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
  },
});
};


const dispatch = useDispatch()
  const data = useSelector((state)=> state.counter.data)
  const selectedCategories = useSelector((state) => state.counter.selectedCategories);
  const Login = useSelector((state) => state.counter.Loading)

  const productsToShow =
    selectedCategories.length === 0
      ? products
      : data.filter((item) =>
          selectedCategories.includes(item.category)
        );

const {t , i18n} = useTranslation()

useEffect(()=>{
  dispatch(fetchAllProducts())
     paginationRouter(products);
} , [dispatch])

  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10  , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19 , 20];

  const paginationRouter = async (page) => {
    const res = await fetch(
     `https://ecommerce-vite-9iwf.vercel.app/api/product?page=${page}&limit=10`
    );

    const data = await res.json();

    setProducts(data.products);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    paginationRouter(page);
  };

  return (
    <div>



    <div className='Raincoats1'>
  {productsToShow?.map((item)=>(

  <div className="array">
   <div className="products" key={item.id}>
     <Link className="link"  to={`/products/${item.id}`}>
  
        <img id="image" src={item.images[0]}/>
        <div className="title_item" title={item.title}>{t(`products.${item.id}.title`)}</div>
  
        <div className="statr">
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
        </div>
            </Link>
          <div className="price">
          <span>$ {item.price}</span>
          <button className="buttonAdd" onClick={()=>{handleAddToCart(item,)}}>{t("Add To Cart")}</button>
        </div>
      </div>
     </div>
    ))}
  </div>


      <div className="pagination">
        <p>Prev</p>

        {pages.map((item) => (
          <p
            key={item}
            className={currentPage === item ? "active" : ""}
            onClick={() => handlePageClick(item)}
          >
            {item}
          </p>
        ))}

        <p>Next</p>
      </div>
    </div>
  );
}

export default Pagination;