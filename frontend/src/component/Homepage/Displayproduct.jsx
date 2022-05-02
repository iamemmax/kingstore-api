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
// import slugify from "r";
import slugify from "react-slugify";

const Displayproduct = ({ product }) => {
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
  const { cardContainer } = useStyles();

  if (message) {
    toast.success(message, {
      toastId: "success1",
    });
  }
  const navigate = useNavigate();

  // const slug = slugify(product.title);
  return (
    <Card
      className={cardContainer}
      onClick={(e) => navigate(`/product/${slugify(product.title)}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
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
          <div className="rating">
            <Typography
              variant="body2"
              className="reviews"
              color="text.secondary"
            >
              <Rating size="small" className="stars" />
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          className="button"
          onClick={() => handleCart(product)}
        >
          Add to card
        </Button>
      </CardActions>
    </Card>
  );
};

export default Displayproduct;
// src={product.productImg[0].img_url}
// alt={product.productImg[0].img_url}
