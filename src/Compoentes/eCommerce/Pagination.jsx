import React, { useState } from "react";

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const paginationRouter = async (page) => {
    const res = await fetch(
     `https://ecommerce-vite-av7j.vercel.app/api/product?page=1&limit=10`
    );

    const data = await res.json();

    console.log(data);

    setProducts(data.product);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    paginationRouter(page);
  };

  return (
    <div>
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

      <div>
        {products?.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pagination;