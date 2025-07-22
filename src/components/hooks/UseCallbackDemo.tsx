import React, { useState, useCallback } from 'react';
import { Typography, Box, Card, CardContent, Button, Alert } from '@mui/material';

// Child component to demonstrate useCallback benefits
interface ChildComponentProps {
  onAction: (value: number) => void;
  label: string;
}

const ChildComponent: React.FC<ChildComponentProps> = React.memo(({ onAction, label }) => {
  console.log(`🔄 ChildComponent "${label}" rendered`);
  
  return (
    <Button onClick={() => onAction(Math.floor(Math.random() * 100))} variant="outlined" size="small">
      {label}
    </Button>
  );
});

const UseCallbackDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // This callback will be recreated on every render (BAD)
  const handleBadCallback = (value: number) => {
    console.log('Bad callback called with:', value);
    setCount(value);
  };

  // This callback is memoized and stable (GOOD)
  const handleGoodCallback = useCallback((value: number) => {
    console.log('Good callback called with:', value);
    setCount(value);
  }, []); // Empty dependency array means it never changes

  // This callback depends on count and will change when count changes
  const handleDependentCallback = useCallback((value: number) => {
    console.log('Dependent callback called. Current count:', count, 'New value:', value);
    setCount(count + value);
  }, [count]); // Recreated when count changes

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          6. useCallback Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Memoizes functions to prevent unnecessary re-renders of child components.
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">🔍 Watch the console!</Typography>
          <Typography variant="caption">
            Child components using memoized callbacks won't re-render unnecessarily.
          </Typography>
        </Alert>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Count: {count}</Typography>
          <Typography variant="body2">Other State: {otherState}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <ChildComponent onAction={handleBadCallback} label="Bad Callback (always re-renders)" />
          <ChildComponent onAction={handleGoodCallback} label="Good Callback (stable)" />
          <ChildComponent onAction={handleDependentCallback} label="Dependent Callback" />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button 
            onClick={() => setOtherState(prev => prev + 1)}
            variant="contained"
            size="small"
          >
            Update Other State (causes re-render)
          </Button>
          <Button 
            onClick={() => setCount(0)}
            variant="outlined"
            size="small"
          >
            Reset Count
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">How it works:</Typography>
          <ul>
            <li><strong>Without useCallback:</strong> Function recreated on every render</li>
            <li><strong>With useCallback:</strong> Function reference stays the same</li>
            <li><strong>React.memo:</strong> Child only re-renders if props actually change</li>
            <li><strong>Dependencies:</strong> Callback recreated only when dependencies change</li>
          </ul>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            💡 Only use useCallback when you have expensive child components that are wrapped in React.memo
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default UseCallbackDemo;
