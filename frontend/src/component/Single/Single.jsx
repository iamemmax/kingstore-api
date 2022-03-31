import {
  Grid,
  Typography,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style/style";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Single = ({ data }) => {
  const { wrapper } = useStyles();
  let imgBox = document.querySelector(".display-img-box");
  const [imgsrc, setImgsrc] = useState("");

  // handle change img
  const handleImgChange = (img) => {
    setImgsrc(imgBox);
    if (imgsrc?.src != undefined) {
      imgsrc.src = img?.replace(/"(.+)"/g, "$1");
    }
  };
  // limiting qty to quantity in stock
  let quantity = [];
  let n = 1;
  while (n <= data.totalQty) {
    quantity.push(n);
    n++;
  }
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [button, setButton] = useState(false);
  const [cartQty, setCartQty] = useState(1);

  useEffect(() => {
    cart?.map((da) => {
      if (da._id === data._id) {
        setCartQty(da.qty);
        setButton(true);
      }
    });
  }, [button]);
  console.log(cartQty);

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
    console.log(data);

    dispatch(addToCart(data));
    !button &&
      toast.success("product added successfully", {
        toastId: "success1",
      });
    setButton(true);
  };
  return (
    <Box key={data._id}>
      <Grid
        container
        className={wrapper}
        justifyContent="space-between"
        alignItems="flex-start"
        // spacing={3}
      >
        <Grid item xs={12} sm={12} md={5} className="img-box">
          <Grid container>
            <Grid item sx={3} sm={3}>
              {data.productImgs.map((imgs) => (
                <img
                  src={`${imgs.img_url}`}
                  alt={`${imgs.img_id}`}
                  key={imgs.img_id}
                  component="img"
                  height="50"
                  className="clickImg"
                  onClick={(e) => handleImgChange(imgs.img_url)}
                />
              ))}
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
              <img
                src={`${data.productImgs[0].img_url}`}
                alt={`${data.productImgs[0].img_id}`}
                component="img"
                height="350"
                className="display-img-box"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={5} className="text">
          <Typography variant="h5" component="h2">
            {data.title}
          </Typography>

          <Typography variant="subtitle2">{data.brand}</Typography>
          <Typography variant="body1" component="h2">
            &#x20A6; {data.price.toLocaleString("en-US")}
          </Typography>
          <Typography
            variant="subtitle2"
            className="description"
            color="GrayText"
          >
            {data.description}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={2}>
          <Box className="add-to-cart">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>Price</ListItemIcon>
                  <ListItemText primary={data.price} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>Status</ListItemIcon>
                  <ListItemText
                    primary={data.totalQty ? "In stock" : "Out of Stock"}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Qty</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={button && cartQty}
                // label="Qty"
                onChange={(e) => setQty(e.target.value)}
                size="small"
                className="selectQty"
              >
                {quantity?.map((data) => (
                  <MenuItem value={`${parseInt(data)}`} key={data}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider />

            <Button
              variant="contained"
              onClick={() => handleCart(data)}
              m={2}
              color="primary"
              fullWidth
              className={button ? "disable" : ""}
            >
              {!button ? "Add to cart" : "In cart"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Single;
