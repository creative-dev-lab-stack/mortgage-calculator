import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { tabStyles } from '../styles/componentStyles';
import { colors } from '../styles/globalStyles';

const TabBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'calculator', icon: 'calculator', label: 'Calculator' },
    { id: 'chat', icon: 'chatbubble', label: 'AI Chat' },
    { id: 'results', icon: 'analytics', label: 'Results' },
  ];

  return (
    <View style={tabStyles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[tabStyles.tab, activeTab === tab.id && tabStyles.activeTab]}
          onPress={() => onTabChange(tab.id)}
        >
          <Ionicons 
            name={tab.icon} 
            size={20} 
            color={activeTab === tab.id ? colors.primary : colors.gray400} 
          />
          <Text style={[tabStyles.tabText, activeTab === tab.id && tabStyles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabBar;
