import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import DisplayCart from "../../component/cart/DisplayCart";
import { useStyles } from "../../component/cart/style/cart";

function Cart() {
  const { cart, message } = useSelector((state) => state.cart);
  const { summary, container } = useStyles();
  let qty = cart?.map((res) => res.qty);
  let total = cart?.map((res) => res.total);

  let cartNumber = qty?.reduce((x, y) => x + y, 0);
  let totalPrice = total?.reduce((x, y) => x + y, 0);

  return (
    <Box>
      <div>
        <Typography variant="h4" component="h2" m={4} textTransform="uppercase">
          {cart?.length > 0 ? " My Shopping Cart" : " Empty Shopping Cart"}
        </Typography>

        <Grid container spacing={2} className={container}>
          <Grid item xs={12} sm={12} md={9}>
            {cart?.map((data, index) => (
              <DisplayCart data={data} key={index} message={message} />
            ))}
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            {cart?.length > 0 && (
              <div className={summary}>
                <Typography variant="h6" component="h2">
                  SUBTOTAL ({cartNumber}) ITEMS{" "}
                </Typography>
                <Typography variant="h6" component="h3" className="Totalprice">
                  &#x20A6;{totalPrice.toLocaleString("en-US")}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  // size="small"
                  color="secondary"
                  style={{ color: "#fff", fontWeight: "700" }}
                >
                  Checkout
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default Cart;
