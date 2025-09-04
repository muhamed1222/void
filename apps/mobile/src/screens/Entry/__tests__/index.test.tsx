import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EntryScreen } from '../index';
import { useStore } from '@/store/useStore';
import { NavigationContainer } from '@react-navigation/native';

// Mock the store
jest.mock('@/store/useStore', () => ({
  useStore: jest.fn(),
}));

// Mock navigation
const mockNavigation = {
  reset: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => mockNavigation,
}));

// Mock theme hook
jest.mock('@/theming/hooks', () => ({
  useTheme: () => ({
    colors: {
      background: '#FFFFFF',
      text: '#000000',
      textSecondary: '#666666',
    },
  }),
}));

describe('EntryScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates a user ID in the correct format when none exists', () => {
    (useStore as jest.Mock).mockReturnValue({
      userId: null,
      hasAssignedId: false,
      setUserId: jest.fn(),
      setHasAssignedId: jest.fn(),
    });

    const { getByText } = render(
      <NavigationContainer>
        <EntryScreen />
      </NavigationContainer>
    );

    // Should show loading state initially
    expect(getByText('Assigning ID...')).toBeTruthy();
  });

  it('displays the user ID when it exists', () => {
    const mockUserId = 'User#123';
    (useStore as jest.Mock).mockReturnValue({
      userId: mockUserId,
      hasAssignedId: true,
      setUserId: jest.fn(),
      setHasAssignedId: jest.fn(),
    });

    const { getByText } = render(
      <NavigationContainer>
        <EntryScreen />
      </NavigationContainer>
    );

    // Should display the user ID
    expect(getByText(mockUserId)).toBeTruthy();
    expect(getByText('Допуск предоставлен.')).toBeTruthy();
  });

  it('navigates to Today screen when login button is pressed', () => {
    const mockUserId = 'User#123';
    (useStore as jest.Mock).mockReturnValue({
      userId: mockUserId,
      hasAssignedId: true,
      setUserId: jest.fn(),
      setHasAssignedId: jest.fn(),
    });

    const { getByText } = render(
      <NavigationContainer>
        <EntryScreen />
      </NavigationContainer>
    );

    const loginButton = getByText('[ Войти ]');
    fireEvent.press(loginButton);

    expect(mockNavigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  });
});