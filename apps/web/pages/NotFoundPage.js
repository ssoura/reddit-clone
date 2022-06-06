import React from "react";

import { Container, Paper, Typography, SvgIcon } from "@material-ui/core";
import { useNotFoundPageStyles } from "../styles/muiStyles";

const NotFoundPage = () => {
  const classes = useNotFoundPageStyles();

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <div className={classes.textWrapper}>
          <Typography color="secondary" variant="h4">
            Page Not Found
          </Typography>
          <Typography color="secondary" variant="h6">
            The page you requested does not exist
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
