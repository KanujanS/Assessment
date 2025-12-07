export const buildFormData = (obj) => {
  const fd = new FormData();
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      fd.append(key, obj[key]);
    }
  });
  return fd;
};