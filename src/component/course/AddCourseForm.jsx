import Image from "next/image";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import formStyles from "@/style/form.module.css";
import errorStyles from "@/style/error.module.css";
import { memo, useEffect, useState } from "react";
import Button from "../common/button/Button";
import CustomTextField from "../common/input/CustomTextField";
import { addcourseSchema, editcourseSchema } from "@/utilis/validation";
import { categoryServices } from "@/service/category";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { courseServices } from "@/service/course";
import { tagsServices } from "@/service/tags";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const AddCourseForm = ({ id, data, getCourseData, onClose }) => {
  const [getCatergoryId, setCategoryId] = useState([]);
  const [tagsId, setTagsId] = useState([]);
  const [learningInput, setLearningInput] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editLearning, setEditLearning] = useState("");
  const [singleCourseData, setSingleCourseData] = useState(null);
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(id ? editcourseSchema : addcourseSchema),
    defaultValues: {
      title: "",
      coverImage: "",
      description: "",
      visibility: "",
      categoryId: "",
      tagIds: "",
      prerequisites: [],
      learningOutcomes: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "learningOutcomes",
  });

  useEffect(() => {
    getAllCategoryList();
    getAllTagsList();
  }, []);

  // get all categories id
  const getAllCategoryList = () => {
    categoryServices
      .getAllCategory()
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setCategoryId(data?.categories);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  // get all tags id
  const getAllTagsList = () => {
    tagsServices
      .getAllTags()
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setTagsId(data?.tags);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  // It's use for edit

  useEffect(() => {
    if (id) {
      getCourseDataById();
    }
  }, []);

  const getCourseDataById = () => {
    courseServices
      .getCourseById(id)
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setValue("title", data?.title || "");
          setValue("description", data?.description || "");
          setValue("visibility", data?.visibility || "");
          setValue("categoryId", data?.category?.id || "");
          setValue("tagIds", data?.tags?.map((tag) => tag?.id) || []);
          setValue(
            "prerequisites",
            data?.prerequisites?.map((item) => item?.id) || []
          );
          setValue(
            "learningOutcomes",
            (data.learningOutcomes || []).map((item, index) => ({
              id: index + 1,
              value: item,
            }))
          );
          setSingleCourseData(data);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    if (data?.coverImage && data?.coverImage[0]) {
      formData.append("coverImage", data?.coverImage[0]);
    }
    formData.append("visibility", data?.visibility);
    formData.append("categoryId", data?.categoryId);
    formData.append("tagIds", data?.tagIds);
    formData.append("prerequisites", data?.prerequisites);
    formData.append(
      "learningOutcomes",
      data?.learningOutcomes?.map((item) => item?.value)
    );
    if (!id) {
      courseServices
        .createCourse(formData)
        .then((response) => {
          if (response?.status === 201) {
            const { message } = response?.data;
            getCourseData();
            toast.success(message);
            onClose();
            reset();
          }
        })
        .catch((error) => {
          throw error;
        });
    }

    if (id) {
      courseServices
        .updateCourse(id, formData)
        .then((response) => {
          if (response?.status === 200) {
            const { message } = response?.data;
            getCourseData();
            toast.success(message);
            onClose();
            reset();
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  // learning outcomes
  const handleLearingAdd = (e) => {
    if (e.key === "Enter") {
      if (learningInput.trim()) {
        append({
          id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          value: learningInput.trim(),
        });
        setLearningInput("");
      }
    }
  };

  const handleLearningEdit = (id) => {
    setEditIdx(id);
    setEditLearning(fields[id]?.value);
  };

  const handleLearningSave = (id) => {
    update(id, { ...fields[id], value: editLearning.trim() });
    setEditIdx(null);
    setEditLearning("");
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <CustomTextField
            field={field}
            label="Title*"
            error={!!errors?.title}
            helperText={errors?.title?.message}
          />
        )}
      />{" "}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <CustomTextField
            field={field}
            label="Description*"
            error={!!errors.description}
            helperText={errors.description?.message}
            multiline
            minRows={2}
            maxRows={4}
          />
        )}
      />
      <Controller
        name="coverImage"
        control={control}
        render={() => (
          <>
            {id && (
              <Image
                aria-hidden
                src={`http://localhost:8000/${singleCourseData?.coverImage}`}
                alt="Logo"
                width={100}
                height={100}
              />
            )}
            <CustomTextField
              type="file"
              name="coverImage"
              label="CoverImage*"
              {...register("coverImage")}
              error={!!errors?.coverImage}
              helperText={errors?.coverImage?.message}
            />
          </>
        )}
      />{" "}
      {/* Select Dropdown */}
      <Controller
        name="visibility"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.visibility}
            size="small"
            sx={{ mb: 2 }}
            className={formStyles.formControl}
          >
            <InputLabel>Select Visibility*</InputLabel>
            <Select {...field} label="Select Visibility*">
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
            </Select>
            {errors.visibility && (
              <Typography component={"span"} className={errorStyles.error}>
                {errors.visibility.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="categoryId"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.categoryId}
            size="small"
            sx={{ mb: 2 }}
            className={formStyles.formControl}
          >
            <InputLabel>Select Category ID*</InputLabel>
            <Select {...field} label="Select Category ID*">
              {getCatergoryId?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryId && (
              <Typography component={"span"} className={errorStyles.error}>
                {errors.categoryId.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="tagIds"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.tagIds}
            size="small"
            sx={{ mb: 2 }}
            className={formStyles.formControl}
          >
            <InputLabel id="tagId-label">Select Tag ID</InputLabel>
            <Select
              {...field}
              value={field.value || []}
              labelId="tagId-label"
              label="Select Tag ID"
              multiple
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => {
                      const tag = tagsId?.find((item) => item?.id === value);
                      return <Chip key={value} label={tag?.name} />;
                    })}
                  </Box>
                );
              }}
            >
              {tagsId?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
            {errors?.tagIds && (
              <Typography component={"span"} className={errorStyles.error}>
                {errors?.tagIds.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="prerequisites"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.prerequisites}
            size="small"
            sx={{ mb: 2 }}
            className={formStyles.formControl}
          >
            <InputLabel id="Prerequisites-label">
              Select Prerequisites ID
            </InputLabel>
            <Select
              {...field}
              value={field.value || []}
              labelId="prerequisites-label"
              label="Select Prerequisites ID"
              multiple
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => {
                      const prerequisites = data?.find(
                        (item) => item?.id === value
                      );
                      return <Chip key={value} label={prerequisites?.title} />;
                    })}
                  </Box>
                );
              }}
            >
              {data?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
            {errors?.prerequisites && (
              <Typography component={"span"} className={errorStyles?.error}>
                {errors?.prerequisites?.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="learningOutcomes"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.prerequisites}
            size="small"
            sx={{ mt: 0, position: "relative" }}
            className={formStyles.formControl}
          >
            {" "}
            <CustomTextField
              field={field}
              value={learningInput}
              label="Learning Outcomes"
              error={!!errors.learningOutcomes}
              onChange={(e) => setLearningInput(e.target.value)}
              onKeyDown={handleLearingAdd}
              sx={{ mb: "0px !important" }}
            />
            <Typography component={"span"} className={formStyles.helperText}>
              Type a learning outcome and press Enter to add it. Repeat for
              multiple outcomes.
            </Typography>
            <List sx={{ p: 0 }}>
              {fields.map((field, idx) => (
                <ListItem
                  sx={{ pr: 10, div: { mb: "0px !important" } }}
                  key={field?.id}
                  secondaryAction={
                    <>
                      {editIdx === idx ? (
                        <IconButton
                          onClick={() => handleLearningSave(idx)}
                          edge="end"
                        >
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => handleLearningEdit(idx)}
                          edge="end"
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => remove(idx)} edge="end">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  {editIdx === idx ? (
                    <CustomTextField
                      value={editLearning}
                      onChange={(e) => setEditLearning(e.target.value)}
                      size="small"
                      sx={{ div: { marinBottom: 0 } }}
                    />
                  ) : (
                    field?.value
                  )}
                </ListItem>
              ))}
            </List>
          </FormControl>
        )}
      />{" "}
      <Box className={formStyles.formFooter}>
        <Button
          type="button"
          variant={"cancel"}
          label={"Cancel"}
          onClick={onClose}
        />
        <Button
          type="submit"
          variant={"primary"}
          label={`${id ? "Update" : "Save"}`}
          disabled={!!isSubmitting}
        />
      </Box>
    </Box>
  );
};
export default memo(AddCourseForm);
