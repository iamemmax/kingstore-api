import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, registerUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Loading from "../../component/config/Loading";
import swal from "sweetalert";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setinput] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [pic, setPic] = useState("");
  const handleInput = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const handleImg = (e) => {
    setPic(e.target.files[0]);
  };

  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  let { username, email, password, password2 } = input;

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password2", password2);
    formData.append("profile", pic);

    dispatch(registerUser(formData));
    console.log(formData);
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
    });
  }
  if (user && isSuccess) {
    swal({
      title: user.message,
      text: user.activationMsg,
      icon: "success",
      button: "ok",
    });
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="userName">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={handleInput}
          />
        </div>
        <div className="email">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleInput}
          />
        </div>
        <div className="password">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={handleInput}
          />
        </div>
        <div className="confirm">
          <input
            type="password"
            name="password2"
            id="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={handleInput}
          />
        </div>

        <div className="profile">
          <input
            type="file"
            name="profile"
            id="profile"
            filename={pic}
            onChange={handleImg}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
