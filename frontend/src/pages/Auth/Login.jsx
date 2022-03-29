import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, LoginUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/config/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setinput] = useState({
    email: "",
    password: "",
  });

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
    navigate("/");
  }
  if (isLoading) {
    return <Loading />;
  }

  if (isError && message) {
    return toast.error(message, {
      toastId: "success1",
    });
  }

  return (
    <div>
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
      <h2>Login User</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
