import React from "react";
import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <>
      <div style={style}>
        <Oval height="100" width="100" color="grey" ariaLabel="loading" />
      </div>
    </>
  );
};

const style = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  position: "fixed",
  inset: "0",
};

export default Loading;
