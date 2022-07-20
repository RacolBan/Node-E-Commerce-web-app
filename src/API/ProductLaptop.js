import axios from "axios";
import { useEffect, useState } from "react";

function ProductsLaptop() {
  const [productsLaptop, setProductsLaptop] = useState([]);
  const getProducts = async () => {
    const res = await axios.get('https://fakestoreapi.com/products/category/jewelery')
    setProductsLaptop(res.data)
  };
  useEffect(()=>{
    getProducts()
  },[])
  return {
    productsLaptop : [productsLaptop,setProductsLaptop]
  }
}

export default ProductsLaptop;
