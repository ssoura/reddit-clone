import React, { useState } from "react";
import { Link } from "next/link";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/postCommentsReducer";
import { notify } from "../reducers/notificationReducer";
import getErrorMsg from "../utils/getErrorMsg";

import { Typography, TextField, Button } from "@mui/material";
import { useCommentInputStyles } from "../styles/muiStyles";
import SendIcon from "@mui/icons-material/Send";

const CommentInput = ({ user, postId, isMobile }) => {
  const classes = useCommentInputStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await dispatch(addComment(postId, comment));
      setSubmitting(false);
      setComment("");
      dispatch(notify(`Comment submitted!`, "success"));
    } catch (err) {
      setSubmitting(false);
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  return (
    <div className={classes.wrapper}>
      {user ? (
        <Typography variant="body2">
          Comment as{" "}
          <Link href={`/u/${user.username}`}>
            <a>{user.username}</a>
          </Link>
        </Typography>
      ) : (
        <Typography variant="body1">
          Log in or sign up to leave a comment
        </Typography>
      )}
      <form className={classes.form} onSubmit={handlePostComment}>
        <TextField
          placeholder={`What are your thoughts?`}
          multiline
          fullWidth
          required
          rows={4}
          maxRows={Infinity}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          size={isMobile ? "small" : "medium"}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.commentBtn}
          startIcon={<SendIcon />}
          size={isMobile ? "small" : "medium"}
          disabled={!user || submitting}
        >
          {!user ? "Login to comment" : submitting ? "Commenting" : "Comment"}
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
