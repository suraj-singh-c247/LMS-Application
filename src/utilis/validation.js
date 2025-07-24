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

// for category schema
export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Category name is required")
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name cannot exceed 50 characters.")
    .matches(
      /^[^\s].*[^\s]$/,
      "Category name should not start or end with a space"
    )
    .matches(
      /^[\S ]+$/,
      "Category name should not contain multiple consecutive spaces"
    ),
  description: yup
    .string()
    .required("Category description is required")
    .trim()
    .max(200, "Category description cannot exceed 200 characters."),
});

// for tag schema
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
  title: yup
    .string()
    .required("Course title is required")
    .trim()
    .min(2, "Course title must be at least 2 characters")
    .max(100, "Course title cannot exceed 100 characters.")
    .matches(
      /^[^\s].*[^\s]$/,
      "Course title should not start or end with a space"
    )
    .matches(
      /^[\S ]+$/,
      "Course title should not contain multiple consecutive spaces"
    ),
  description: yup
    .string()
    .required("Course description is required")
    .trim()
    .max(1000, "Course description cannot exceed 1000 characters."),
  visibility: yup.string().required("Visibility is required"),
  categoryId: yup.string().required("Category ID is required"),
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
  title: yup
    .string()
    .required("Course title is required")
    .trim()
    .min(2, "Course title must be at least 2 characters")
    .max(100, "Course title cannot exceed 100 characters.")
    .matches(
      /^[^\s].*[^\s]$/,
      "Course title should not start or end with a space"
    )
    .matches(
      /^[\S ]+$/,
      "Course title should not contain multiple consecutive spaces"
    ),
  description: yup
    .string()
    .required("Course description is required")
    .trim()
    .max(1000, "Course description cannot exceed 1000 characters."),
  visibility: yup.string().required("Visibility is required"),
  categoryId: yup.string().required("CategoryId is required"),
});

// for chapter
export const chapterSchema = yup.object().shape({
  courseId: yup.string().required("Course ID is required"),
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
    .required("Chapter description is required")
    .trim()
    .max(500, "Chapter description cannot exceed 500 characters."),
  sortOrder: yup.string().required("Sort order is required"),
});
