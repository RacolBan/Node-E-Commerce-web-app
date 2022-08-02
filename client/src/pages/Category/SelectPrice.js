import React from "react";
import useCustomRouter from "../../Hooks/useCustomRouter";
import style from './SelectPrice.module.css'

const SelectPrice = ({page,manufacture}) => {
  const {pushQuery} = useCustomRouter();

  const handleChange = (e) => {
    const { value } = e.target;
    pushQuery({page, manufacture,price:value})
  };

  return (
    <div className={style.selectPrice}>
      <select onChange={handleChange}>
        <option value="">Sort</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SelectPrice;
