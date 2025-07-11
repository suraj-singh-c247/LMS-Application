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
import { memo, useState } from "react";
import styles from "@/style/sidebar.module.css";
import Link from "next/link";
import { panelRole } from "@/service/api-helpers";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
const SideBar = ({ sideBarToggle }) => {
  const role = panelRole();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
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
            <ListItemText primary="Dashboard" className={styles.listText} />
          </ListItemButton>
        </Link>

        <ListItemButton onClick={handleClick} className={styles.listButton}>
          <ListItemIcon>
            {" "}
            <SubjectIcon className={styles.listIcon} />
          </ListItemIcon>
          <ListItemText primary="Course Mangement" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href={`${role === 1 ? "/admin/category" : "/category"}`}>
              <ListItemButton sx={{ pl: 4 }} className={styles.listButton}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Category" className={styles.listText} />
              </ListItemButton>
            </Link>
            <Link href={`${role === 1 ? "/admin/course" : "/course"}`}>
              <ListItemButton sx={{ pl: 4 }} className={styles.listButton}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
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
