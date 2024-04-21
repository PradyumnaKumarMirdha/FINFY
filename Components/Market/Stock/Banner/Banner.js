import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Carousel from "./Carousel";
import { StockProvider } from "../../../../app/Market/context/Stock/stockContext";
import "./global.css";

const useStyles = makeStyles((theme) => ({
  banner: {
    // backgroundColor: "hsla(0, 12%, 97%, 0.112)",
    backgroundColor: "transparent",
    width: "90%", // Full width of the viewport
    paddingLeft: theme.spacing(2), // Add some padding to the left and right
    position: "relative",
    zIndex: "21",
    paddingRight: theme.spacing(2),
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    display: "flex",
    alignItems: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <StockProvider>
      <div className={classes.banner}>
        <Container className={classes.bannerContent} maxWidth="none">
          <div className={classes.tagline}>
            <h1 className="text-black dark:text-white"
              style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
                fontSize: "90px",
                lineHeight: "95px",
              }}
            >
              Stock Market
            </h1>
          </div>
          <Carousel />
        </Container>
      </div>
    </StockProvider>
  );
};

export default Banner;
