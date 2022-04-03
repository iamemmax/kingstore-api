import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, registerUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import Loading from "../../component/config/Loading";
import swal from "sweetalert";
import AuthLayout from "../../Layout/AuthLayout";
import { CircularProgress } from "@mui/material";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handlePassword = (e) => {
    setShowPassword(!showPassword);
  };
  const handlePassword2 = (e) => {
    setShowPassword2(!showPassword2);
  };
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  // const [, ] = useState("");

  let proImg = [];
  const handleImg = async (img) => {
    setLoading(true);

    let data = new FormData();

    data.append("file", img);
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
      proImg.push(data);
      setPic(proImg);
      setLoading(false);
      // console.log(data);
    }
  };
  const [input, setinput] = useState({
    username: "",
    email: "",
    profile: proImg,
    password: "",
    password2: "",
  });
  const handleInput = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  let { username, email, profile, password, password2 } = input;

  console.log(input);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pic) {
      return toast.error("please choose a file", {
        toastId: "error2",
      });
    }
    dispatch(registerUser(input));
  };
  useEffect(() => {
    dispatch(reset());
  }, [dispatch, message, user, isSuccess]);

  if (isSuccess && user) {
    setTimeout(() => {
      navigate("/login");
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
    <AuthLayout>
      <Box>
        <Typography variant="h5" component="h2" p={1}>
          CREATES AN ACCOUNT
        </Typography>
        <div className="icon-box">
          <FaSignInAlt className="icon" />
        </div>
        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          <div className="userName">
            <TextField
              type="text"
              name="username"
              label="Username"
              id="username"
              placeholder="Username"
              defaultValue={username}
              onChange={handleInput}
              fullWidth
            />
          </div>
          <br />
          <div className="email">
            <TextField
              type="email"
              name="email"
              label="email"
              id="email"
              fullWidth
              placeholder="Email"
              defaultValue={email}
              onChange={handleInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="
                        start"
                    id=""
                    // onClick={}
                  >
                    @
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <br />
          <div className="password">
            <TextField
              type={showPassword ? "text" : "password"}
              label="password"
              name="password"
              fullWidth
              id="password"
              defaultValue={password}
              placeholder="Password"
              onChange={handleInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="
                        start"
                    id="passwordIcon"
                    onClick={handlePassword}
                    style={{ cursor: "pointer" }}
                  >
                    <AiFillEye />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <br />
          <div className="confirm">
            <TextField
              type={showPassword2 ? "text" : "password"}
              name="password2"
              label="password"
              id="password"
              placeholder="Confirm Password"
              color="primary"
              defaultValue={password2}
              onChange={handleInput}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="
                        start"
                    id="passwordIcon"
                    onClick={handlePassword2}
                    style={{ cursor: "pointer" }}
                  >
                    <AiFillEye />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <br />
          <TextField
            name="profile"
            value={profile}
            onChange={handleInput}
            variant="outlined"
            label="profile"
            style={{ display: "none" }}
          />
          <div className="profile">
            <TextField
              type="file"
              id="profile"
              onChange={(e) => handleImg(e.target.files[0])}
              fullWidth
            />
          </div>

          <br />

          <Button variant="contained" size="large" type="submit" fullWidth>
            {loading ? <CircularProgress color="secondary" /> : "REGISTER"}
          </Button>
          <br />

          <Typography
            variant="subtitle2"
            textAlign="right"
            p={2}
            color="GrayText"
          >
            Already a member{" "}
            <Link to="/login" color="secondary">
              Login
            </Link>
          </Typography>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default Register;
