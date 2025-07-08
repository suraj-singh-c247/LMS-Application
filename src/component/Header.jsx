import Image from "next/image";

import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
//icons
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Search from "./common/search/Search";
// style
import searchStyles from "@/style/search.module.css";
import headerStyle from "@/style/header.module.css";

import ThemeToggle from "./common/ThemeToggle";
import { removeToken } from "@/service/api-helpers";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Header = ({
  searchText,
  setSearchText,
  handleSearch,
  setSideBarToggle,
}) => {
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState(false);
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const handleLogOut = () => {
    removeToken();
    router.replace("/signin");
    toast.success("Logout Successfully!");
  };

  return (
    <Box component={"header"} className={headerStyle.header}>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid size={1.8}>
          <Box component={"a"} href="!#" className={headerStyle.logoBox}>
            <Image
              aria-hidden
              src="/logo.png"
              alt="Logo"
              width={146}
              height={40}
            />
          </Box>
        </Grid>
        <Grid size={0.5}>
          <IconButton
            size="large"
            className={headerStyle.hamburgerMenu}
            onClick={() => setSideBarToggle((toggle) => !toggle)}
          >
            <MenuIcon fontSize="3rem" />
          </IconButton>
        </Grid>
        <Grid size={7}>
          <Box
            className={`${searchStyles.searchContainer} ${headerStyle.searchFlex}`}
          >
            <Search
              type={"text"}
              // searchText={searchText}
              // setSearchText={setSearchText}
              // handleSearch={handleSearch}
              className={searchStyles.searchControl}
            />
          </Box>
        </Grid>
        <Grid size={2.7} textAlign={"end"}>
          <Box className={headerStyle.rightBox}>
            <ThemeToggle />
            <IconButton className={headerStyle.notificationMenu}>
              <Badge badgeContent={100} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={() => setAnchorElUser((user) => !user)}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser((user) => !user)}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    setAnchorElUser((user) => !user);
                    if (setting === "Logout") {
                      handleLogOut();
                    }
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(Header);
