import React from 'react';
import { render } from '@testing-library/react-native';
import { EntryScreen } from '../index';
import { useStore } from '@/store/useStore';
import { NavigationContainer } from '@react-navigation/native';

// Mock the store
jest.mock('@/store/useStore', () => ({
  useStore: jest.fn(),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    reset: jest.fn(),
  }),
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

describe('EntryScreen Snapshot', () => {
  it('renders correctly with existing user ID', () => {
    (useStore as jest.Mock).mockReturnValue({
      userId: 'User#123',
      hasAssignedId: true,
      setUserId: jest.fn(),
      setHasAssignedId: jest.fn(),
    });

    const tree = render(
      <NavigationContainer>
        <EntryScreen />
      </NavigationContainer>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});