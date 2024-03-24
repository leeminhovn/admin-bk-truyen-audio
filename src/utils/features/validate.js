export const validateEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email.trim()) ? "" : "* Invalid email";
};

export const validatePassword = (password) => {
  if (password.trim().length === 0) {
    return "* Not be empty";
  } else if (password.length < 6) {
    return "* Password minimum 6 characters";
  }
  return "";
};

export const valideName = (name) => {
  name = name.trim();
  if (name.length === 0) {
    return "* Not be empty";
  } else if (name.length < 3) {
    return "* Name minimum 3 characters";
  }
  return "";
};
