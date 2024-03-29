import React from "react";

import { useScrollTrigger, Slide } from "@mui/material";

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
