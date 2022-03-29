import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../features/auth/verifySlice";
import swal from "sweetalert";
import { toast } from "react-toastify";
import Loading from "../component/config/Loading";

const Verify = () => {
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const navigate = useNavigate();
  let data = { id, token };
  useEffect(() => {
    dispatch(verifyUser(data));
    // navigate("/login");
  }, [dispatch, navigate, id, token]);
  const { verify, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.verify
  );
  if (isSuccess && verify) {
    swal({
      title: verify.message,
      icon: "success",
      button: "ok",
    });
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {isError && message && toast.error(message, { toastId: "success1" })}
    </div>
  );
};

export default Verify;
