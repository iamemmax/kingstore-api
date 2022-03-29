import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Settings } from "../config/SliderSettings";
import { useStyles } from "./style/banner";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
function Banner() {
  const { banner } = useStyles();
  const { products } = useSelector((state) => state.products);
  return (
    <div className={banner}>
      <Slider {...Settings}>
        {products?.getProducts.slice(0, 5).map((product) => (
          <div key={product._id}>
            <div className="text">
              <Typography variant="h5" component="h2" style={{ color: "#fff" }}>
                {product.title}
              </Typography>
              <Typography
                variant="h6"
                component="subtitle2"
                color="GrayText"
                className="price"
              >
                ( &#x20A6; {product.price.toLocaleString("en-US")})
              </Typography>
            </div>
            <img
              src={product.productImgs[0].img_url}
              alt="img"
              component="img"
              height={300}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
