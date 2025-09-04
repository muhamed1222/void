// Error utilities

// Custom error classes
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public field?: string,
    details?: Record<string, any>
  ) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AppError {
  constructor(
    message: string,
    details?: Record<string, any>
  ) {
    super(message, 'NETWORK_ERROR', details);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends AppError {
  constructor(
    message: string,
    details?: Record<string, any>
  ) {
    super(message, 'AUTHENTICATION_ERROR', details);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(
    message: string,
    details?: Record<string, any>
  ) {
    super(message, 'AUTHORIZATION_ERROR', details);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string,
    details?: Record<string, any>
  ) {
    super(message, 'NOT_FOUND_ERROR', details);
    this.name = 'NotFoundError';
  }
}

// Error handler
export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new AppError(error.message);
  }
  
  return new AppError('An unknown error occurred');
};

// Format error message
export const formatErrorMessage = (error: AppError): string => {
  if (error.code) {
    return `[${error.code}] ${error.message}`;
  }
  
  return error.message;
};

// Get error details
export const getErrorDetails = (error: AppError): Record<string, any> => {
  return error.details || {};
};

// Check if error is of specific type
export const isAppError = (error: unknown, code?: string): error is AppError => {
  if (!(error instanceof AppError)) {
    return false;
  }
  
  if (code) {
    return error.code === code;
  }
  
  return true;
};

// Create error with context
export const createErrorWithContext = (
  error: Error,
  context: Record<string, any>
): AppError => {
  return new AppError(
    error.message,
    undefined,
    {
      ...context,
      originalError: error.message,
      stack: error.stack,
    }
  );
};

// Log error
export const logError = (error: AppError): void => {
  console.error('App Error:', {
    name: error.name,
    message: error.message,
    code: error.code,
    details: error.details,
    stack: error.stack,
  });
};

// Handle async error
export const handleAsyncError = async <T>(
  asyncFn: () => Promise<T>
): Promise<T | null> => {
  try {
    return await asyncFn();
  } catch (error) {
    const appError = handleError(error);
    logError(appError);
    return null;
  }
};