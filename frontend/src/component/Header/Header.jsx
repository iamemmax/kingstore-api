import { mainNav, rightNav } from "./navigation";
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
  Avatar,
  MenuItem,
  Menu,
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
    setAnchorEl(null);
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  const { tabs, header, laptop, phone } = useStyles();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));

  // menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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

                <div className="user">
                  {user && (
                    <>
                      <Avatar
                        alt="Profile Img"
                        src={user?.user?.profile[0]?.img_url}
                        sx={{ width: 56, height: 56 }}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  )}
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
                    {!user &&
                      rightNav?.map((nav, index) => (
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
                      <Avatar
                        alt="Profile Img"
                        src={user?.user?.profile[0]?.img_url}
                        sx={{ width: 50, height: 50 }}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {user ? (
              <>
                <MenuItem onClick={handleClose}>
                  <Link to="/users/account">My account</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  {" "}
                  <Link to="/users/orders">My Orders</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleClose}>
                <Link to="/users/login">Signin</Link>
              </MenuItem>
            )}
          </Menu>
        </div>

        <Toolbar />
      </Container>
    </div>
  );
};

export default Header;
