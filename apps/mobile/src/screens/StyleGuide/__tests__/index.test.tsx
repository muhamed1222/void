// Mock MMKV native module (must be before importing store/screen)
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    contains: jest.fn(),
  })),
}));

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import StyleGuideScreen from '../index';
import ThemeProvider from '@/theming/ThemeProvider';

describe('StyleGuideScreen', () => {
  it('renders correctly', async () => {
    render(
      <ThemeProvider>
        <StyleGuideScreen />
      </ThemeProvider>
    );

    expect(await screen.findByText('Style Guide')).toBeTruthy();
    expect(screen.getByText('Color Palette')).toBeTruthy();
    expect(screen.getByText('Typography')).toBeTruthy();
    expect(screen.getByText('Component Library')).toBeTruthy();
    expect(screen.getByText('Responsive Behavior')).toBeTruthy();
  });
});