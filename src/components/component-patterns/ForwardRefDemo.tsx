import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  TextField
} from '@mui/material';

// Forward Ref Component with useImperativeHandle
interface CustomInputRef {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

interface CustomInputProps {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const CustomInput = forwardRef<CustomInputRef, CustomInputProps>(
  ({ label, placeholder, defaultValue = '', onValueChange }, ref) => {
    const [value, setValue] = useState(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose custom methods to parent via ref
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      clear: () => {
        setValue('');
        onValueChange?.('');
      },
      getValue: () => {
        return value;
      },
      setValue: (newValue: string) => {
        setValue(newValue);
        onValueChange?.(newValue);
      }
    }), [value, onValueChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onValueChange?.(e.target.value);
    };

    return (
      <Card sx={{ border: '2px solid', borderColor: 'info.main' }}>
        <CardContent>
          <Typography variant="h6" color="info.main" gutterBottom>
            Custom Input with Forward Ref
          </Typography>
          <TextField
            ref={inputRef}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Current value: "{value}"
          </Typography>
        </CardContent>
      </Card>
    );
  }
);

// Advanced Forward Ref Component - Form Field
interface FormFieldRef {
  validate: () => boolean;
  getError: () => string | null;
  reset: () => void;
}

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
}

const FormField = forwardRef<FormFieldRef, FormFieldProps>(
  ({ label, type = 'text', required = false, minLength, pattern }, ref) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    const validate = (): boolean => {
      let errorMessage = null;

      if (required && !value.trim()) {
        errorMessage = `${label} is required`;
      } else if (minLength && value.length < minLength) {
        errorMessage = `${label} must be at least ${minLength} characters`;
      } else if (pattern && !pattern.test(value)) {
        errorMessage = `${label} format is invalid`;
      }

      setError(errorMessage);
      return errorMessage === null;
    };

    useImperativeHandle(ref, () => ({
      validate,
      getError: () => error,
      reset: () => {
        setValue('');
        setError(null);
        setTouched(false);
      }
    }), [error]);

    const handleBlur = () => {
      setTouched(true);
      validate();
    };

    return (
      <Box sx={{ mb: 2 }}>
        <TextField
          label={label}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          error={touched && !!error}
          helperText={touched && error}
          fullWidth
          variant="outlined"
          required={required}
        />
      </Box>
    );
  }
);

// Demo Component
const ForwardRefDemo: React.FC = () => {
  const customInputRef = useRef<CustomInputRef>(null);
  const emailFieldRef = useRef<FormFieldRef>(null);
  const passwordFieldRef = useRef<FormFieldRef>(null);


  const handleFocusInput = () => {
    customInputRef.current?.focus();
  };

  const handleClearInput = () => {
    customInputRef.current?.clear();
  };

  const handleGetValue = () => {
    const value = customInputRef.current?.getValue();
    alert(`Current value: "${value}"`);
  };

  const handleSetValue = () => {
    customInputRef.current?.setValue('Preset value from parent!');
  };

  const handleValidateForm = () => {
    const emailValid = emailFieldRef.current?.validate() ?? false;
    const passwordValid = passwordFieldRef.current?.validate() ?? false;
    
    if (emailValid && passwordValid) {
      alert('Form is valid!');
    } else {
      alert('Form has validation errors');
    }
  };

  const handleResetForm = () => {
    emailFieldRef.current?.reset();
    passwordFieldRef.current?.reset();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Forward Ref Components
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Technique for passing refs through component hierarchies, enabling parent components to interact directly with child component instances.
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Key Concepts:</Typography>
          <Typography variant="caption">
            • React.forwardRef passes refs to child components • useImperativeHandle customizes exposed ref methods • Enables imperative API access from parent • Useful for focus, validation, and DOM manipulation
          </Typography>
        </Alert>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' } }}>
          {/* Basic Forward Ref Example */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Basic Forward Ref Example
            </Typography>
            
            <CustomInput
              ref={customInputRef}
              label="Custom Input"
              placeholder="Type something..."
              defaultValue=""
              onValueChange={() => {}}
            />

            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button onClick={handleFocusInput} variant="outlined" size="small">
                Focus Input
              </Button>
              <Button onClick={handleClearInput} variant="outlined" size="small">
                Clear Input
              </Button>
              <Button onClick={handleGetValue} variant="outlined" size="small">
                Get Value
              </Button>
              <Button onClick={handleSetValue} variant="outlined" size="small">
                Set Value
              </Button>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="caption">
                Parent can control child component imperatively through ref methods
              </Typography>
            </Alert>
          </Box>

          {/* Advanced Form Example */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Advanced Form Validation
            </Typography>
            
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Registration Form</Typography>
                
                <FormField
                  ref={emailFieldRef}
                  label="Email"
                  type="email"
                  required
                  pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                />
                
                <FormField
                  ref={passwordFieldRef}
                  label="Password"
                  type="password"
                  required
                  minLength={8}
                />

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button onClick={handleValidateForm} variant="contained" size="small">
                    Validate Form
                  </Button>
                  <Button onClick={handleResetForm} variant="outlined" size="small">
                    Reset Form
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2">Common Use Cases:</Typography>
          <ul>
            <li><strong>Focus Management:</strong> Programmatically focus form inputs</li>
            <li><strong>Validation:</strong> Trigger validation from parent components</li>
            <li><strong>Animation Control:</strong> Control animations imperatively</li>
            <li><strong>Third-party Integration:</strong> Bridge React with non-React libraries</li>
            <li><strong>Custom Input Components:</strong> Expose DOM methods through refs</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Benefits:</Typography>
          <ul>
            <li><strong>Encapsulation:</strong> Hide internal implementation while exposing useful methods</li>
            <li><strong>Imperative API:</strong> Provide imperative access when needed</li>
            <li><strong>Flexibility:</strong> Parent can control child behavior directly</li>
            <li><strong>Reusability:</strong> Same component, multiple interaction patterns</li>
          </ul>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            💡 Use forward refs sparingly. Most React patterns should be declarative. Forward refs are best for focus management, form validation, and integrating with imperative APIs.
          </Typography>
        </Alert>

        <Alert severity="info" sx={{ mt: 1 }}>
          <Typography variant="caption">
            🔍 Try the buttons above to see how parent components can control child component behavior through refs.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ForwardRefDemo;
