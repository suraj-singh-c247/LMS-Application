"use client";
import { signUpSchema } from "@/utilis/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import authStyle from "../auth.module.css";
import errorStyles from "@/style/error.module.css";
import Button from "@/component/common/button/Button";
import Link from "next/link";
import Image from "next/image";
import { authServices } from "@/service/auth/apiAuth";

const countryCodes = [
  { code: "+1", label: "United States" },
  { code: "+91", label: "India" },
  { code: "+44", label: "United Kingdom" },
  { code: "+61", label: "Australia" },
  { code: "+81", label: "Japan" },
  // ...add more as needed
];

export default function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      countryCode: "",
    },
  });
  const onSubmit = (data) => {
    const { name, email, password, phoneNumber, countryCode } = data;
    const userData = { name, email, password, phoneNumber, countryCode };
    authServices
      .register(userData)
      .then((response) => {
        console.log(response, "response");
      })
      .catch((error) => {
        console.log(error, "error");
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
                title={"Create an Account"}
              />
              <CardContent
                component={"form"}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className={authStyle.cardContent}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={authStyle.formControl}
                      label="Name*"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      size="small"
                    />
                  )}
                />
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
                      label="Password*"
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
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={authStyle.formControl}
                      label="Phone Number*"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      size="small"
                    />
                  )}
                />

                <Controller
                  name={"countryCode"}
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.countryCode}
                      size="small"
                    >
                      <InputLabel>Select country code*</InputLabel>
                      <Select
                        {...field}
                        label="Select Country Code"
                        className={authStyle.formControl}
                      >
                        {countryCodes.map((item) => (
                          <MenuItem key={item.code} value={item.code}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.countryCode && (
                        <Typography
                          component={"span"}
                          className={errorStyles.error}
                        >
                          {errors.countryCode.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />

                <Button type="submit" label={"Sign up"} variant={"secondary"} />
                <Typography variant="body1" className={authStyle.footerText}>
                  Already have an account?{" "}
                  <Link
                    href={"/login"}
                    component="button"
                    className={authStyle.linkText}
                  >
                    Log in
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
