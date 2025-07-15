import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password must contain at least one Latin letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});
export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password must contain at least one Latin letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  countryCode: yup.string().required("Country code is required"),
});

export const catergorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Category name cannot exceed 50 characters."),
});

export const tagSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Tag name cannot exceed 50 characters."),
});

export const courseSchema = yup.object().shape({
  title: yup.string().required("Name is required"),
  description: yup
    .string()
    .required("Description is required")
    .max(50, "Description cannot exceed 50 characters."),
  coverImage: yup
    .mixed()
    .required("Cover image is required")
    .test(
      "fileFormat",
      "Only jpeg, jpg, and png files are allowed",
      (value) => {
        if (!value) return false;
        const fileName = value[0] || "";
        const ext = fileName?.name?.split(".").pop()?.toLowerCase();
        return ["jpg", "jpeg", "png"].includes(ext);
      }
    ),
  visibility: yup.string().required("Visibility is required"),
  categoryId: yup.string().required("CategoryId is required"),
});
