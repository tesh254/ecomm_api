export const validateProductFields = data => {
  if (
    (data.name && data.description && data.category && data.quantity,
    data.images.length !== 0 && data.amount)
  ) {
    return true;
  } else {
    return false;
  }
};
