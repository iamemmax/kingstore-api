import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  banner: {
    height: "400px",
    width: "100%",
    backgroundColor: [theme.palette.primary.light],

    "& img": {
      margin: "0px auto",
    },
    "& .text": {
      display: "flex",
      alignItem: "center",
      justifyContent: "center",
      marginTop: "10px",
    },
    "& .price": {
      fontSize: "14px",
      marginTop: "7px",
      marginLeft: 10,
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
