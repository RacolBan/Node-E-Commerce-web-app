import React, { useEffect, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import style from "./New.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast} from "react-toastify";


function ViewProduct({ title, isFile }) {
  const param = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [manufactureId, setManufactureId] = useState("");
  const [file, setFile] = useState(null);

  const nav = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const {data} =  await axios.get(
          `http://localhost:8000/product/${param.id}`,
          {
            headers: {
              "access-token":
                "Bearer " +
                JSON.parse(localStorage.getItem("login")).accesstoken,
            },
          }
        );
        if(data.found) {
          setName(data.found.name)
          setPrice(data.found.price)
          setDescription(data.found.description)
          setCategoryId(data.found.categoryId)
          setManufactureId(data.found.manufactureId)
          setFile(data.found.image)
        }

      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    };
    getData();
  }, []);
  const productUpdate = {
    name,
    price,
    description,
    categoryId,
    manufactureId
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8000/product/${param.id}`,
        productUpdate,
        {
          headers: {
            "access-token":
              "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
          },
        }
      );

      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      return nav('/admin/products')
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
  return (
    <div className={style.new}>
      <div className={style.newContainer}>
        <div className={style.top}>
          <h1>{title}</h1>
        </div>
        <div className={style.bottom}>
          {isFile && (
            <div className={style.left}>
              <img
                src={
                  file
                    ? `http://localhost:8000/${file}`
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="image"
              />
            </div>
          )}
          <div className={style.right}>
            <form>
              {/* {isFile && (
                <div className={style.formInput}>
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                    disabled
                  />
                </div>
              )} */}

              <div className={style.formInput}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                
                />
              </div>
              <div className={style.formInput}>
                <label>Price</label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  name="price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                />
              </div>
              <div className={style.formInput}>
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>
              <div className={style.formInput}>
                <label>CategoryID</label>
                <input
                  type="text"
                  placeholder="Enter CategoryID"
                  name="categoryId"
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                  }}
                  value={categoryId}
                />
              </div>
              <div className={style.formInput}>
                <label>ManufactureId</label>
                <input
                  type="ManufactureId"
                  placeholder="Enter ManufactureId"
                  name="manufactureId"
                  onChange={(e) => {
                    setManufactureId(e.target.value);
                  }}
                  value={manufactureId}
                 
                />
              </div>
              <button type="submit" onClick={handleUpdate}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
