"use client";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import authStyle from "../auth.module.css";
import Image from "next/image";
import { loginSchema } from "@/app/utilis/validation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/app/component/common/button/Button";
import Link from "next/link";


function SignIn() {
  
  const {
    handleSubmit,   
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      reminder:false,
    },
  });
  const onSubmit = (data) => {
    console.log(data, "Data");
  };
  return (
    <Box component={"section"} className={authStyle.authPage}>
      <Container>
        <Grid
          container
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid size={4}>
            <Box component={"a"} href="#" className={authStyle.logoBox}>
              <Image
                aria-hidden
                src="/logo.png"
                alt="Logo"
                width={146}
                height={40}
              />
            </Box>
            <Card className={authStyle.cardBox}>
              <CardHeader
                className={authStyle.cardHeader}
                title={"Sign in Your Account"}
              />
              <CardContent
                component={"form"}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className={authStyle.cardContent}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={authStyle.formControl}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      size="small"
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      className={authStyle.formControl}
                      label="Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      size="small"
                    />
                  )}
                />
                <Controller
                  name="reminder"
                  control={control}                  
                  render={({ field }) => (
                    <FormControlLabel
                    className={authStyle.reminder}
                      control={<Checkbox {...field} />}
                      label="Remember me"
                    />
                  )}
                />
                <Button type="submit" label={"Login"} variant={"secondary"} />
                <Typography variant="body1" className={authStyle.footerText}>Don't have account? <Link href={"/signup"} component="button" className={authStyle.linkText}>Create an account</Link> </Typography>
              </CardContent>              
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignIn;
