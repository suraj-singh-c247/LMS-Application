import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import SubjectIcon from "@mui/icons-material/Subject";
import { memo } from "react";
import styles from "@/app/style/sidebar.module.css";
import Link from "next/link";
const SideBar = ({ sideBarToggle }) => {
  return (
    <Box
      component={"aside"}
      className={`${styles.sideBarMain} ${
        sideBarToggle ? styles.sideBarInActive : styles.sidebarToggle
      }`}
    >
      <List
        className={styles.sideListBox}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Link href={"/dashboard"}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="DashBoard" />
          </ListItemButton>
        </Link>
        <Link href={"/course"}>
          <ListItemButton>
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItemButton>
        </Link>

        {/* <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton> */}
      </List>
    </Box>
  );
};

export default memo(SideBar);
