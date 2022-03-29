import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  cartContainer: {
    "& .cart_product": {
      display: "flex",
      border: "1px solid #eee",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "5px 0",
    },

    "& img": {
      width: "70px",
    },
    "& *": { fontSize: "14px" },
    "& .qty-box": {
      backgroundColor: "#f9f9f9",
      padding: "5px",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        width: "60px",
        padding: "5px 0",
      },

      "& input": {
        width: "30px",
        textAlign: "center",
        backgroundColor: "unset",
        border: "none",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
      "& .plus": {
        width: "30px",
      },
    },
  },
  summary: {
    border: "1px solid #eee",
    // padding: "5px",
    textAlign: "left",

    "& *": {
      padding: "10px",
      marginTop: "4px",
      border: "3px solid #f9f9f9",
    },
    "& span": {
      border: "none",
    },
    "& .Totalprice": {
      fontSize: 16,
      letterSpacing: 1,
    },
  },
}));
