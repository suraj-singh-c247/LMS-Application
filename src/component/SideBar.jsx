"use client";
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
import styles from "@/style/sidebar.module.css";
import Link from "next/link";
import { panelRole } from "@/service/api-helpers";
const SideBar = ({ sideBarToggle }) => {
  const role = panelRole();

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
        <Link href={`${role === 1 ? "/admin/dashboard" : "/dashboard"}`}>
          <ListItemButton className={styles.listButton}>
            <ListItemIcon>
              <DashboardIcon className={styles.listIcon} />
            </ListItemIcon>
            <ListItemText primary="DashBoard" className={styles.listText} />
          </ListItemButton>
        </Link>
        <Link href={`${role === 1 ? "/admin/course" : "/course"}`}>
          <ListItemButton className={styles.listButton}>
            <ListItemIcon>
              <SubjectIcon className={styles.listIcon} />
            </ListItemIcon>
            <ListItemText primary="Courses" className={styles.listText} />
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
