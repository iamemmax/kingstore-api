import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  banner: {
    height: "450px",
    width: "100%",
    backgroundColor: [theme.palette.primary.light],

    "& img": {
      margin: "20px auto",
      backgroundColor: "#fff",
      borderRadius: "50%",
      padding: "10px",
      [theme.breakpoints.down("md")]: {
        height: "200px",
      },
    },
    "& .text": {
      display: "flex",
      alignItem: "center",
      justifyContent: "center",
      marginTop: "10px",
      textTransform: "uppercase",
      letterSpacing: 4,
    },
    "& .price": {
      fontSize: "16px",
      marginTop: "7px",
      marginLeft: 10,
      color: "#eee",
      letterSpacing: 2,
    },
    "& .slick-dots li button:before": {
      color: "#fff",
      width: "30px",
      borderRadius: "0px",
    },
    "& .slick-prev": { left: 0, zIndex: 2, color: "#fff" },
    "& .slick-next": { right: 0 },
    " & .slick-next:before, .slick-prev:before": {
      color: theme.palette.secondary.main,
    },
  },
}));
