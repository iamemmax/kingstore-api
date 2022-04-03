import { Container } from "@mui/material";
import React from "react";

import Header from "../component/Header/Header";
function HomeLayout({ children }) {
  return (
    <Container>
      <div className="homeLayout">
        <header>
          <Header />
        </header>
        <div>
          <div className="layout">{children}</div>
        </div>
      </div>
    </Container>
  );
}

export default HomeLayout;
