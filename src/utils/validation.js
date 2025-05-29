export const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.loanAmount || parseFloat(formData.loanAmount) <= 0) {
    errors.loanAmount = 'Please enter a valid loan amount';
  }
  if (!formData.interestRate || parseFloat(formData.interestRate) <= 0) {
    errors.interestRate = 'Please enter a valid interest rate';
  }
  if (!formData.loanTerm || parseFloat(formData.loanTerm) <= 0) {
    errors.loanTerm = 'Please enter a valid loan term';
  }
  if (parseFloat(formData.additionalPayment || 0) < 0) {
    errors.additionalPayment = 'Additional payment cannot be negative';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};