import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../component/config/Loading";
import Single from "../../component/Single/Single";
import {
  ProductDetails,
  reset,
} from "../../features/Product/singleProductSlice";
import HomeLayout from "../../Layout/HomeLayout";
import Review from "../../component/Single/Review"

function SingleProduct() {
  const { title } = useParams();
  // const slug = useParams();
  const dispatch = useDispatch();
  const {
    isLoading,
    single: { product },
  } = useSelector((state) => state.single);
  useEffect(() => {
    dispatch(ProductDetails(title));

    // return => dispatch(reset())
  }, [dispatch]);
  if (isLoading) {
    return <Loading />;
  }
  // console.log(product && product[0]?._id);
  return (
    <HomeLayout>
      {product && <Single data={product[0]} key={product[0]?._id} />}
      <Review />
    </HomeLayout>
  );
}

export default SingleProduct;
