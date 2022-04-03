import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../component/config/Loading";
import Displayproduct from "../../component/Homepage/Displayproduct";
import { fetchProducts } from "../../features/Product/fetchproductSlice";
import { reset } from "../../features/cart/cartSlice";
import Banner from "../../component/Homepage/Banner";
import HomeLayout from "../../Layout/HomeLayout";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(reset());
  }, [dispatch]);
  const { isLoading, products, isSuccess, message } = useSelector(
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
