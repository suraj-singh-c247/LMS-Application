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
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import formStyles from "@/style/form.module.css";
import errorStyles from "@/style/error.module.css";
import { memo, useEffect, useState } from "react";
import Button from "../common/button/Button";
import { addcourseSchema, editcourseSchema } from "@/utilis/validation";
import { categoryServices } from "@/service/apiCategory";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { courseServices } from "@/service/apiCourse";
import { tagsServices } from "@/service/apiTags";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const AddCourseForm = ({ id, data, getCourseData, onClose }) => {
  const [getCatergoryId, setCategoryId] = useState([]);
  const [tagsId, setTagsId] = useState([]);
  const [learningInput, setLearningInput] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editLearning, setEditLearning] = useState("");

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
      tagIds: [],
      prerequisites: [],
      learningOutcomes: [],
    },
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "learningOutcomes",
  });
  // get categories id
  useEffect(() => {
    categoryServices
      .getAllCategory()
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setCategoryId(data?.categories);
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
  }, []);

  // get tags id
  useEffect(() => {
    tagsServices
      .getAllTags()
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setTagsId(data?.tags);
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
  }, [id]);

  // It's use for edit

  useEffect(() => {
    if (data && id) {
      const findUser = data.find((user) => user?.id === id);
      setValue("title", findUser?.title || "");
      setValue("description", findUser?.description || "");
      setValue("visibility", findUser?.visibility || "");
      setValue("categoryId", findUser?.category?.id || "");
      setValue("tagIds", findUser?.tags?.map((tag) => tag?.id) || []);
      // setValue("prerequisites", findUser?.prerequisites?.map((id) => id) || []);
      setValue("learningOutcomes", findUser?.learningOutcomes || []);
    } else {
      reset();
    }
  }, [open, data, id]);

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
          if (error.response) {
            toast.error(error.response.data?.message);
            return;
          } else if (error.request) {
            toast.error(error.request);
            return;
          }
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
          if (error.response) {
            toast.error(error.response.data?.message);
            return;
          } else if (error.request) {
            toast.error(error.request);
            return;
          }
        });
    }
  };

  // learning outcomes
  const handleLearingAdd = () => {
    if (learningInput.trim()) {
      append({
        id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        value: learningInput.trim(),
      });
      setLearningInput("");
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
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={formStyles.formControl}
            label="Title*"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
            size="small"
            sx={{ mb: 2 }}
          />
        )}
      />{" "}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description*"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            minRows={2}
            maxRows={4}
            size="small"
            error={!!errors.description}
            helperText={errors.description?.message}
            className={formStyles.formControl}
          />
        )}
      />
      <Controller
        name="coverImage"
        control={control}
        render={() => (
          <TextField
            type="file"
            className={formStyles.formControl}
            variant="outlined"
            name="coverImage"
            label="CoverImage*"
            {...register("coverImage")}
            fullWidth
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.coverImage}
            helperText={errors.coverImage?.message}
          />
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
            <Select
              {...field}
              label="Select Category ID*"
              className={formStyles.formControl}
            >
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
              className={formStyles.formControl}
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
            {errors.tagId && (
              <Typography component={"span"} className={errorStyles.error}>
                {errors.tagId.message}
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
              className={formStyles.formControl}
              multiple
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => {
                      const prerequisites = data?.find(
                        (item) => item?.id === value
                      );
                      return <Chip key={value} label={prerequisites?.name} />;
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
            {errors.tagId && (
              <Typography component={"span"} className={errorStyles.error}>
                {errors.prerequisites.message}
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
            sx={{ mb: 2, position: "relative" }}
            className={formStyles.formControl}
          >
            {" "}
            <TextField
              {...field}
              value={learningInput}
              className={formStyles.formControl}
              label="Learning Outcomes"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.learningOutcomes}
              helperText={errors.learningOutcomes?.message}
              size="small"
              sx={{ mb: 2 }}
              onChange={(e) => setLearningInput(e.target.value)}
            />
            <Box
              sx={{
                position: "absolute",
                top: "11px",
                zIndex: "9",
                right: "0px",
              }}
              className={formStyles.learningFieldBox}
            >
              <Button
                label={"Add"}
                variant={"primary"}
                onClick={handleLearingAdd}
              />
            </Box>
            <List>
              {fields.map((field, idx) => (
                <ListItem
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
                    <TextField
                      value={editLearning}
                      onChange={(e) => setEditLearning(e.target.value)}
                      size="small"
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
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
