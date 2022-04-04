import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  cardContainer: {
    transition: "transform 1s ease",
    backgroundColor: "#f5f5f5",
    "& .css-46bh2p-MuiCardContent-root": {
      padding: "5px",
    },
    "& img": {
      width: "100%",
    },
    "& .title": {
      fontSize: "14px",
    },
    "& .price": {
      fontSize: "14px",
      marginBottom: "0px",
      letterSpacing: 2,
    },
    "& .button": {
      width: "100%",
      backgroundColor: [theme.palette.primary.light],
      transition: "background .5s cubic-bezier(0.075, 0.82, 0.165, 1)",
      color: "#fff",
      "&:hover": {
        backgroundColor: [theme.palette.secondary.dark],
        transition: "background .5s cubic-bezier(0.075, 0.82, 0.165, 1)",
      },
    },
    "&:hover": {
      transform: "scale(0.99)",
      transition: "transform .5s ease",
      backgroundColor: "unset",
    },
    "& .stars": {
      // fontSize: 14,
    },
  },

  TopSellingcardContainer: {
    border: "none",
    backgroundColor: "unset",
  },
}));
