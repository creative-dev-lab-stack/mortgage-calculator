// ===== src/MortgageCalculator.js - Refactored Main Component =====
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

// Components
import Header from './components/Header';
import TabBar from './components/TabBar';
import CalculatorTab from './components/CalculatorTab';
import ChatTab from './components/ChatTab';
import ResultsTab from './components/ResultsTab';

// Utils
import { validateForm } from './utils/validation';
import { calculateMortgage } from './utils/calculations';
import { generateAIResponse } from './utils/aiChatUtils';

// Styles
import { globalStyles } from './styles/globalStyles';

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    additionalPayment: '',
    startDate: new Date().toISOString().split('T')[0]
  });
  
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      type: 'ai', 
      message: 'Hi! I can help you explore different mortgage scenarios. Try asking me things like "How much will I save with $300 extra per month?" or "Can I pay off my loan in 20 years?"' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('calculator');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    const validation = validateForm(formData);
    
    if (validation.isValid) {
      const calculationResults = calculateMortgage(formData);
      setResults(calculationResults);
      setActiveTab('results');
    } else {
      setErrors(validation.errors);
      Alert.alert('Validation Error', 'Please check your input values');
    }
  };

  const handleChatInputChange = (value) => {
    setUserInput(value);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    setIsProcessing(true);
    const userMessage = { id: Date.now(), type: 'user', message: userInput };
    setChatMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const aiResponse = generateAIResponse(userInput, formData);
      const aiMessage = { id: Date.now() + 1, type: 'ai', message: aiResponse };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1000);
    
    setUserInput('');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'calculator':
        return (
          <CalculatorTab
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        );
      case 'chat':
        return (
          <ChatTab
            chatMessages={chatMessages}
            userInput={userInput}
            isProcessing={isProcessing}
            onInputChange={handleChatInputChange}
            onSendMessage={handleSendMessage}
          />
        );
      case 'results':
        return <ResultsTab results={results} />;
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={globalStyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header />
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      {renderActiveTab()}
    </KeyboardAvoidingView>
  );
};

export default MortgageCalculator;