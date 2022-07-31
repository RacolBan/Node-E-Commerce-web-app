import React from "react";
import { useNavigate } from "react-router-dom";
import useCustomRouter from "../../Hooks/useCustomRouter";
import style from "./Pagination.module.css";

const Pagination = ({ totalPages, page ,manufacture,price }) => {
  const {pushQuery} = useCustomRouter()
  const newArr = [...Array(totalPages)].map((_, i) => i + 1);
  const isActive = (index) => {
    if (index === page) {
      return `${style.active}`;
    }
    return "";
  };
  const prev = ()=>{
    const newPage = Math.max(page - 1,1) 
    pushQuery({page:newPage,manufacture,price})
  }
  const next = ()=>{
    const newPage = Math.min(page + 1,totalPages) 
    pushQuery({page:newPage,manufacture,price})
  }
  const jump = (num)=>{
    pushQuery({page:num,manufacture,price})
  }
  return (
    <div className={`${style.pagination} `}>
      <button onClick={prev}>&laquo;</button>
      {newArr.map((num) => (
        <button key={num} className={`${isActive(num)}`} onClick={()=>jump(num)}>
          {num}
        </button>
      ))}
      <button onClick={next}>&raquo;</button>
    </div>
  );
};

export default Pagination;
