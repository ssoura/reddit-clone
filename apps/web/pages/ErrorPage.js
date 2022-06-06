import React from "react";

import { Typography, SvgIcon } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const ErrorPage = ({ errorMsg }) => {
  const isNotFoundError =
    errorMsg.includes("does not exist") || errorMsg.includes("Malformatted");

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      {isNotFoundError ? (
        <h1>Error</h1>
      ) : (
        <ErrorOutlineIcon
          color="primary"
          style={{ fontSize: "8em", marginBottom: "0.5em" }}
        />
      )}
      <Typography color="secondary" variant="h4">
        {isNotFoundError ? `404 Not Found` : "Error"}
      </Typography>
      <Typography color="secondary" variant="h6">
        {errorMsg}
      </Typography>
    </div>
  );
};

export default ErrorPage;
