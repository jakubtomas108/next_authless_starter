import React from "react";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box my="80px">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
