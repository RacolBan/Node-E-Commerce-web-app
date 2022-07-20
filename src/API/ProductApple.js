import axios from "axios";
import { useEffect, useState } from "react";

function ProductsApple() {
  const [productsApple, setProductsApple] = useState([]);
  const getProducts = async () => {
    const res = await axios.get('https://fakestoreapi.com/products/category/electronics')
    setProductsApple(res.data)
  };
  useEffect(()=>{
    getProducts()
  },[])
  return {
    productsApple : [productsApple,setProductsApple]
  }
}

export default ProductsApple;
