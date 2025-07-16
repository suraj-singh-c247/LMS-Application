"use client";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import authStyle from "../auth.module.css";
import Image from "next/image";
import { loginSchema } from "@/utilis/validation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/component/common/button/Button";
import Link from "next/link";
import { authServices } from "@/service/auth/apiAuth";
import { toast } from "react-toastify";
import { setToken } from "@/service/api-helpers";
import { useRouter } from "next/navigation";

function LogIn() {
  const router = useRouter();
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
    },
  });
  const onSubmit = (data) => {
    const { email, password } = data;
    const loginData = { email, password };
    authServices
      .login(loginData)
      .then((response) => {
        if (response?.status === 200) {
          const { message, data } = response?.data;
          setToken(data?.token);
          localStorage.setItem("role", JSON.stringify(data?.role));
          if (data?.role === 1) {
            router.replace("/admin/dashboard");
          } else {
            router.replace("/dashboard");
          }
          toast.success(message);
          reset();
        }

        if (response?.data?.status === 400) {
          toast.error(!response?.data?.message);
          throw new Error("Login failed: Invalid credentials");
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data?.message);
          return;
        } else if (error.request) {
          toast.error(error.request);
          return;
        }
      });
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
                title={"Log in Your Account"}
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
                      label="Email*"
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
                      label="Password*  "
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      size="small"
                    />
                  )}
                />
                <Button type="submit" label={"Login"} variant={"secondary"} />
                <Typography variant="body1" className={authStyle.footerText}>
                  Don't have account?{" "}
                  <Link
                    href={"/signup"}
                    component="button"
                    className={authStyle.linkText}
                  >
                    Create an account
                  </Link>{" "}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LogIn;
