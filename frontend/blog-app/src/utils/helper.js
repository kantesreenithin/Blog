export const getInitials = (title) => {
  if (!title) return "";

  const words = title.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateStrongPassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push(" at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push(" an uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push(" a lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push(" a number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push(" a sepecial character");
  }

  return {
    isValid: errors.length === 0,
    message:
      errors.length > 0 ? `Password must include ${errors.join(",")}` : "",
  };
};

export const getToastMessagesByType = (type) => {
  switch (type) {
    case "edit":
      return "Blog post updated successfully!";
    case "draft":
      return "Blog post saved as draft successfully!";
    case "published":
      return "Blog post publised successfully!";
    default:
      return "Blog post published successfully!";
  }
};

export const sanitizeMarkdown = (content) => {
  const markdownBlockRegex = /^```(?:markdown)?\n([\s\S]*?)\n```$/;
  const match = content.match(markdownBlockRegex);
  return match ? match[1] : content;
};
