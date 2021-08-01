import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        padding: 0,
        margin: 0,
        scrollBehavior: "smooth",
        minHeight: "100vh",
      },
      body: {
        display: "flex",
        flexDirection: "column",
      },
    },
  },
  breakpoints: {
    sm: "425px",
    smx: "596px",
    md: "768px",
    mdx: "896px",
    lg: "1024px",
    lgx: "1232px",
    xl: "1440px",
  },
});
