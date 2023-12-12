import React from 'react';
import { Box } from "@mui/material";

const Container = (props) => {
  return (
    <Box
      style={{
        minWidth: "100%",
        minHeight: "calc(100vh - 88px)",
        paddingTop: "90px",
      }}
    >
      {props.children}
    </Box>
  );
}

export default Container;
