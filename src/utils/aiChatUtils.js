import { calculateScenario, formatCurrency } from './calculations';

export const parseUserQuestion = (question) => {
  const lowerQ = question.toLowerCase().trim();
  
  // Extract payment amounts
  const paymentPatterns = [
    /\$(\d+(?:,\d{3})*(?:\.\d{2})?)/,
    /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*dollars?/,
    /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:per month|monthly|\/month|a month)/,
    /add(?:ing)?\s+(\d+(?:,\d{3})*(?:\.\d{2})?)/,
    /extra?\s+(\d+(?:,\d{3})*(?:\.\d{2})?)/,
    /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:more|additional|extra)/
  ];
  
  let paymentAmount = null;
  for (const pattern of paymentPatterns) {
    const match = lowerQ.match(pattern);
    if (match) {
      paymentAmount = parseFloat(match[1].replace(/,/g, ''));
      break;
    }
  }
  
  // Extract years
  const yearPatterns = [
    /(\d+)\s*years?/,
    /in\s+(\d+)\s*years?/,
    /within\s+(\d+)\s*years?/,
    /(\d+)\s*yr/,
    /(\d+)-year/
  ];
  
  let targetYears = null;
  for (const pattern of yearPatterns) {
    const match = lowerQ.match(pattern);
    if (match) {
      targetYears = parseInt(match[1]);
      break;
    }
  }
  
  // Determine question type
  let questionType = 'general';
  
  const savingsPatterns = [
    /how much.*save/, /save.*money/, /interest.*save/, /save.*interest/,
    /total.*save/, /savings/, /reduce.*interest/, /cut.*interest/
  ];
  
  const payoffPatterns = [
    /pay.*off/, /payoff/, /finish.*loan/, /complete.*mortgage/,
    /when.*paid/, /mortgage.*done/, /loan.*complete/
  ];
  
  if (savingsPatterns.some(pattern => pattern.test(lowerQ))) {
    questionType = 'savings';
  } else if (payoffPatterns.some(pattern => pattern.test(lowerQ))) {
    questionType = 'payoff';
  }
  
  return { paymentAmount, targetYears, questionType, originalQuestion: question };
};

export const generateAIResponse = (userQuestion, formData) => {
  const parsed = parseUserQuestion(userQuestion);
  
  if (!formData.loanAmount || !formData.interestRate || !formData.loanTerm) {
    return "Please fill in your mortgage details first (loan amount, interest rate, and loan term) so I can help you with calculations!";
  }
  
  if (parsed.questionType === 'savings' && parsed.paymentAmount) {
    const scenario = calculateScenario(formData, parsed.paymentAmount);
    if (scenario) {
      return `With an additional $${parsed.paymentAmount} per month, you would save ${formatCurrency(scenario.interestSaved)} in interest and pay off your mortgage ${scenario.yearsSaved} years and ${scenario.remainingMonths} months early!`;
    }
  }
  
  if (parsed.questionType === 'payoff' && parsed.targetYears) {
    const targetMonths = parsed.targetYears * 12;
    const principal = parseFloat(formData.loanAmount);
    const monthlyRate = parseFloat(formData.interestRate) / 100 / 12;
    const originalPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, parseInt(formData.loanTerm) * 12)) / 
                           (Math.pow(1 + monthlyRate, parseInt(formData.loanTerm) * 12) - 1);
    
    const requiredPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, targetMonths)) / 
                           (Math.pow(1 + monthlyRate, targetMonths) - 1);
    const additionalNeeded = Math.max(0, requiredPayment - originalPayment);
    
    if (additionalNeeded > 0) {
      return `To pay off your mortgage in ${parsed.targetYears} years, you would need to pay an additional ${formatCurrency(additionalNeeded)} per month (total monthly payment: ${formatCurrency(requiredPayment)}).`;
    } else {
      return `Good news! Your current payment schedule already pays off the loan in less than ${parsed.targetYears} years.`;
    }
  }
  
  return "I can help you with questions like: 'How much will I save with $300 extra per month?' or 'Can I finish my mortgage in 20 years?' Please make sure your mortgage details are filled in above!";
};