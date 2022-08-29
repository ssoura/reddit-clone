import React from "react";
import AuthFormModal from "./AuthFormModal";

import { Checkbox } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const UpvoteButton = ({ user, body, handleUpvote, size }) => {
  return user ? (
    <Checkbox
      checked={body.upvotedBy.includes(user.id)}
      icon={<ArrowUpwardIcon style={{ color: "#b2b2b2" }} />}
      checkedIcon={<ArrowUpwardIcon style={{ color: "#FF8b60" }} />}
      onChange={handleUpvote}
      size={size || "small"}
    />
  ) : (
    <AuthFormModal type="upvote" />
  );
};

export const DownvoteButton = ({ user, body, handleDownvote, size }) => {
  return user ? (
    <Checkbox
      checked={body.downvotedBy.includes(user.id)}
      icon={<ArrowDownwardIcon style={{ color: "#b2b2b2" }} />}
      checkedIcon={<ArrowDownwardIcon style={{ color: "#9494FF" }} />}
      onChange={handleDownvote}
      size={size || "small"}
    />
  ) : (
    <AuthFormModal type="downvote" />
  );
};
