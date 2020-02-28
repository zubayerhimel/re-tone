export default {
  Navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "6vh"
  },
  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "22px",
    backgroundColor: "#23404d",
    fontFamily: "Inconsolata",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      color: "#dae1e4"
    }
  },
  slider: {
    width: "340px",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-track": {
      backgroundColor: "transparent"
    },
    "& .rc-slider-rail": {
      height: "8px"
    },
    "& .rc-slider-handle, .slider .rc-slider-handle:active,.slider .rc-slider-handle:focus, .slider .rc-slider-handle:hover": {
      backgroundColor: "green",
      outline: "none",
      border: " 2px solid green",
      boxShadow: "none",
      width: "13px",
      height: "13px",
      marginLeft: "-7px",
      marginTop: "-3px"
    }
  },
  selectContainer: {
    marginLeft: "auto",
    marginRight: "1rem"
  }
};
