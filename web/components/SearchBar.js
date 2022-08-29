import React, { useState } from "react";
import { useRouter } from "next/router";

import { InputAdornment, IconButton, TextField } from "@mui/material";
import { useNavStyles } from "../styles/muiStyles";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const SearchBar = ({ isMobile, setSearchOpen }) => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const classes = makeStyles(
    (theme) => ({
      leftPortion: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("xs")]: {
          marginLeft: "1em",
        },
      },
      logoWrapper: {
        marginRight: theme.spacing(10),
        [theme.breakpoints.down("xs")]: {
          marginRight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        },
      },
      logo: {
        fontFamily: "Varela Round",
        textTransform: "none",
        fontSize: "1.3em",
        padding: "0.1em",
        marginRight: "0.3em",
      },
      user: {
        marginRight: 10,
      },
      titleButton: {
        textTransform: "none",
        fontSize: 20,
        marginRight: 12,
      },
      navButtons: {
        "&:hover": {
          backgroundColor: "#ffe5d8",
        },
      },
      search: {
        flexGrow: 0.75,
        [theme.breakpoints.down("sm")]: {
          flexGrow: 1,
          padding: "0 0.5em",
        },
      },
      searchBtn: {
        padding: "0.2em",
      },
    }),
    { index: 1 }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput === "") return;
    router.push(`/search/${searchInput}`);
  };

  const clearSearch = () => {
    if (isMobile) {
      setSearchOpen(false);
    }
    setSearchInput("");
  };

  return (
    <div className={classes.search}>
      <form onSubmit={handleSearch}>
        <TextField
          type="search"
          placeholder="Search for posts…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={classes.inputField}
          variant="outlined"
          margin="dense"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (searchInput || isMobile) && (
              <InputAdornment position="end">
                <IconButton color="primary" size="small" onClick={clearSearch}>
                  <HighlightOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
