import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Button, TextField, Chip } from '@mui/material';

// Custom hook: useCounter
const useCounter = (initialValue: number = 0, step: number = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);
  const setValue = (value: number) => setCount(value);

  return { count, increment, decrement, reset, setValue };
};

// Custom hook: useLocalStorage
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

// Custom hook: useWindowSize
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Custom hook: useDebounce
const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook: useToggle
const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
};

const CustomHooksDemo: React.FC = () => {
  // Using custom hooks
  const counter = useCounter(0, 2);
  const [name, setName] = useLocalStorage('demo-name', '');
  const [email, setEmail] = useLocalStorage('demo-email', '');
  const windowSize = useWindowSize();
  const toggle = useToggle(false);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [customStep, setCustomStep] = useState('1');

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomStep(value);
    counter.setValue(0); // Reset counter when step changes
  };

  // Create new counter with custom step
  const customCounter = useCounter(0, parseInt(customStep) || 1);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          14. Custom Hooks
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Custom hooks allow you to extract component logic into reusable functions.
        </Typography>

        <Box sx={{ display: 'grid', gap: 3, mb: 3 }}>
          {/* useCounter Hook */}
          <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              useCounter Hook
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Button onClick={counter.decrement} variant="outlined" size="small">
                -2
              </Button>
              <Chip label={`Count: ${counter.count}`} color="primary" />
              <Button onClick={counter.increment} variant="outlined" size="small">
                +2
              </Button>
              <Button onClick={counter.reset} variant="text" size="small">
                Reset
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                label="Custom Step"
                value={customStep}
                onChange={handleStepChange}
                size="small"
                type="number"
                sx={{ width: 100 }}
              />
              <Button onClick={customCounter.decrement} variant="outlined" size="small">
                -{customStep}
              </Button>
              <Chip label={`${customCounter.count}`} />
              <Button onClick={customCounter.increment} variant="outlined" size="small">
                +{customStep}
              </Button>
            </Box>
          </Box>

          {/* useLocalStorage Hook */}
          <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              useLocalStorage Hook
            </Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField
                label="Name (persisted)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
                placeholder="Enter your name..."
              />
              <TextField
                label="Email (persisted)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                placeholder="Enter your email..."
              />
              <Typography variant="caption" color="text.secondary">
                These values are automatically saved to localStorage. Refresh the page to see persistence!
              </Typography>
            </Box>
          </Box>

          {/* useWindowSize Hook */}
          <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              useWindowSize Hook
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Chip label={`Width: ${windowSize.width}px`} variant="outlined" />
              <Chip label={`Height: ${windowSize.height}px`} variant="outlined" />
              <Typography variant="caption" color="text.secondary">
                Resize window to see updates
              </Typography>
            </Box>
          </Box>

          {/* useDebounce Hook */}
          <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              useDebounce Hook
            </Typography>
            <TextField
              label="Search (debounced)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              fullWidth
              placeholder="Type to see debounced value..."
            />
            <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
              <Typography variant="caption">
                Current: "{searchTerm}"
              </Typography>
              <Typography variant="caption" color="primary">
                Debounced: "{debouncedSearchTerm}"
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Debounced value updates 500ms after you stop typing
            </Typography>
          </Box>

          {/* useToggle Hook */}
          <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              useToggle Hook
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button onClick={toggle.toggle} variant="contained" size="small">
                Toggle
              </Button>
              <Button onClick={toggle.setTrue} variant="outlined" size="small">
                Set True
              </Button>
              <Button onClick={toggle.setFalse} variant="outlined" size="small">
                Set False
              </Button>
              <Chip 
                label={toggle.value ? 'ON' : 'OFF'} 
                color={toggle.value ? 'success' : 'default'}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Benefits of Custom Hooks:</Typography>
          <ul>
            <li><strong>Reusability:</strong> Share stateful logic between components</li>
            <li><strong>Separation of concerns:</strong> Extract complex logic from components</li>
            <li><strong>Testability:</strong> Test hooks independently from components</li>
            <li><strong>Composition:</strong> Combine multiple hooks for complex behavior</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>🏗️ Building Custom Hooks</Typography>
          <Typography variant="caption">
            Custom hooks are just JavaScript functions that start with "use" and can call other hooks.
            They allow you to extract component logic into reusable functions, making your code more
            modular and easier to test.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomHooksDemo;
