import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  AuthLayOutWrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    margin: "0",
    backgroundColor: [theme.palette.primary.main],
    position: "fixed",
    inset: "0",

    "& *": { textDecoration: "none" },
    "&  > div": {
      height: "100vh",
    },
    "& .children": {
      backgroundColor: "#fff",
      height: "100vh",
      padding: "40px",
    },
    "& .icon-box": {
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      margin: "10px auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: [theme.palette.primary.main],
      color: "#fff",
      "& .icon": {
        fontSize: 30,
      },
    },

    "& .sidebar": {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  },
}));
