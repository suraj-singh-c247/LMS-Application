import dayjs from "dayjs";

const formattedDate = (date) => {
  const currentDate = dayjs(date);
  return currentDate.format("DD-MMM-YYYY");
};

export { formattedDate };
