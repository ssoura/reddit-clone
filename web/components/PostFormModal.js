import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostForm from "./PostForm";
import HideOnScroll from "./HideOnScroll";
import { getCircularAvatar } from "../utils/cloudinaryTransform";

import { DialogTitle, DialogContent } from "./CustomDialogTitle";
import {
  Dialog,
  Button,
  Fab,
  IconButton,
  Paper,
  Avatar,
  useMediaQuery,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useDialogStyles } from "../styles/muiStyles";
import { useTheme } from "@mui/material/styles";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";

const AddPostModal = ({
  actionType,
  handleMenuClose,
  postToEditType,
  postToEditTitle,
  postToEditSub,
  postToEditId,
  textSubmission,
  linkSubmission,
  fromSubreddit,
}) => {
  const [open, setOpen] = useState(false);
  const [postType, setPostType] = useState("Text");
  const user = useSelector((state) => state.user);

  const classes = useDialogStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextPost = () => {
    setPostType("Text");
    handleClickOpen();
  };

  const handleImagePost = () => {
    setPostType("Image");
    handleClickOpen();
  };

  const handleLinkPost = () => {
    setPostType("Link");
    handleClickOpen();
  };

  const handleMenuClick = () => {
    handleClickOpen();
    handleMenuClose();
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      {actionType === "edit" ? (
        <MenuItem onClick={handleMenuClick}>
          <ListItemIcon>
            <EditIcon style={{ marginRight: 7 }} />
            Edit Post
          </ListItemIcon>
        </MenuItem>
      ) : isMobile ? (
        <HideOnScroll>
          <Fab
            className={classes.fab}
            color="primary"
            onClick={handleClickOpen}
          >
            <PostAddIcon />
          </Fab>
        </HideOnScroll>
      ) : (
        <Paper variant="outlined" className={classes.createPostWrapper}>
          {user.avatar && user.avatar.exists ? (
            <Avatar
              alt={user.username}
              src={getCircularAvatar(user.avatar.imageLink)}
            />
          ) : (
            <Avatar className={classes.defaultAvatar}>
              {user.username[0]}
            </Avatar>
          )}
          <Button
            color="primary"
            variant="outlined"
            onClick={handleTextPost}
            fullWidth
            className={classes.createBtn}
            startIcon={<PostAddIcon />}
            size="large"
          >
            Create Post
          </Button>
          <div className={classes.iconGroup}>
            <IconButton onClick={handleImagePost} size="large">
              <ImageIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleLinkPost} size="large">
              <LinkIcon color="primary" />
            </IconButton>
          </div>
        </Paper>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogWrapper }}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle onClose={handleClose}>
          {actionType === "edit" ? "Update your post" : "Add a new post"}
        </DialogTitle>
        <DialogContent>
          <PostForm
            actionType={actionType}
            postType={postType}
            postToEditType={postToEditType}
            postToEditTitle={postToEditTitle}
            postToEditSub={postToEditSub}
            postToEditId={postToEditId}
            textSubmission={textSubmission}
            linkSubmission={linkSubmission}
            fromSubreddit={fromSubreddit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPostModal;
