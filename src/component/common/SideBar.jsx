"use client";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import SubjectIcon from "@mui/icons-material/Subject";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";

import { memo, useState } from "react";
import styles from "@/style/sidebar.module.css";
import Link from "next/link";
import { panelRole } from "@/service/api-helpers";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { usePathname } from "next/navigation";

const SideBar = ({ sideBarToggle }) => {
  const role = panelRole();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const handleClick = () => {
    setOpen(!open);
  };
  const handleActive = () => {
    setActive((active) => !active);
  };

  // helper get path
  const getPath = (path) => (role === 1 ? `/admin/${path}` : path);
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
        <Link onClick={handleActive} href={getPath("dashboard")}>
          <ListItemButton
            className={`${styles.listButton} ${
              pathname === getPath("dashboard") && styles.sideBarActive
            }`}
          >
            <ListItemIcon>
              <DashboardIcon
                className={`${styles.listIcon} ${
                  pathname === getPath("dashboard") && styles.activeListIcon
                }`}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className={styles.listText} />
          </ListItemButton>
        </Link>

        <ListItemButton onClick={handleClick} className={styles.listButton}>
          <ListItemIcon>
            {" "}
            <SubjectIcon className={styles.listIcon} />
          </ListItemIcon>
          <ListItemText primary="Course mangement" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{ pl: 2, ml: 3, borderLeft: "1px solid #32383e" }}
        >
          <List component="div" disablePadding>
            <Link href={getPath("category")}>
              <ListItemButton
                className={`${styles.listButton} ${
                  pathname === getPath("category") && styles.sideBarActive
                }`}
              >
                <ListItemText primary="Category" className={styles.listText} />
              </ListItemButton>
            </Link>
            <Link href={getPath("tags")}>
              <ListItemButton
                className={`${styles.listButton} ${
                  pathname === getPath("tags") && styles.sideBarActive
                }`}
              >
                <ListItemText primary="Tags" className={styles.listText} />
              </ListItemButton>
            </Link>
            <Link href={getPath("course")}>
              <ListItemButton
                className={`${styles.listButton} ${
                  pathname === getPath("course") && styles.sideBarActive
                }`}
              >
                <ListItemText primary="Courses" className={styles.listText} />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default memo(SideBar);
