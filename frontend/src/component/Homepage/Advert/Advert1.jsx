import { Grid } from "@mui/material";
import React from "react";

import img1 from "./img/nexus-fan_572x250.png";
import img2 from "./img/xiaomi-note11s_572x250.png";

import { useStyles } from "./styles/styles";
function Advert1() {
  const { advertContainer } = useStyles();
  return (
    <div className={advertContainer}>
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={6}>
          <div className="left_box">
            <img src={img1} alt="poster" />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className="right_box">
            <img src={img2} alt="poster" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Advert1;
