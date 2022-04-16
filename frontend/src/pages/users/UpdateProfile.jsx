import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, UPDATE_USER_PROFILE } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import Loading from "../../component/config/Loading";
import swal from "sweetalert";
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
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
 
  const [loading, setLoading] = useState(false);
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const [input, setInput] = useState({
    profile: "",
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
         
          setInput({ ...input, profile: imgs });
          setLoading(false);
          // console.log(data);
        })
        .catch((err) => console.log(err));
      }
  };

  let { profile,  posterCode, address, phone } = input;


  const [countryLists, setCountryLists] = useState([]);
  const [country, setCountry] = useState(user?.user?.country ||"")
  const [contryCodes, setContryCodes] = useState("");
  const [stateLists, setStateLists] = useState([]);
  const [state, setState] = useState(user?.user?.state || "")
  const [cityLists, setCityLists] = useState([]);
  const [city, setCity] = useState(user?.user?.city || "")
  
  
  const handleCountry =  (e) => {
    setContryCodes(e.target.value)
    setStateLists(State.getStatesOfCountry(e.target.value));
    // setLocation({...location, country: stateLists})
    setCountry(e.target.value)

  };
  const handleState = (e) => {
    // console.log(e.target);
    setCityLists(City.getCitiesOfState(contryCodes, e));
    setState(e)
    
    // console.log(contryCodes);
  };
  
  const handleCity = (e) => {
    // console.log(e.target);
    setCity(e.target.value)
    
  };
  useEffect(() => {
    setCountryLists(Country.getAllCountries() );
    setStateLists(State.getStatesOfCountry(country));
    setCityLists(City.getCitiesOfState(country, state))
  
  }, [ country, state, city]);

 console.log(country, city, state);
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { profile,  city, posterCode, address, phone, country, state };
    dispatch(UPDATE_USER_PROFILE(data));
  };

  // let {country, state} = location
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
console.log(cityLists);
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
      
                 <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Country"
                  name="country"
                 value={country || ""}
                  onChange={handleCountry}
                >
                  {countryLists.map((x, i) => (
                    <MenuItem key={i} value={x.isoCode}>
                      {x.name}
                    </MenuItem>
                  ))}
                 
                </Select>
              </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div className="state">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="State"
                  name="state"
                 value={state || ""}
                  onChange={(e) => handleState(e.target.value)}
                >
                  {stateLists.map((x, i) => (
                    <MenuItem key={i} value={x.isoCode}>
                      {x.name}
                    </MenuItem>
                  ))}
                 
                </Select>
              </FormControl>
              </div>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <div className="city">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="City"
                  name="city"
                 value={city || ""}
                  onChange={handleCity}
                >
                  {cityLists.map((x, i) => (
                    <MenuItem key={i} value={x.name}>
                      {x.name}
                    </MenuItem>
                  ))}
                 
                </Select>
              </FormControl>

               {/* <select onChange={(e) =>handleCity(e.target.value)} value={city}>
            {cityLists.map((x, i) => (
              <option key={i} id={x.countryCode} value={x.isoCode}>
                {x.name}
              </option>
            ))}
          </select> */}
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
          {/* <select onChange={handleCountry}>
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
          <br /> */}

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
