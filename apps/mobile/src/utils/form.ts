// Form utilities

// Form field types
export type FormFieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'date'
  | 'time'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'file';

// Form field
export interface FormField<T = any> {
  name: string;
  label: string;
  type: FormFieldType;
  value: T;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: { label: string; value: any }[];
  validation?: (value: T) => string | null;
  helpText?: string;
}

// Form state
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Create initial form state
export const createInitialFormState = <T extends Record<string, any>>(
  initialValues: T
): FormState<T> => {
  return {
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  };
};

// Update form field value
export const updateFormField = <T extends Record<string, any>>(
  state: FormState<T>,
  field: keyof T,
  value: T[typeof field]
): FormState<T> => {
  const newValues = { ...state.values, [field]: value };
  const newTouched = { ...state.touched, [field]: true };
  
  // Validate field if it has a validator
  const newErrors = { ...state.errors };
  delete newErrors[field];
  
  return {
    ...state,
    values: newValues,
    touched: newTouched,
    errors: newErrors,
  };
};

// Validate form
export const validateForm = <T extends Record<string, any>>(
  state: FormState<T>,
  fields: FormField<T[keyof T]>[]
): FormState<T> => {
  const errors: Partial<Record<keyof T, string>> = {};
  
  fields.forEach(field => {
    const value = state.values[field.name];
    const isTouched = state.touched[field.name];
    
    // Skip validation if field is not touched
    if (!isTouched) return;
    
    // Required field validation
    if (field.required && (value === null || value === undefined || value === '')) {
      errors[field.name as keyof T] = 'Это поле обязательно для заполнения';
      return;
    }
    
    // Custom validation
    if (field.validation && value !== null && value !== undefined) {
      const error = field.validation(value);
      if (error) {
        errors[field.name as keyof T] = error;
      }
    }
  });
  
  const isValid = Object.keys(errors).length === 0;
  
  return {
    ...state,
    errors,
    isValid,
  };
};

// Mark field as touched
export const touchFormField = <T extends Record<string, any>>(
  state: FormState<T>,
  field: keyof T
): FormState<T> => {
  return {
    ...state,
    touched: { ...state.touched, [field]: true },
  };
};

// Mark all fields as touched
export const touchAllFormFields = <T extends Record<string, any>>(
  state: FormState<T>,
  fields: FormField<T[keyof T]>[]
): FormState<T> => {
  const touched: Partial<Record<keyof T, boolean>> = {};
  
  fields.forEach(field => {
    touched[field.name as keyof T] = true;
  });
  
  return {
    ...state,
    touched,
  };
};

// Reset form
export const resetForm = <T extends Record<string, any>>(
  state: FormState<T>,
  initialValues: T
): FormState<T> => {
  return createInitialFormState(initialValues);
};

// Set form submitting state
export const setFormSubmitting = <T extends Record<string, any>>(
  state: FormState<T>,
  isSubmitting: boolean
): FormState<T> => {
  return {
    ...state,
    isSubmitting,
  };
};

// Get form field error
export const getFormFieldError = <T extends Record<string, any>>(
  state: FormState<T>,
  field: keyof T
): string | null => {
  return state.errors[field] || null;
};

// Check if form field has error
export const hasFormFieldError = <T extends Record<string, any>>(
  state: FormState<T>,
  field: keyof T
): boolean => {
  return !!state.errors[field];
};

// Check if form field is touched
export const isFormFieldTouched = <T extends Record<string, any>>(
  state: FormState<T>,
  field: keyof T
): boolean => {
  return !!state.touched[field];
};

// Create form field
export const createFormField = <T>(
  name: string,
  label: string,
  type: FormFieldType,
  value: T,
  options: Partial<FormField<T>> = {}
): FormField<T> => {
  return {
    name,
    label,
    type,
    value,
    ...options,
  };
};

// Format form data for submission
export const formatFormData = <T extends Record<string, any>>(
  values: T
): FormData => {
  const formData = new FormData();
  
  Object.keys(values).forEach(key => {
    const value = values[key as keyof T];
    if (value !== null && value !== undefined) {
      formData.append(key, value as any);
    }
  });
  
  return formData;
};

// Validate email field
export const validateEmailField = (value: string): string | null => {
  if (!value) return null;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Введите корректный email адрес';
  }
  
  return null;
};

// Validate password field
export const validatePasswordField = (value: string): string | null => {
  if (!value) return null;
  
  if (value.length < 8) {
    return 'Пароль должен содержать минимум 8 символов';
  }
  
  if (!/[A-Z]/.test(value)) {
    return 'Пароль должен содержать хотя бы одну заглавную букву';
  }
  
  if (!/[a-z]/.test(value)) {
    return 'Пароль должен содержать хотя бы одну строчную букву';
  }
  
  if (!/\d/.test(value)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }
  
  return null;
};