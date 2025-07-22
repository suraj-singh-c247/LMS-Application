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

// style
import headerStyle from "@/style/header.module.css";

import ThemeToggle from "./ThemeToggle";
import { panelRole, removeToken } from "@/service/api-helpers";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import Link from "next/link";
import { headerRoutes } from "@/utilis/routes";

const Header = ({ setSideBarToggle }) => {
  const router = useRouter();
  const role = panelRole();

  const [anchorElUser, setAnchorElUser] = useState(false);

  const settings = ["Logout"];

  const handleLogOut = () => {
    removeToken();
    router.replace("/login");
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
          {role === 1 && (
            <IconButton
              size="large"
              className={headerStyle.hamburgerMenu}
              onClick={() => setSideBarToggle((toggle) => !toggle)}
            >
              <MenuIcon fontSize="3rem" />
            </IconButton>
          )}{" "}
        </Grid>
        <Grid size={7}>
          {role === 2 && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                gap: { xs: "none", md: 5 },
                alignItems: { xs: "none", md: "center" },
                justifyContent: { xs: "none", md: "center" },
              }}
            >
              {headerRoutes.map((item) => (
                <Link
                  key={item?.page}
                  className={headerStyle.navLinks}
                  href={item?.route}
                >
                  {item?.page}
                </Link>
              ))}
            </Box>
          )}
        </Grid>
        <Grid size={2.7} textAlign={"end"}>
          <Box className={headerStyle.rightBox}>
            <ThemeToggle />
            {/* <IconButton className={headerStyle.notificationMenu}>
              <Badge badgeContent={100} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

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
