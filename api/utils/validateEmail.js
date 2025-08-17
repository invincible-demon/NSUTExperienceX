// Email validation utility for NSUT domain
export const validateNSUTEmail = (email) => {
  const emailRegex = /^[^\s@]+@nsut\.ac\.in$/;
  return emailRegex.test(email);
};

// Alternative validation that allows multiple NSUT domains if needed in the future
export const validateNSUTDomains = (email) => {
  const allowedDomains = ['nsut.ac.in'];
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
};
