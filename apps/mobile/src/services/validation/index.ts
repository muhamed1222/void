// Validation service

import { z } from 'zod';
import { loggerService } from '@/services/logger';

export class ValidationService {
  private static instance: ValidationService;
  
  static getInstance(): ValidationService {
    if (!ValidationService.instance) {
      ValidationService.instance = new ValidationService();
    }
    return ValidationService.instance;
  }
  
  // Validate data using Zod schema
  validate<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: z.ZodError } {
    try {
      const result = schema.safeParse(data);
      
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        loggerService.warn('Validation failed', { error: result.error });
        return { success: false, error: result.error };
      }
    } catch (error) {
      loggerService.error('Validation error', { error });
      return { success: false, error: error as z.ZodError };
    }
  }
  
  // Validate and throw on error
  validateOrThrow<T>(schema: z.ZodSchema<T>, data: unknown): T {
    const result = this.validate(schema, data);
    
    if (!result.success) {
      throw result.error;
    }
    
    return result.data;
  }
  
  // Validate with custom error handler
  validateWithHandler<T>(
    schema: z.ZodSchema<T>, 
    data: unknown, 
    errorHandler: (error: z.ZodError) => void
  ): T | null {
    const result = this.validate(schema, data);
    
    if (!result.success) {
      errorHandler(result.error);
      return null;
    }
    
    return result.data;
  }
}

// Export singleton instance
export const validationService = ValidationService.getInstance();

// Common validation schemas
export const schemas = {
  // Email validation
  email: z.string().email(),
  
  // Non-empty string
  nonEmptyString: z.string().min(1),
  
  // Positive number
  positiveNumber: z.number().positive(),
  
  // Integer
  integer: z.number().int(),
  
  // Boolean
  boolean: z.boolean(),
  
  // Date string (ISO format)
  dateString: z.string().datetime(),
  
  // Optional string
  optionalString: z.string().optional(),
  
  // Optional number
  optionalNumber: z.number().optional(),
};