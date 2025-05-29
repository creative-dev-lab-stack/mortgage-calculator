export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const calculateMortgage = (formData) => {
  const principal = parseFloat(formData.loanAmount);
  const monthlyRate = parseFloat(formData.interestRate) / 100 / 12;
  const totalMonths = parseInt(formData.loanTerm) * 12;
  const additionalPayment = parseFloat(formData.additionalPayment) || 0;
  
  // Calculate original monthly payment
  const originalPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                         (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  // Calculate original total interest
  const originalTotalInterest = (originalPayment * totalMonths) - principal;
  
  // Calculate with additional payments
  let balance = principal;
  let month = 0;
  let totalInterestPaid = 0;
  const chartData = [];
  
  while (balance > 0.01 && month < totalMonths * 2) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = originalPayment - interestPayment + additionalPayment;
    
    if (principalPayment >= balance) {
      totalInterestPaid += balance * monthlyRate;
      balance = 0;
    } else {
      totalInterestPaid += interestPayment;
      balance -= principalPayment;
    }
    
    month++;
    
    // Add data points for chart (every 12 months)
    if (month % 12 === 0 || balance <= 0.01) {
      chartData.push(Math.max(0, balance));
    }
  }
  
  const monthsSaved = totalMonths - month;
  const yearsSaved = Math.floor(monthsSaved / 12);
  const remainingMonths = monthsSaved % 12;
  const interestSaved = originalTotalInterest - totalInterestPaid;
  
  const startDate = new Date(formData.startDate);
  const newPayoffDate = new Date(startDate);
  newPayoffDate.setMonth(newPayoffDate.getMonth() + month);
  
  return {
    originalPayment,
    newPayoffDate: newPayoffDate.toLocaleDateString(),
    monthsSaved,
    yearsSaved,
    remainingMonths,
    interestSaved,
    totalInterestPaid,
    originalTotalInterest,
    chartData
  };
};

export const calculateScenario = (formData, additionalPayment) => {
  if (!formData.loanAmount || !formData.interestRate || !formData.loanTerm) {
    return null;
  }
  
  const principal = parseFloat(formData.loanAmount);
  const monthlyRate = parseFloat(formData.interestRate) / 100 / 12;
  const totalMonths = parseInt(formData.loanTerm) * 12;
  
  const originalPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                         (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const originalTotalInterest = (originalPayment * totalMonths) - principal;
  
  let balance = principal;
  let month = 0;
  let totalInterestPaid = 0;
  
  while (balance > 0.01 && month < totalMonths * 2) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = originalPayment - interestPayment + additionalPayment;
    
    if (principalPayment >= balance) {
      totalInterestPaid += balance * monthlyRate;
      balance = 0;
    } else {
      totalInterestPaid += interestPayment;
      balance -= principalPayment;
    }
    month++;
  }
  
  const monthsSaved = totalMonths - month;
  const yearsSaved = Math.floor(monthsSaved / 12);
  const remainingMonths = monthsSaved % 12;
  const interestSaved = originalTotalInterest - totalInterestPaid;
  
  return {
    monthsSaved,
    yearsSaved,
    remainingMonths,
    interestSaved,
    totalInterestPaid,
    originalTotalInterest,
    newPayoffMonths: month
  };
};
