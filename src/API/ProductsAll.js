import axios from "axios";
import { useEffect, useState } from "react";

function ProductsAll() {
  const [productsAll, setProductsAll] = useState([]);
  const getProducts = async () => {
    const res = await axios.get('https://fakestoreapi.com/products')
    setProductsAll(res.data)
  };
  useEffect(()=>{
    getProducts()
  },[])
  return {
    productsAll : [productsAll,setProductsAll]
  }
}

export default ProductsAll;
