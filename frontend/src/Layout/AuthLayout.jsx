import React from "react";
import { Grid } from "@mui/material";
import { useStyles } from "./styles/AuthLayoutStyles";

function AuthLayout({ children }) {
  const { AuthLayOutWrapper } = useStyles();

  return (
    <div className={AuthLayOutWrapper}>
      <Grid container>
        <Grid item xs={12} sm={12} md={5}>
          <div className="children">{children}</div>
        </Grid>
        <Grid item md={7}>
          <div className="sidebar">hello</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default AuthLayout;
