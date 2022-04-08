import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserLayout from "../../Layout/UserLayout";
import { reset, UPDATE_USER_PASSWORD } from "../../features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../component/config/Loading";
import { CircularProgress } from "@mui/material";
import swal from "sweetalert";

function Password() {
  const [input, setInput] = useState({
    oldpassword: "",
    password1: "",
    password2: "",
  });
  const handleChange = (name) => (e) => {
    setInput({ ...input, [name]: e.target.value });
  };
  let { oldpassword, password1, password2 } = input;
  const [password1Error, setPassword1Error] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword1Error(false);
    setPassword2Error(false);
    setOldPasswordError(false);

    if (oldpassword === "" || !password1 || !password2) {
      setPassword1Error(true);
      setPassword2Error(true);
      setOldPasswordError(true);
      return toast.error("all field are required");
    }
    if (password1 !== password2) {
      setPassword1Error(true);
      setPassword2Error(true);
      return toast.error("password1 and password2 not matched");
    }
    let data = { id, oldpassword, password1 };

    dispatch(UPDATE_USER_PASSWORD(data));
  };
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    dispatch(reset());
    setPassword1Error(false);
    setPassword2Error(false);
    setOldPasswordError(false);
  }, [dispatch, message, user, isSuccess]);

  if (isError) {
    return toast.error(message, {
      toastId: "success1",
      position: "top-left",
    });
  }
  if (user && isSuccess) {
    toast.success("password changed successfully", { toastId: "password1" });
    setTimeout(() => {
      navigate("/users/account");
    }, 5000);
  }
  return (
    <UserLayout>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h5" compnent="h2" p={3}>
          CHANGE PASSWORD
        </Typography>
        <div className="oldPassword">
          <TextField
            label="Old password"
            onChange={handleChange("oldpassword")}
            placeholder="Old Password"
            type="password"
            error={oldPasswordError}
          />
        </div>
        <br />
        <div className="NewPassword">
          <TextField
            label="New password"
            onChange={handleChange("password1")}
            placeholder="New Password"
            error={password1Error}
            type="password"
          />
        </div>
        <br />
        <div className="Confirm Password">
          <TextField
            type="password"
            label="New password"
            onChange={handleChange("password2")}
            placeholder="Confirm Password"
            error={password2Error}
          />
        </div>
        <br />
        <Button type="submit" variant="contained" color="secondary">
          {isLoading ? <CircularProgress /> : "Change Password"}
        </Button>
      </form>
    </UserLayout>
  );
}

export default Password;
