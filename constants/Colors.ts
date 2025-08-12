/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F5F7FA',
    tint: '#6B1DCE', // Updated to use the new purple color
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#6B1DCE', // Updated to use the new purple color
    accent: '#00C4B3', // Teal accent used for borders/indicators
    surface: '#FFFFFF', // Card/background surfaces in light mode
    border: '#E5E7EB', // Subtle border color in light mode
  },
  dark: {
    text: '#ECEDEE',
    background: '#0D1117',
    tint: '#6B1DCE', // Updated to use the new purple color
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#6B1DCE', // Updated to use the new purple color
    accent: '#00C4B3', // Teal accent used for borders/indicators
    surface: '#161B21', // Requested card body bg in dark mode
    border: '#30363d', // Gray border in dark mode
  },
};

export const Typography = {
  fontFamily: {
    primary: 'Silka-Black' as const,
    secondary: 'Silka-Light' as const,
    regular: 'Silka-Regular' as const,
    monospace: 'SpaceMono' as const,
  },
  fontSize: {
    small: 12,
    regular: 14,
    medium: 16,
    large: 18,
    xlarge: 20,
    xxlarge: 24,
    xxxlarge: 28,
  },
};
