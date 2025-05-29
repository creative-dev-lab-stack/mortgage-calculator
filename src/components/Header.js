import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { headerStyles } from '../styles/componentStyles';
import { colors } from '../styles/globalStyles';

const Header = () => {
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.headerContent}>
        <Ionicons name="home" size={32} color={colors.primary} />
        <View>
          <Text style={headerStyles.headerTitle}>Mortgage Calculator</Text>
          <Text style={headerStyles.headerSubtitle}>Calculate payoff scenarios</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
