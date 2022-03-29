import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import {
  removeCart,
  increaseQty,
  DecreaseQty,
  reset,
} from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { useStyles } from "./style/cart";

function DisplayCart({ data, message }) {
  const dispatch = useDispatch();
  const { cartContainer } = useStyles();
  const handleRemoveCart = (data) => {
    dispatch(removeCart(data));
  };
  useEffect(() => {
    dispatch(reset());
  }, []);

  const [count, setCount] = useState(data.qty);

  const increaseCount = (data) => {
    setCount(count + 1);
    dispatch(increaseQty(data));
  };

  const DecreaseCount = (data) => {
    dispatch(DecreaseQty(data));
    setCount(count - 1);
    if (count <= 1) {
      setCount(1);
      dispatch(removeCart(data._id));
    }
  };
  return (
    <div>
      <div className={cartContainer}>
        <div className="cart_product">
          <div className="img">
            <img
              src={data?.productImgs[0].img_url}
              component="img"
              alt={data.title}
            />
          </div>
          <div className="title">
            <Typography variant="h6" component="h4">
              {data.title}
            </Typography>
          </div>
          <div className="price">
            <Typography variant="h6" component="h4">
              &#x20A6; {data.price.toLocaleString("en-US")}
            </Typography>
          </div>
          <div className="qty-box">
            <Button
              size="small"
              className="plus"
              onClick={() => increaseCount(data)}
            >
              <FaPlus />
            </Button>
            <input
              type="text"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
            <Button size="small" onClick={() => DecreaseCount(data)}>
              <FaMinus />
            </Button>
          </div>
          <div className="price">
            <Typography variant="h5" conponent="h5">
              &#x20A6; {data.total.toLocaleString("en-US")}
            </Typography>
          </div>
          <div className="delete">
            <Button
              // variant="contained"
              color="error"
              onClick={() => handleRemoveCart(data._id)}
            >
              {<FaTrash />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayCart;
