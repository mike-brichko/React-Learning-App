import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Typography, Box, Card, CardContent, Button, TextField } from '@mui/material';

// Define the ref interface
interface CustomInputRef {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
  getSelectionRange: () => { start: number; end: number } | null;
}

// Custom input component with imperative handle
const CustomInput = forwardRef<CustomInputRef, { label: string; placeholder?: string }>((props, ref) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      setValue('');
      inputRef.current?.focus();
    },
    getValue: () => value,
    setValue: (newValue: string) => {
      setValue(newValue);
    },
    getSelectionRange: () => {
      if (inputRef.current) {
        return {
          start: inputRef.current.selectionStart || 0,
          end: inputRef.current.selectionEnd || 0
        };
      }
      return null;
    }
  }), [value]);

  return (
    <TextField
      ref={inputRef}
      label={props.label}
      placeholder={props.placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      fullWidth
      size="small"
    />
  );
});

const UseImperativeHandleDemo: React.FC = () => {
  const customInputRef = useRef<CustomInputRef>(null);
  const [message, setMessage] = useState('');

  const handleFocus = () => {
    customInputRef.current?.focus();
  };

  const handleClear = () => {
    customInputRef.current?.clear();
  };

  const handleGetValue = () => {
    const value = customInputRef.current?.getValue() || '';
    setMessage(`Current value: "${value}"`);
  };

  const handleSetValue = () => {
    customInputRef.current?.setValue('Hello from parent!');
  };

  const handleGetSelection = () => {
    const selection = customInputRef.current?.getSelectionRange();
    if (selection) {
      setMessage(`Selection: ${selection.start}-${selection.end}`);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          8. useImperativeHandle Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Customizes the instance value exposed to parent components when using forwardRef.
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <CustomInput 
            ref={customInputRef} 
            label="Custom Input Component" 
            placeholder="Type something..."
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Button onClick={handleFocus} variant="contained" size="small">
            Focus
          </Button>
          <Button onClick={handleClear} variant="outlined" size="small">
            Clear
          </Button>
          <Button onClick={handleGetValue} variant="outlined" size="small">
            Get Value
          </Button>
          <Button onClick={handleSetValue} variant="outlined" size="small">
            Set Value
          </Button>
          <Button onClick={handleGetSelection} variant="outlined" size="small">
            Get Selection
          </Button>
        </Box>

        {message && (
          <Box sx={{ mb: 2, p: 1, bgcolor: 'info.light', borderRadius: 1 }}>
            <Typography variant="body2">{message}</Typography>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">How it works:</Typography>
          <ul>
            <li><strong>forwardRef:</strong> Allows parent to pass ref to child component</li>
            <li><strong>useImperativeHandle:</strong> Customizes what the ref exposes</li>
            <li><strong>Custom API:</strong> Parent can call specific methods on child</li>
            <li><strong>Encapsulation:</strong> Child controls what methods are available</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>⚠️ Use Sparingly</Typography>
          <Typography variant="caption">
            useImperativeHandle should be used sparingly. Most of the time, you should use props and callbacks instead of imperative APIs.
            Good use cases: focus management, scrolling, triggering animations.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UseImperativeHandleDemo;
