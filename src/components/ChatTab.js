import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, colors } from '../styles/globalStyles';
import { tabStyles, chatStyles } from '../styles/componentStyles';

const ChatMessage = ({ message }) => {
  return (
    <View style={[chatStyles.chatMessage, message.type === 'user' ? chatStyles.userMessage : chatStyles.aiMessage]}>
      <Text style={[chatStyles.chatText, message.type === 'user' ? chatStyles.userText : chatStyles.aiText]}>
        {message.message}
      </Text>
    </View>
  );
};

const ChatTab = ({ 
  chatMessages, 
  userInput, 
  isProcessing, 
  onInputChange, 
  onSendMessage 
}) => {
  return (
    <View style={tabStyles.tabContent}>
      <View style={globalStyles.card}>
        <View style={globalStyles.cardHeader}>
          <Ionicons name="chatbubble" size={24} color={colors.primary} />
          <Text style={globalStyles.cardTitle}>AI Assistant</Text>
        </View>
        
        <ScrollView style={chatStyles.chatContainer}>
          {chatMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isProcessing && (
            <View style={[chatStyles.chatMessage, chatStyles.aiMessage]}>
              <Text style={chatStyles.aiText}>AI is thinking...</Text>
            </View>
          )}
        </ScrollView>
        
        <View style={chatStyles.chatInputContainer}>
          <TextInput
            style={chatStyles.chatInput}
            value={userInput}
            onChangeText={onInputChange}
            placeholder="Ask me about mortgage scenarios..."
            multiline
            editable={!isProcessing}
          />
          <TouchableOpacity
            style={[
              chatStyles.sendButton, 
              (!userInput.trim() || isProcessing) && globalStyles.buttonDisabled
            ]}
            onPress={onSendMessage}
            disabled={!userInput.trim() || isProcessing}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatTab;
