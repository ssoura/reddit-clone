import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { UpvoteButton, DownvoteButton } from "./VoteButtons";
import { notify } from "../reducers/notificationReducer";
import EditDeleteMenu from "./EditDeleteMenu";
import getEditedThumbail from "../utils/cloudinaryTransform";
import { trimLink, prettifyLink, fixUrl } from "../utils/formatUrl";
import TimeAgo from "timeago-react";
import getErrorMsg from "../utils/getErrorMsg";

import {
  Paper,
  Typography,
  useMediaQuery,
  CardMedia,
  Button,
} from "@mui/material";

import { useCardStyles } from "../styles/muiStyles";
import { useTheme } from "@mui/material/styles";
import MessageIcon from "@mui/icons-material/Message";
import LinkIcon from "@mui/icons-material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CommentIcon from "@mui/icons-material/Comment";

const PostCard = ({ post, toggleUpvote, toggleDownvote }) => {
  const {
    id,
    title,
    postType,
    textSubmission,
    linkSubmission,
    imageSubmission,
    subreddit,
    author,
    upvotedBy,
    downvotedBy,
    pointsCount,
    commentCount,
    createdAt,
    updatedAt,
  } = post;

  const classes = useCardStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { user, darkMode } = useSelector((state) => state);

  const isUpvoted = user && upvotedBy.includes(user.id);
  const isDownvoted = user && downvotedBy.includes(user.id);

  const handleUpvoteToggle = async () => {
    try {
      if (isUpvoted) {
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        dispatch(toggleUpvote(id, updatedUpvotedBy, downvotedBy));
      } else {
        const updatedUpvotedBy = [...upvotedBy, user.id];
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        dispatch(toggleUpvote(id, updatedUpvotedBy, updatedDownvotedBy));
      }
    } catch (err) {
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  const handleDownvoteToggle = async () => {
    try {
      if (isDownvoted) {
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        dispatch(toggleDownvote(id, updatedDownvotedBy, upvotedBy));
      } else {
        const updatedDownvotedBy = [...downvotedBy, user.id];
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        dispatch(toggleDownvote(id, updatedDownvotedBy, updatedUpvotedBy));
      }
    } catch (err) {
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  const linkToShow =
    postType === "Link"
      ? linkSubmission
      : postType === "Image"
      ? imageSubmission.imageLink
      : "";

  const formattedLink = trimLink(prettifyLink(linkToShow), 30);

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.votesWrapper}>
        <UpvoteButton
          user={user}
          body={post}
          handleUpvote={handleUpvoteToggle}
          size={isMobile ? "small" : "medium"}
        />
        <Typography
          variant="body1"
          style={{
            color: isUpvoted
              ? "#FF8b60"
              : isDownvoted
              ? "#9494FF"
              : darkMode
              ? "#e4e4e4"
              : "#333",
            fontWeight: 600,
          }}
        >
          {pointsCount}
        </Typography>
        <DownvoteButton
          user={user}
          body={post}
          handleDownvote={handleDownvoteToggle}
          size={isMobile ? "small" : "medium"}
        />
      </div>
      <div className={classes.thumbnailWrapper}>
        {postType === "Text" ? (
          <Link href={`/comments/${id}`}>
            <a>
              {/* <Paper elevation={0} square className={classes.thumbnail}>
                <MessageIcon
                  fontSize="inherit"
                  className={classes.thumbnailIcon}
                  style={{ color: "#787878" }}
                />
              </Paper> */}
              Message
            </a>
          </Link>
        ) : postType === "Link" ? (
          <a href={fixUrl(linkSubmission)} target="_noblank">
            <Paper elevation={0} square className={classes.thumbnail}>
              <LinkIcon
                fontSize="inherit"
                className={classes.thumbnailIcon}
                style={{ color: "#787878" }}
              />
            </Paper>
          </a>
        ) : (
          <Paper elevation={0} square className={classes.thumbnail}>
            <CardMedia
              className={classes.thumbnail}
              image={getEditedThumbail(imageSubmission.imageLink)}
              title={title}
              component="a"
              href={imageSubmission.imageLink}
              target="_noblank"
            />
          </Paper>
        )}
      </div>
      <div className={classes.postInfoWrapper}>
        <Typography variant="h6" className={classes.title}>
          {title}{" "}
          <Typography variant="caption" color="primary" className={classes.url}>
            <Link
              href={
                postType === "Link"
                  ? fixUrl(linkSubmission)
                  : postType === "Image"
                  ? imageSubmission.imageLink
                  : ""
              }
            >
              <a>
                {/* {formattedLink}ß */}
                {postType === "Text" ? null : (
                  <OpenInNewIcon fontSize="inherit" />
                )}
              </a>
            </Link>
          </Typography>
        </Typography>
        <Typography variant="subtitle2">
          <Link href={`/r/${subreddit.subredditName}`}>
            <a>r/{subreddit.subredditName}</a>
          </Link>
          <Typography variant="caption" className={classes.userAndDate}>
            Posted by{" "}
            <Link href={`/u/${author.username}`}>
              <a>u/{author.username}</a>
            </Link>{" "}
            • <TimeAgo datetime={new Date(createdAt)} />
            {createdAt !== updatedAt && "*"}
          </Typography>
        </Typography>
        <div className={classes.bottomBtns}>
          <Button
            startIcon={<CommentIcon />}
            className={classes.commentsBtn}
            href={`/comments/${id}`}
            size={isMobile ? "small" : "medium"}
          >
            {commentCount} comments
          </Button>
          {user && user.id === author.id && (
            <EditDeleteMenu
              id={id}
              isMobile={isMobile}
              title={title}
              postType={postType}
              subreddit={subreddit}
              textSubmission={textSubmission}
              linkSubmission={linkSubmission}
            />
          )}
        </div>
      </div>
    </Paper>
  );
};

export default PostCard;
