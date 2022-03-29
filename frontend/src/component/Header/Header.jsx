import { mainNav, rightNav, authNav } from "./navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../features/auth/authSlice";
import {
  AppBar,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Button,
  useMediaQuery,
  Typography,
  Drawer,
  Badge,
} from "@mui/material";
import { FaSignOutAlt, FaBars, FaCartPlus } from "react-icons/fa";

import { useTheme } from "@emotion/react";
// import { NavLink } from "react-router-dom";
import { useStyles } from "./styles/navStyle";
import Search from "./Search";
import { useState } from "react";
import DrawerContainer from "./DrawerContainer";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  let oo = cart?.map((res) => res.qty);

  let cartNumber = oo?.reduce((x, y) => x + y, 0);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(LogoutUser());
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  const { tabs, header, laptop, phone } = useStyles();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <div className={header}>
      <Container>
        <AppBar>
          <Toolbar>
            {isMatch ? (
              <div className={phone}>
                <div className="logo">
                  <Typography variant="h6" component="h2" color="inherit">
                    <Link to="/" className="logo">
                      Kingstore
                    </Link>
                  </Typography>
                </div>
                <DrawerContainer
                  open={openDrawer}
                  onClose={() => setOpenDrawer(false)}
                  drawerlinkBtn={() => setOpenDrawer(false)}
                />

                <div className="search">
                  <Search id="mobileSearch" />
                </div>
                <div className="cart">
                  <Tabs>
                    <Tab
                      label=""
                      icon={
                        <Badge
                          badgeContent={cartNumber ? cartNumber : "0"}
                          color="error"
                        >
                          <FaCartPlus />
                        </Badge>
                      }
                      classes={{ root: tabs }}
                      iconPosition="end"
                      onClick={(e) => navigate("/cart")}
                      className={
                        location.pathname === "/cart" ? "active" : "link"
                      }
                    />
                  </Tabs>
                </div>

                <div className="menu">
                  <FaBars onClick={() => setOpenDrawer(true)} />
                </div>
              </div>
            ) : (
              <div className={laptop}>
                <div className="logo">
                  <Typography variant="h6" component="h2" color="inherit">
                    <Link to="/" className="logo">
                      Kingstore
                    </Link>
                  </Typography>
                </div>
                <div className="navigation">
                  <Tabs>
                    {mainNav?.map((nav, index) => (
                      <Tab
                        label={nav.name}
                        classes={{ root: tabs }}
                        key={index}
                        className={
                          location.pathname === nav.path ? "active" : "link"
                        }
                        onClick={(e) => navigate(nav.path)}
                      />
                    ))}
                  </Tabs>
                </div>

                <div className="search">
                  <Search />
                </div>

                <div className="rightNav">
                  <Tabs>
                    {!user
                      ? rightNav?.map((nav, index) => (
                          <Tab
                            key={index}
                            label={nav.name}
                            icon={nav.icons}
                            classes={{ root: tabs }}
                            iconPosition="start"
                            className={
                              location.pathname === nav.path ? "active" : "link"
                            }
                            onClick={(e) => navigate(nav.path)}
                          />
                        ))
                      : authNav?.map((nav, index) => (
                          <Tab
                            icon={nav.icons}
                            label={nav.name}
                            key={index}
                            classes={{ root: tabs }}
                            iconPosition="start"
                            className={
                              location.pathname === nav.path ? "active" : "link"
                            }
                            onClick={(e) => navigate(nav.path)}
                          />
                        ))}
                  </Tabs>

                  <Tabs>
                    <Tab
                      label=""
                      className={
                        location.pathname === "/cart" ? "active" : "link"
                      }
                      style={{ color: "#fff" }}
                      icon={
                        <Badge
                          badgeContent={cartNumber ? cartNumber : "0"}
                          color="error"
                        >
                          <FaCartPlus />
                        </Badge>
                      }
                      classes={{ root: tabs }}
                      iconPosition="end"
                      onClick={(e) => navigate("/cart")}
                    />
                  </Tabs>
                  {/* </Badge> */}
                  {user && (
                    <>
                      <li>
                        <Button
                          onClick={handleLogout}
                          startIcon={<FaSignOutAlt />}
                          variant="outline"
                          className="logout"
                        >
                          Logout
                        </Button>
                      </li>
                    </>
                  )}
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <Toolbar />
      </Container>
    </div>
  );
};

export default Header;
