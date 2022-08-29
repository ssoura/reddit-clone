import React from "react";

import { Button } from "@mui/material";
import { usePostListStyles } from "../styles/muiStyles";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const LoadMoreButton = ({ handleLoadPosts, loading }) => {
  const classes = usePostListStyles();

  return (
    <div className={classes.loadBtnWrapper}>
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={handleLoadPosts}
        startIcon={<AutorenewIcon />}
        className={classes.loadBtn}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
