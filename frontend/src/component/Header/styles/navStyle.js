import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  laptop: {
    width: "90%",
    height: "70px",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",

    "& div": {
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& li": {
      listStyle: "none",
    },
    "& .logo a": {
      color: "#fff",
      textDecoration: "none",
      fontSize: "20px",
    },
    "& .link": {
      color: "#fff",
    },

    "& a": {
      color: "#fff",
      textDecoration: "none",
      margin: "5px",
      fontSize: "14px",
      textTransform: "capitalize",

      "& :hover": {
        color: theme.palette.secondary.main,
      },
    },
    "& .rightNav .navigation": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    "& .active": {
      color: theme.palette.secondary.main,
    },
    "& .logout": {
      textTransform: "capitalize",
      color: "#eee",
    },
  },
  searchBox: {
    flexGrow: 1,

    "& .searchBtn": {
      position: "absolute",
      right: "2px",
      backgroundColor: "unset",
      color: [theme.palette.secondary.main],
      fontSize: 20,
    },
  },
  search: {
    width: "450px",
    backgroundColor: "#fff",
    position: "relative",

    [theme.breakpoints.down("md")]: {
      width: "95%",
    },

    "& .MuiInputBase-input": {
      color: "#000",
      padding: "10px 0",
      paddingLeft: "20px",
      paddingRight: "40px",
      outline: "none",
      width: "100%",

      [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: "5px 20px 5px 20px",
      },
    },
  },

  tabs: {
    width: 100,
    minWidth: 100,
    textTransform: "capitalize",
    fontFamily: " 'Poppins', sans-serif;font-family: 'Montserrat', sans-serif",
    fontSize: 16,
    transition: "color .5s ease",
  },

  phone: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",

    "& .menu": {
      fontSize: "25px",
      cursor: "pointer",
    },
    "& .logo a": {
      color: "#fff",
      textDecoration: "none",
      fontSize: "18px",
    },
  },
}));
