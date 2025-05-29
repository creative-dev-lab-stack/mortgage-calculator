import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, colors, screenWidth } from '../styles/globalStyles';
import { tabStyles, resultStyles } from '../styles/componentStyles';
import { formatCurrency } from '../utils/calculations';

const ResultCard = ({ icon, iconColor, backgroundColor, label, value, subtext }) => {
  return (
    <View style={[resultStyles.resultCard, { backgroundColor }]}>
      <View style={resultStyles.resultHeader}>
        <Ionicons name={icon} size={16} color={iconColor} />
        <Text style={[resultStyles.resultLabel, { color: iconColor }]}>{label}</Text>
      </View>
      <Text style={[resultStyles.resultValue, { color: iconColor, fontSize: subtext ? 24 : 20 }]}>
        {value}
      </Text>
      {subtext && (
        <Text style={[resultStyles.resultSubtext, { color: iconColor }]}>
          {subtext}
        </Text>
      )}
    </View>
  );
};

const ResultsTab = ({ results }) => {
  if (!results) {
    return (
      <ScrollView style={tabStyles.tabContent}>
        <View style={resultStyles.noResultsContainer}>
          <Ionicons name="calculator-outline" size={64} color={colors.gray400} />
          <Text style={resultStyles.noResultsText}>Calculate your mortgage to see results</Text>
        </View>
      </ScrollView>
    );
  }

  const timeValue = results.yearsSaved > 0 || results.remainingMonths > 0
    ? `${results.yearsSaved > 0 ? `${results.yearsSaved}y ` : ''}${results.remainingMonths > 0 ? `${results.remainingMonths}m` : ''}`
    : '0 months';

  return (
    <ScrollView style={tabStyles.tabContent}>
      <View style={globalStyles.card}>
        <View style={globalStyles.cardHeader}>
          <Ionicons name="trending-down" size={24} color={colors.success} />
          <Text style={globalStyles.cardTitle}>Results</Text>
        </View>
        
        <View style={resultStyles.resultsGrid}>
          <ResultCard
            icon="calendar"
            iconColor={colors.successLight}
            backgroundColor={colors.green50}
            label="New Payoff Date"
            value={results.newPayoffDate}
          />
          
          <ResultCard
            icon="time"
            iconColor={colors.blue500}
            backgroundColor={colors.blue50}
            label="Time Saved"
            value={timeValue}
          />
          
          <ResultCard
            icon="cash"
            iconColor={colors.purple500}
            backgroundColor={colors.purple50}
            label="Interest Saved"
            value={formatCurrency(results.interestSaved)}
            subtext={`Total interest: ${formatCurrency(results.totalInterestPaid)} vs ${formatCurrency(results.originalTotalInterest)}`}
          />
        </View>
      </View>

      {results.chartData && results.chartData.length > 1 && (
        <View style={globalStyles.card}>
          <Text style={resultStyles.chartTitle}>Balance Over Time</Text>
          <LineChart
            data={{
              labels: results.chartData.map((_, index) => `${index + 1}y`),
              datasets: [{
                data: results.chartData
              }]
            }}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              backgroundColor: colors.white,
              backgroundGradientFrom: colors.white,
              backgroundGradientTo: colors.white,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: colors.primary
              }
            }}
            bezier
            style={resultStyles.chart}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default ResultsTab;
