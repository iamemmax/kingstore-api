import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, UPDATE_USER_PROFILE } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loading from "../../component/config/Loading";
import swal from "sweetalert";
import { CircularProgress, Grid } from "@mui/material";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { Country, State, City } from "country-state-city";
import axios from "axios";
import UserLayout from "../../Layout/UserLayout";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { id } = useParams();

  // let countryList = require("country-state-city").Country;
  // let stateList = require("country-state-city").State;

  // console.log(Country.getAllCountries());
  // console.log(State.getAllStates());

  // const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const [input, setInput] = useState({
    profile: "",
    country: user.user.country || "",
    city: user.user.city || "",
    state: user.user.state || "",
    address: user.user.address || "",
    posterCode: user.user.posterCode || "",
    phone: user.user.phone || "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImg = async (pic) => {
    setLoading(true);
    if (pic === undefined) {
      pic = user.user.profile;
    }
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/jpg"
    ) {
      let data = new FormData();
      // let pic = user.user.profile ||
      data.append("file", pic);
      data.append("upload_preset", "king-store");
      data.append("cloud_name", "dso8dzl1p");

      axios
        .post("https://api.cloudinary.com/v1_1/dso8dzl1p/image/upload", data)
        .then((data) => {
          let imgs = {
            img_url: data.data.secure_url,
            img_id: data.data.public_id,
          };
          // proImg.push(imgs);
          // setPic(imgs.toString());
          setInput({ ...input, profile: imgs });
          setLoading(false);
          // console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };

  let { profile, country, state, city, posterCode, address, phone } = input;

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { input };
    dispatch(UPDATE_USER_PROFILE(data));
  };

  const [countryLists, setCountryLists] = useState([]);
  const [stateLists, setStateLists] = useState([]);
  const [cityLists, setCityLists] = useState([]);

  useEffect(() => {
    setCountryLists(Country.getAllCountries());
  }, [countryLists, stateLists]);

  const handleState = (e) => {
    setStateLists(State.getStatesOfCountry(e.target.value));
  };
  const handleCity = (e) => {
    // console.log(e.target);
    setCityLists(City.getCitiesOfState(e.target.id, e.target.value));
  };
  console.log(stateLists);
  console.log(cityLists);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch, message, user, isSuccess]);

  if (isSuccess && user) {
    setTimeout(() => {
      navigate("/users/account");
    }, 5000);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError && message) {
    return toast.error(message, {
      toastId: "success1",
      position: "top-left",
    });
  }
  if (user && isSuccess) {
    swal({
      title: user.message,
      text: user.activationMsg,
      icon: "success",
      // button:close
    });
  }

  return (
    <UserLayout>
      <Box>
        <Typography variant="h5" component="h2" p={3}>
          UPDATE PROFILE
        </Typography>

        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <div className="userName">
                <TextField
                  type="text"
                  disabled
                  label="Username"
                  id="username"
                  placeholder="Username"
                  defaultValue={user?.user.username}
                  onChange={handleInput}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div className="email">
                <TextField
                  type="email"
                  disabled
                  label="email"
                  id="email"
                  fullWidth
                  placeholder="Email"
                  defaultValue={user?.user.email}
                  onChange={handleInput}
                />
              </div>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <div className="country">
                <TextField
                  type="country"
                  name="country"
                  label="Country"
                  // id="email"
                  fullWidth
                  placeholder="Country"
                  defaultValue={country}
                  onChange={handleInput}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div className="state">
                <TextField
                  type="text"
                  name="state"
                  label="State"
                  id="state"
                  placeholder="state"
                  defaultValue={state}
                  onChange={handleInput}
                  fullWidth
                />
              </div>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <div className="city">
                <TextField
                  type="city"
                  name="city"
                  label="city"
                  id="city"
                  fullWidth
                  placeholder="city"
                  defaultValue={city}
                  onChange={handleInput}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div className="poster">
                <TextField
                  type="text"
                  name="posterCode"
                  label="Poster Code"
                  // id="poster"
                  placeholder="Poster Code"
                  defaultValue={posterCode}
                  onChange={handleInput}
                  fullWidth
                />
              </div>
            </Grid>
          </Grid>

          <br />
          <select onChange={handleState}>
            {countryLists.map((x, i) => (
              <option key={i} value={x.isoCode}>
                {x.name}
              </option>
            ))}
          </select>
          <select onChange={handleCity}>
            {stateLists.map((x, i) => (
              <option key={i} value={x.isoCode}>
                {x.name}
              </option>
            ))}
          </select>
          <select>
            {cityLists.map((x, i) => (
              <option key={i} id={x.countryCode} value={x.isoCode}>
                {x.name}
              </option>
            ))}
          </select>
          <br />
          <br />

          <TextField
            name="profile"
            defaultValue={profile}
            onChange={handleInput}
            variant="outlined"
            label="profile"
            style={{ display: "none" }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <div className="phone">
                <TextField
                  type="phone"
                  name="phone"
                  label="Phone"
                  id="phone"
                  fullWidth
                  placeholder="Phone"
                  defaultValue={phone}
                  onChange={handleInput}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div className="poster">
                <TextField
                  type="file"
                  // id="profile"
                  onChange={(e) => handleImg(e.target.files[0])}
                  // inputProps={{ accept: "image/*" }}
                  fullWidth
                />
              </div>
            </Grid>
          </Grid>
          <br />
          <div className="address">
            <TextField
              type="text"
              name="address"
              label="Address"
              // id="poster"
              placeholder="Address"
              defaultValue={address}
              onChange={handleInput}
              fullWidth
              multiline
              rows={2}
            />
          </div>
          <br />

          <Button variant="contained" size="large" type="submit" fullWidth>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              "UPDATE PROFILE"
            )}
          </Button>
          <br />
        </form>
      </Box>
    </UserLayout>
  );
};

export default UpdateProfile;
