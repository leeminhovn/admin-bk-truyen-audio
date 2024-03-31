export const formatDateFromIsoDateToNormalVnDate = (isoDate) => {
  const date = new Date(isoDate);

  // Get the day, month, and year components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();

  // Format the components as desired (pad with leading zeros if needed)
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const getDataInManyObjects = (data, fields) => {
  return fields.length === 1
    ? data[fields[0]]
    : getDataInManyObjects(data[fields[0]], fields.slice(1));
};
