// Validation functions for form fields
export const validateName = (name: string) => name.trim().length > 1;

export const validateEmail = (email: string) => {
  const emailRe = /^(?:[^\s@]+)@(?:[^\s@]+)\.(?:[^\s@]+)$/;
  return emailRe.test(email.trim());
};

export const validateMessage = (message: string) => message.trim().length > 3;
