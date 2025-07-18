import { Box, Grid, IconButton, Typography } from "@mui/material";
import { memo } from "react";
import styles from "@/style/page.module.css";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";

import { panelRole } from "@/service/api-helpers";

const DashBoard = () => {
  const role = panelRole();
  return (
    <Box component={"article"} className={styles.productBox}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography component={"h1"} className={styles.mainHeading}>
            Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Grid container spacing={3}>
            <Grid size={4}>
              <Box className={styles.productMainBox}>
                <Box className={styles.productDesign}>
                  <Box display={"flex"} alignItems={"center"}>
                    <Typography
                      component={"strong"}
                      className={styles.productHeading}
                    >
                      Sales
                    </Typography>
                    <Typography
                      component={"span"}
                      className={styles.productSubHeading}
                    >
                      Today
                    </Typography>
                  </Box>
                  <IconButton className={styles.filter}>
                    <MoreHorizOutlinedIcon />
                  </IconButton>
                </Box>
                <Box className={styles.productSalesBox}>
                  <IconButton size="large" className={styles.bgPrimary300}>
                    <ShoppingCartOutlinedIcon />
                  </IconButton>
                  <Box className={styles.productDescription}>
                    <Typography component={"h5"}>125</Typography>
                    <Box className={styles.productSubDesc}>
                      <Typography
                        component={"strong"}
                        className={styles.infoColor}
                      >
                        12%
                      </Typography>
                      <Typography component={"span"}>increase</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid size={4}>
              <Box className={styles.productMainBox}>
                <Box className={styles.productDesign}>
                  <Box display={"flex"} alignItems={"center"}>
                    <Typography
                      component={"strong"}
                      className={styles.productHeading}
                    >
                      Revenue
                    </Typography>
                    <Typography
                      component={"span"}
                      className={styles.productSubHeading}
                    >
                      This Month
                    </Typography>
                  </Box>
                  <IconButton className={styles.filter}>
                    <MoreHorizOutlinedIcon />
                  </IconButton>
                </Box>
                <Box className={styles.productSalesBox}>
                  <IconButton size="large" className={`${styles.bgGreen300} `}>
                    <PaidOutlinedIcon className={`${styles.infoColor}`} />
                  </IconButton>
                  <Box className={styles.productDescription}>
                    <Typography component={"h5"}>$3,264</Typography>
                    <Box className={styles.productSubDesc}>
                      <Typography
                        component={"strong"}
                        className={styles.infoColor}
                      >
                        8%
                      </Typography>
                      <Typography component={"span"}>increase</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid size={4}>
              <Box className={styles.productMainBox}>
                <Box className={styles.productDesign}>
                  <Box display={"flex"} alignItems={"center"}>
                    <Typography
                      component={"strong"}
                      className={styles.productHeading}
                    >
                      Customers
                    </Typography>
                    <Typography
                      component={"span"}
                      className={styles.productSubHeading}
                    >
                      This Year
                    </Typography>
                  </Box>
                  <IconButton className={styles.filter}>
                    <MoreHorizOutlinedIcon />
                  </IconButton>
                </Box>
                <Box className={styles.productSalesBox}>
                  <IconButton size="large" className={styles.bgOrange300}>
                    <SupervisorAccountOutlinedIcon
                      className={styles.orangeColor}
                    />
                  </IconButton>
                  <Box className={styles.productDescription}>
                    <Typography component={"h5"}>1244</Typography>
                    <Box className={styles.productSubDesc}>
                      <Typography
                        component={"strong"}
                        className={styles.dangerColor}
                      >
                        8%
                      </Typography>
                      <Typography component={"span"}>decrease</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(DashBoard);
