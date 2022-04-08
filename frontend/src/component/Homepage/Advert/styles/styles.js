import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  advertContainer: {
    height: "250px",
    width: "100%",
    padding: "10px",
    margin: "20px 0",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      margin: "0 0",
      width: "100%",
      display: "none",
    },

    "& .left_box": {
      width: "98%",
      height: "250px",
      [theme.breakpoints.down("md")]: {
        height: "200px",
        display: "none",
      },
    },
    "& .right_box": {
      width: "98%",
      height: "250px",
      [theme.breakpoints.down("md")]: {
        height: "200px",
      },
    },
  },
}));
