const TextEllipsis = (text) => {
  let maxLength = 20;
  return text?.trim().length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
};

export { TextEllipsis };
