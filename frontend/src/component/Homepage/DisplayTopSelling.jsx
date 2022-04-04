import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, reset } from "../../features/cart/cartSlice";
import { useStyles } from "./style/displayProduct";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import slugify from "react-slugify";
import { FaShoppingCart } from "react-icons/fa";

const DisplayTopSelling = ({ product }) => {
  const { message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
  }, []);
  const handleCart = (product) => {
    let {
      _id,
      title,
      price,
      category,
      brand,
      productImgs,
      description,

      totalQty,
    } = product;
    let qty = 1;
    let data = {
      _id,
      title,
      price,
      category,
      brand,
      totalQty,
      productImgs,
      description,
      qty,
      total: parseInt(price) * parseInt(qty),
    };
    dispatch(addToCart(data));
  };
  const { TopSellingcardContainer } = useStyles();

  if (message) {
    toast.success(message, {
      toastId: "success1",
    });
  }
  const navigate = useNavigate();

  const slug = slugify(product.title);
  return (
    <Card
      className={TopSellingcardContainer}

      //   style={{ backgroundColor: "unset" }}
    >
      <CardActionArea
        onClick={(e) => navigate(`/product/${product.title}`)}
        style={{ marginTop: "20px" }}
      >
        <CardMedia
          component="img"
          height="250"
          image={product?.productImgs[0]?.img_url}
          alt={product?.productImgs[0]?.img_url}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            className="title"
            component="h6"
            noWrap
          >
            {product.title}
          </Typography>
          <Typography variant="body2" className="price" color="text.secondary">
            &#x20A6; {product.price.toLocaleString("en-US")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          className="button"
          onClick={() => handleCart(product)}
        >
          <FaShoppingCart />
        </Button>
      </CardActions>
    </Card>
  );
};

export default DisplayTopSelling;
// src={product.productImg[0].img_url}
// alt={product.productImg[0].img_url}
