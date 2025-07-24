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
    .required("Tag name is required")
    .trim()
    .min(2, "Tag name must be at least 2 characters")
    .max(50, "Tag name cannot exceed 50 characters")
    .matches(/^[^\s].*[^\s]$/, "Tag name should not start or end with a space")
    .matches(
      /^[\S ]+$/,
      "Tag name should not contain multiple consecutive spaces"
    ),
});
// for course
const commonCourseObj = {
  title: yup.string().required("Name is required"),
  description: yup
    .string()
    .required("Description is required")
    .max(1000, "Description cannot exceed 1000 characters."),
  visibility: yup.string().required("Visibility is required"),
  categoryId: yup.string().required("CategoryId is required"),
};

export const addcourseSchema = yup.object().shape({
  ...commonCourseObj,
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
});

export const editcourseSchema = yup.object().shape({
  title: yup.string().required("Name is required"),
  description: yup
    .string()
    .required("Description is required")
    .max(1000, "Description cannot exceed 1000 characters."),
  visibility: yup.string().required("Visibility is required"),
  categoryId: yup.string().required("CategoryId is required"),
});

export const chapterSchema = yup.object().shape({
  courseId: yup.string().required("CourseId is required"),
  title: yup
    .string()
    .required("Chapter title is required")
    .trim()
    .min(2, "Chapter title must be at least 2 characters")
    .max(100, "Chapter title cannot exceed 100 characters")
    .matches(
      /^[^\s].*[^\s]$/,
      "Chapter title should not start or end with a space"
    )
    .matches(
      /^[\S ]+$/,
      "Chapter title should not contain multiple consecutive spaces"
    ),
  description: yup
    .string()
    .required("Description is required")
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .matches(
      /^[^\s].*[^\s]$/,
      "Chapter title should not start or end with a space"
    )
    .matches(
      /^[\S ]+$/,
      "Chapter title should not contain multiple consecutive spaces"
    ),
  sortOrder: yup.string().required("Sort order is required"),
});
