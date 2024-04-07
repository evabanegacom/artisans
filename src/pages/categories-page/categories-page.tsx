import React, { useEffect, useState } from 'react'
import ProductService from '../../services/product-service';

const CategoriesPage = () => {
    const url = "http://localhost:5173/products/Electronics";
const parts = url.split("/");
const category = parts[parts.length - 1]; // Get the last part of the URL

console.log(category); // Output: "Electronics"

const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await ProductService.getProductsByCategory(category);
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
        <h1>{category}</h1>
        {products.map((product) => (
            <div key={product?.id}>
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            </div>
        ))}
    </div>
  )
}

export default CategoriesPage