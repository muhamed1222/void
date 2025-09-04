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
import TodayScreen from '../index';
import ThemeProvider from '@/theming/ThemeProvider';

describe('TodayScreen', () => {
  it('renders main sections', async () => {
    render(
      <ThemeProvider>
        <TodayScreen />
      </ThemeProvider>
    );

    expect(await screen.findByText('Сегодня')).toBeTruthy();
    expect(screen.getByText('Инструкция')).toBeTruthy();
    expect(screen.getByText('Задачи')).toBeTruthy();
    expect(screen.getByText('Мини-отчёт')).toBeTruthy();
    expect(screen.getByText('Сообщения коуча')).toBeTruthy();
  });
});
