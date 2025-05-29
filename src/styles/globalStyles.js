import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const colors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  success: '#10b981',
  successLight: '#16a34a',
  successDark: '#15803d',
  error: '#ef4444',
  warning: '#f59e0b',
  gray50: '#f8fafc',
  gray100: '#f3f4f6',
  gray200: '#e2e8f0',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray700: '#374151',
  gray800: '#1f2937',
  white: '#ffffff',
  blue50: '#eff6ff',
  blue500: '#2563eb',
  blue600: '#1d4ed8',
  green50: '#f0fdf4',
  purple50: '#faf5ff',
  purple500: '#9333ea',
  purple400: '#8b5cf6',
  purple600: '#7c3aed',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const typography = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.md,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  cardTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray800,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray700,
    marginBottom: spacing.xs + 2,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.md,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.xs,
    marginTop: spacing.xs,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.md,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: colors.gray400,
  },
});

export { screenWidth };