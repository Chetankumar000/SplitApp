export const validate = (name, email, pwd) => {
  // Regular expression for validating an email

  console.log(email);
  console.log(pwd);

  if (name === (null || "")) {
    return "Please enter your name";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Minimum password length
  const minPasswordLength = 8;

  // Validate email
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }

  // Validate password
  if (pwd.length < minPasswordLength) {
    return "Password must be at least 8 characters long.";
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?]{8,}$/;

  if (!passwordRegex.test(pwd)) {
    return "Password must include at least one number, one special character, and be at least 8 characters long.";
  }

  return null;
};
