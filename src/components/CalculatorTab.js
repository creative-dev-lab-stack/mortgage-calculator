import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { tabStyles } from '../styles/componentStyles';
import { colors } from '../styles/globalStyles';

const CalculatorTab = ({ 
  formData, 
  errors, 
  onInputChange, 
  onSubmit 
}) => {
  const inputFields = [
    {
      key: 'loanAmount',
      label: 'Original Loan Amount ($)',
      placeholder: 'e.g., 400000',
    },
    {
      key: 'interestRate',
      label: 'Annual Interest Rate (%)',
      placeholder: 'e.g., 6.5',
    },
    {
      key: 'loanTerm',
      label: 'Loan Term (years)',
      placeholder: 'e.g., 30',
    },
    {
      key: 'additionalPayment',
      label: 'Additional Monthly Principal Payment ($)',
      placeholder: 'e.g., 300',
    },
  ];

  return (
    <ScrollView style={tabStyles.tabContent}>
      <View style={globalStyles.card}>
        <View style={globalStyles.cardHeader}>
          <Ionicons name="calculator" size={24} color={colors.primary} />
          <Text style={globalStyles.cardTitle}>Mortgage Details</Text>
        </View>
        
        {inputFields.map((field) => (
          <View key={field.key} style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>{field.label}</Text>
            <TextInput
              style={[globalStyles.input, errors[field.key] && globalStyles.inputError]}
              value={formData[field.key]}
              onChangeText={(value) => onInputChange(field.key, value)}
              placeholder={field.placeholder}
              keyboardType="numeric"
            />
            {errors[field.key] && (
              <Text style={globalStyles.errorText}>{errors[field.key]}</Text>
            )}
          </View>
        ))}

        <TouchableOpacity style={globalStyles.button} onPress={onSubmit}>
          <Text style={globalStyles.buttonText}>Calculate Payoff</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CalculatorTab;
