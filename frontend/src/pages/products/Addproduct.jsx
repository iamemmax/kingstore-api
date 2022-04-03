import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { reset, addNewproduct } from "../../features/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/config/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { useStyles } from "./style/addProduct";

const Addproduct = () => {
  // styles
  const { addProduct } = useStyles();

  const categories = [
    {
      value: "none",
    },
    {
      value: "wares",
    },
    {
      value: "shoes",
    },
    {
      value: "computer",
    },
    {
      value: "electronics",
    },
  ];

  const {
    user: { user },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState({});
  const [cloud, setCloud] = useState([]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImg = async (productImgs) => {
    setLoading(true);

    let data = new FormData();
    for (const productImg of productImgs) {
      data.append("file", productImg);
      data.append("upload_preset", "king-store");
      data.append("cloud_name", "dso8dzl1p");

      let cloudeney = await axios.post(
        "https://api.cloudinary.com/v1_1/dso8dzl1p/image/upload",
        data
      );
      if (cloudeney) {
        let data = {
          img_url: cloudeney.data.secure_url,
          img_id: cloudeney.data.public_id,
        };
        // proImg.push(data);
        setCloud((prev) => [...prev, data]);
        setLoading(false);
        // console.log(data);
      }
    }
  };
  console.log(cloud, "cloud");
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    brand: "",
    price: "",
    category: "none",
    totalQty: "",
    description: "",
    userId: user._id,
    productImgs: cloud,
  });

  let {
    title,
    brand,
    price,
    category,
    totalQty,
    description,
    userId,
    productImgs,
  } = input;
  const { isLoading, isError, isSuccess, message, newProduct } = useSelector(
    (state) => state.newProduct
  );
  let data = {
    title,
    brand,
    price,
    category,
    totalQty,
    description,
    userId,
    productImgs: cloud,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cloud.length < 1) {
      return toast.error("please choose a file(s)", {
        toastId: "error2",
      });
    }
    dispatch(addNewproduct(data));
    console.log(data);
  };

  useEffect(() => {
    dispatch(reset());
  }, [isError, isSuccess, message, newProduct, dispatch]);

  if (isSuccess && newProduct) {
    setTimeout(() => {
      navigate("/");
    }, 4000);
    return toast.success(newProduct.message, {
      toastId: "success1",
    });
  }
  if (isLoading) {
    return <Loading />;
  }

  if (isError && message) {
    return toast.error(message, {
      toastId: "error1",
    });
  }

  return (
    <Container>
      <Box className={addProduct} xs={12} sm={6}>
        <Typography variant="h4" component="h2" p={3}>
          Add New Product
        </Typography>
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
        >
          <TextField
            type="text"
            label="Title"
            name="title"
            placeholder="title"
            value={title}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={6}>
              <TextField
                type="number"
                name="price"
                placeholder="price"
                value={price}
                onChange={handleChange}
                variant="outlined"
                label="Price"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Total Qty in Stock"
                type="number"
                name="totalQty"
                placeholder="total Qty"
                value={totalQty}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={6}>
              <TextField
                type="text"
                name="brand"
                placeholder="brand"
                value={brand}
                onChange={handleChange}
                variant="outlined"
                label="Brand"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="category"
                  name="category"
                  value={category}
                  onChange={handleChange}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            name="description"
            value={description}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={5}
            label="Description"
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <TextField
            name="productImgs"
            value={productImgs}
            onChange={handleChange}
            variant="outlined"
            hidden
            rows={5}
            label="productImgs"
            style={{ display: "none" }}
          />
          {/* {loading && <p>Uploading</p>} */}
          <TextField
            type="file"
            multiple
            fullWidth
            onChange={(e) => handleImg(e.target.files)}
            inputProps={{ multiple: true }}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="userId"
            type="text"
            value={userId}
            name="userId"
            onChange={handleChange}
            variant="outlined"
            size="small"
            required
            style={{ display: "none" }}
          />

          <Button variant="contained" color="secondary" type="submit" fullWidth>
            {loading ? "uploading Images" : "Add Images Product"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Addproduct;
