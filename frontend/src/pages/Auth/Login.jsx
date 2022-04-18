import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, LoginUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../component/config/Loading";
import AuthLayout from "../../Layout/AuthLayout";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setinput] = useState({
    email: "",
    password: "",
  });

const location = useLocation()
const from = location?.state?.from?.pathname || "/"
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = (e) => {
    setShowPassword(!showPassword);
  };
  const handleInput = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  let { email, password } = input;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(LoginUser(input));
  };
  useEffect(() => {
    dispatch(reset());
  }, [dispatch, message, user, isSuccess]);

  if (isSuccess && user) {
    navigate( from, {replace:true});
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

  return (
    <AuthLayout>
      {/* {user && (
        <>
          {" "}
          {
            <SweetAlert success title={user.message} type="success">
              {user.activationMsg}
            </SweetAlert>
          }
        </>
      )} */}
      <Typography variant="h5" component="h2" p={3}>
        LOGIN ACCOUNT
      </Typography>
      <div className="icon-box">
        <FaSignInAlt className="icon" />
      </div>
      <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
        <div className="email">
          <TextField
            type="text"
            name="email"
            label="email"
            id="email"
            fullWidth
            placeholder="Email"
            defaultValue={email}
            onChange={handleInput}
            // focused
          />
        </div>
        <br />
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
        <br />

        <Button variant="contained" size="large" type="submit" fullWidth>
          Login
        </Button>
        <br />
        <Typography
          variant="subtitle2"
          textAlign="right"
          p={2}
          color="GrayText"
        >
          Not Yet a member{" "}
          <Link to="/register" color="secondary">
            Signup
          </Link>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default Login;
