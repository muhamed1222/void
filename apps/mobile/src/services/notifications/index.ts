// Notifications service

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notifications
export const configureNotifications = async (): Promise<void> => {
  // Request permission to send notifications
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Notification permission not granted');
    return;
  }
  
  // Set notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
};

// Schedule a notification
export const scheduleNotification = async (
  title: string,
  body: string,
  trigger: Notifications.NotificationTriggerInput
): Promise<string> => {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger,
  });
  
  return id;
};

// Cancel a notification
export const cancelNotification = async (id: string): Promise<void> => {
  await Notifications.cancelScheduledNotificationAsync(id);
};

// Cancel all notifications
export const cancelAllNotifications = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

// Get all scheduled notifications
export const getScheduledNotifications = async (): Promise<Notifications.Notification[]> => {
  return await Notifications.getAllScheduledNotificationsAsync();
};

// Handle notification response
export const handleNotificationResponse = (
  response: Notifications.NotificationResponse
): void => {
  console.log('Notification response received:', response);
  // Handle notification interaction here
};

// Register for push notifications (for remote notifications)
export const registerForPushNotifications = async (): Promise<string | null> => {
  try {
    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  } catch (error) {
    console.error('Failed to get push token:', error);
    return null;
  }
};

// Set notification category for iOS
export const setNotificationCategory = async (): Promise<void> => {
  if (Platform.OS === 'ios') {
    await Notifications.setNotificationCategoryAsync('default', [
      {
        identifier: 'default',
        buttonTitle: 'OK',
        options: {
          isDestructive: false,
          isAuthenticationRequired: false,
        },
      },
    ]);
  }
};