import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography } from './globalStyles';

export const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerTitle: {
    fontSize: typography.xxl,
    fontWeight: 'bold',
    color: colors.gray800,
  },
  headerSubtitle: {
    fontSize: typography.sm,
    color: colors.gray500,
  },
});

export const tabStyles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.xs + 2,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sm,
    color: colors.gray400,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.primary,
  },
  tabContent: {
    flex: 1,
    padding: spacing.xl,
  },
});

export const chatStyles = StyleSheet.create({
  chatContainer: {
    maxHeight: 300,
    marginBottom: spacing.lg,
  },
  chatMessage: {
    marginBottom: spacing.md,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  chatText: {
    padding: spacing.md,
    borderRadius: spacing.lg,
    fontSize: typography.sm,
    lineHeight: 20,
  },
  userText: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  aiText: {
    backgroundColor: colors.gray100,
    color: colors.gray800,
  },
  chatInputContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-end',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.sm,
    maxHeight: 80,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});

export const resultStyles = StyleSheet.create({
  resultsGrid: {
    gap: spacing.md,
  },
  resultCard: {
    padding: spacing.lg,
    borderRadius: spacing.sm,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    marginBottom: spacing.sm,
  },
  resultLabel: {
    fontSize: typography.sm,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: typography.xl,
    fontWeight: 'bold',
  },
  resultSubtext: {
    fontSize: typography.xs,
    marginTop: spacing.xs,
  },
  chartTitle: {
    fontSize: typography.md,
    fontWeight: '600',
    color: colors.gray800,
    marginBottom: spacing.lg,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: spacing.lg,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: typography.md,
    color: colors.gray400,
    marginTop: spacing.lg,
  },
});
