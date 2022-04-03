import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: "10px",

    "& .img-box": {
      border: "2px solid #eee",
      height: "100%",
      "& .clickImg": {
        border: "2px solid #f9f9f9",
        padding: "5px",
        cursor: "pointer",
      },
    },
    "& .text": {
      width: "100%",
      padding: "10px 20px",

      "& *": {
        textAlign: "left",
      },
      "& .description": {
        lineHeight: "30px",
      },
    },
    "& .add-to-cart": {
      width: "100%",
      border: "2px solid #f7f7f7",

      "& .selectQty": {
        margin: "5px 0",
      },
      "& .disable": {
        cursor: "not-allowed",
      },
    },
  },
}));
