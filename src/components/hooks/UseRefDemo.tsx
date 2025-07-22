import React, { useRef, useState } from 'react';
import { Typography, Box, Card, CardContent, Button, TextField, Alert } from '@mui/material';

const UseRefDemo: React.FC = () => {
  const [text, setText] = useState('');
  const [renderCount, setRenderCount] = useState(0);
  
  // useRef for DOM access
  const inputRef = useRef<HTMLInputElement>(null);
  
  // useRef for storing mutable values that don't trigger re-renders
  const renderCountRef = useRef(0);
  
  // useRef for storing previous values
  const prevTextRef = useRef<string>('');

  // Update render count on each render
  renderCountRef.current += 1;

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const forceReRender = () => {
    setRenderCount(prev => prev + 1);
  };

  const updatePrevText = () => {
    prevTextRef.current = text;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          7. useRef Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Creates mutable references that persist across renders without causing re-renders.
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          Render count (ref): {renderCountRef.current} | Render count (state): {renderCount}
        </Alert>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>DOM Reference Example:</Typography>
          <TextField
            ref={inputRef}
            label="Focus me with buttons"
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="small"
            fullWidth
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button onClick={focusInput} variant="contained" size="small">
              Focus Input
            </Button>
            <Button onClick={clearInput} variant="outlined" size="small">
              Clear Input
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Mutable Value Example:</Typography>
          <Typography variant="body2">
            Current text: "{text}"
          </Typography>
          <Typography variant="body2">
            Previous text: "{prevTextRef.current}"
          </Typography>
          <Button onClick={updatePrevText} variant="outlined" size="small" sx={{ mt: 1 }}>
            Save Current as Previous
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Re-render Test:</Typography>
          <Button onClick={forceReRender} variant="contained" size="small">
            Force Re-render (updates state)
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Notice how the ref render count increases but doesn't cause re-renders
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Common useRef use cases:</Typography>
          <ul>
            <li><strong>DOM access:</strong> Focus, scroll, measure elements</li>
            <li><strong>Storing mutable values:</strong> Timers, intervals, previous values</li>
            <li><strong>Instance variables:</strong> Values that don't trigger re-renders</li>
            <li><strong>Avoiding stale closures:</strong> Always getting current values</li>
          </ul>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            💡 Mutating ref.current doesn't trigger re-renders. Use state for values that should update the UI.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default UseRefDemo;
