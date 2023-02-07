const palette = {
    black: "#000",
    white: "#FFF",
    link: "#4290F5"
  };
  
  const lightTheme = {
    colors: {
      transparent: palette.transparent,
      white: palette.white,
      black: palette.black,
      linkText: palette.link
    },
    textVariants: {
      heading: {
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.3,
        color: "black",
      },
    },       
    buttonVariants: {
      primary: {
        backgroundColor: "black",
      },
    },
    buttonLabelVariants: {
      primary: {
        color: "white"
      },
    },
    spacing: {
      px: 1,
      "0": 0,
      "0.5": 2,
      "0.75": 3,
      "1": 4,
      "1.25": 5,
      "1.5": 6,
      "1.75": 7,
      "2": 8,
      "2.5": 10,
      "3": 12,
      "3.25": 13,
      "3.5": 14,
      "3.75": 15,
      "4": 16,
      "4.25": 17,
      "5": 20,
      "6": 24,
      "8": 32,
      "10": 40,
      "11": 44,
      "12": 48,
      "16": 64,
      "20": 80,
      "24": 96,
      "32": 128,
      "40": 160,
      "48": 192,
      "56": 224,
      "64": 256,
    },
    breakpoints: {
      phone: 0,
      tablet: 768,
    },
  };
  
  const darkTheme = {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      white: palette.black,
      black: palette.white,
    },
  };
  
  export {lightTheme, darkTheme}
  