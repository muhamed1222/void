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
import { render } from '@testing-library/react-native';
import StyleGuideScreen from '../index';
import ThemeProvider from '@/theming/ThemeProvider';

describe('StyleGuideScreen Snapshot', () => {
  it('renders correctly', () => {
    const tree = render(
      <ThemeProvider>
        <StyleGuideScreen />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});