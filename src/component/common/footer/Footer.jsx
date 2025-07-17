import React, { memo } from "react";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";

import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = ({ footerRoutes }) => {
  return (
    <Box component={"footer"} className={styles.footer}>
      <Grid container spacing={2} className={styles.footerFirstBox}>
        {footerRoutes &&
          footerRoutes.map((item) => {
            return (
              <Grid key={item?.title} size={3}>
                <Box className={styles.footerBox}>
                  <Typography variant="h6" className={styles.footerHeading}>
                    {item?.title}
                  </Typography>
                  <List sx={{ pl: 0 }}>
                    {item?.routes.map((item) => (
                      <ListItem sx={{ pl: 0 }}>
                        <Link
                          key={item?.path}
                          href={item?.path}
                          className={styles.footerLink}
                        >
                          {item?.label}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            );
          })}
      </Grid>
      <Grid container spacing={2} className={styles.footerBottomBox}>
        <Grid size={4}>
          <Box className={styles.footerLogoBox}>
            <Link href={"/dashboard"}>
              <Image
                aria-hidden
                src="/logo.png"
                alt="Logo"
                width={146}
                height={40}
              />
            </Link>
            <Typography component={"h6"} className={styles.footerBottomText}>
              <Typography component={"strong"}>
                &copy; {new Date().getFullYear()}
              </Typography>
              <Typography component={"span"}>
                &nbsp; Chapter247 Infotech. All rights reserved.
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(Footer);
