import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { memo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import searchStyles from "@/style/search.module.css";

const Search = ({
  placeholder,
  type,
  label,
  variant,
  className,
  // searchText,
  // handleSearch,
}) => {
  return (
    <Box
      className={searchStyles.searchForm}
      component={"form"}
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        type={type || "text"}
        id="outlined-basic"
        label={label}
        variant={variant}
        className={className}
        // value={searchText}
        placeholder={placeholder || "Search..."}
        // onChange={(e) => handleSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                position="start"
                className={searchStyles.searchIcon}
              >
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton className={searchStyles.searchButton}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      {/* {searchText && searchText.length > 0 && (
        <IconButton aria-label="clear" className={searchStyles.clearButton}>
          <CloseIcon />
        </IconButton>
      )} */}
    </Box>
  );
};

export default memo(Search);
