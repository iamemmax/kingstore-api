import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../component/config/Loading";
import Displayproduct from "../../component/Homepage/Displayproduct";
import {
  fetchProducts,
  fetchTopSelling,
} from "../../features/Product/fetchproductSlice";
import { reset } from "../../features/cart/cartSlice";
import Banner from "../../component/Homepage/Banner";
import HomeLayout from "../../Layout/HomeLayout";
import DisplayTopSelling from "../../component/Homepage/DisplayTopSelling";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchTopSelling());
    dispatch(reset());
  }, [dispatch]);
  const { isLoading, products, isSuccess, topSelling, message } = useSelector(
    (state) => state.products
  );

  if (isLoading) {
    return <Loading />;
  }
  if (message) {
    return toast.success(message, {
      toastId: "succes2",
    });
  }
  return (
    <HomeLayout>
      <Banner />
      <div className="container">
        <Typography
          variant="h5"
          component="h2"
          p={5}
          style={{ fontWeight: "600" }}
        >
          TOP SELLINGS
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignContent="center"
        >
          {topSelling?.product.map((product) => (
            <Grid item xs={6} sm={6} md={3}>
              <DisplayTopSelling product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="container">
        <Typography
          variant="h5"
          component="h2"
          p={5}
          style={{ fontWeight: "600" }}
        >
          NEW ARRIVALS
        </Typography>
        <Grid container spacing={2}>
          {products?.getProducts?.map((product) => (
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Displayproduct product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </HomeLayout>
  );
};

export default Home;
