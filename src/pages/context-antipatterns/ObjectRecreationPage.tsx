import React, { createContext, useContext, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Container,
  Paper,
  Chip,
} from '@mui/material';
import ContextNavigation from '../../components/ContextNavigation';

// Simple context for demonstration
interface CounterContextType {
  count: number;
  setCount: (count: number) => void;
  message: string;
  setMessage: (message: string) => void;
  // ❌ These computed properties make the interface unstable
  doubleCount: number;
  isEven: boolean;
  timestamp: number;
}

const CounterContext = createContext<CounterContextType>({} as CounterContextType);

// ❌ BAD PRACTICE: Creating new objects on every render
const BadCounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello');

  console.log('🔴 BadCounterProvider rendering - new object will be created!');

  // ❌ This object is created fresh on every render
  const contextValue = {
    count,
    setCount,
    message,
    setMessage,
    // ❌ Even worse - computed properties that run every time
    doubleCount: count * 2,
    isEven: count % 2 === 0,
    timestamp: new Date().getTime(), // ❌ Always different!
  };

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
};

const useCounterContext = () => {
  return useContext(CounterContext);
};

// Components that will re-render excessively
const CounterDisplay: React.FC = () => {
  const { count, doubleCount, isEven } = useCounterContext();
  
  console.log('🔴 CounterDisplay re-rendered due to object recreation!', { count, doubleCount, isEven });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="error">Counter Display</Typography>
        <Typography>Count: {count}</Typography>
        <Typography>Double: {doubleCount}</Typography>
        <Typography>Is Even: {isEven ? 'Yes' : 'No'}</Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          ❌ Re-renders constantly due to new context objects!
        </Typography>
      </CardContent>
    </Card>
  );
};

const MessageDisplay: React.FC = () => {
  const { message, timestamp } = useCounterContext();
  
  console.log('🔴 MessageDisplay re-rendered due to object recreation!', { message, timestamp });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="error">Message Display</Typography>
        <Typography>Message: {message}</Typography>
        <Typography variant="caption">Timestamp: {timestamp}</Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          ❌ Re-renders even when message doesn't change!
        </Typography>
      </CardContent>
    </Card>
  );
};

const Controls: React.FC = () => {
  const { count, setCount, message, setMessage } = useCounterContext();
  
  const increment = () => setCount(count + 1);
  const updateMessage = () => setMessage(message + '!');
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="error">Controls</Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button variant="contained" color="error" onClick={increment}>
            Increment Count
          </Button>
          <Button variant="outlined" color="error" onClick={updateMessage}>
            Update Message
          </Button>
        </Box>
        <Alert severity="error" sx={{ mt: 2 }}>
          Every render creates a new context object, causing all consumers to re-render!
        </Alert>
      </CardContent>
    </Card>
  );
};

const ObjectRecreationPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <ContextNavigation currentPage="object-recreation" />
      
      <Typography variant="h4" gutterBottom color="error">
        ❌ Anti-Pattern: Object Recreation
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        This demonstrates how creating new objects on every render causes all context 
        consumers to re-render unnecessarily, even when the actual data hasn't changed.
      </Typography>

      <Alert severity="error" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          🚨 What's Wrong Here?
        </Typography>
        <Typography variant="body2">
          The context value object is created fresh on every provider render. React uses 
          Object.is() comparison to determine if context has changed, so a new object 
          always triggers re-renders in all consumers.
        </Typography>
      </Alert>

      <Paper sx={{ p: 3, mb: 3, bgcolor: 'error.main', color: 'error.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Problems Demonstrated
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip 
            label="New Object Every Render" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Unnecessary Re-renders" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Performance Degradation" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Computed Values Recalculated" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
        </Box>
      </Paper>

      <BadCounterProvider>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Watch the console - components re-render even when their data hasn't changed!
        </Typography>
        
        <CounterDisplay />
        <MessageDisplay />
        <Controls />
      </BadCounterProvider>

      <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom color="success.main">
          ✅ How to Fix This
        </Typography>
        <ul>
          <li><strong>useMemo:</strong> Wrap the context value in useMemo with proper dependencies</li>
          <li><strong>Separate State:</strong> Don't include computed values in the context object</li>
          <li><strong>Stable References:</strong> Ensure callback functions are stable using useCallback</li>
          <li><strong>Value Comparison:</strong> Only update context when values actually change</li>
        </ul>
        
        <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            ✅ Correct Pattern:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`const contextValue = useMemo(() => ({
  count,
  setCount,
  message,
  setMessage
}), [count, message]);`}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ObjectRecreationPage;
