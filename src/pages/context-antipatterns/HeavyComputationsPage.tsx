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

// Context for demonstration  
interface SimpleContextType {
  value: string;
  setValue: (value: string) => void;
  count: number;
  setCount: (count: number) => void;
  // ❌ These expensive properties are computed on every render
  expensiveResult: number;
  dataSize: number;
  timestamp: number;
  randomValue: number;
}

const SimpleContext = createContext<SimpleContextType | undefined>(undefined);

const SimpleContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useState('Hello');
  const [count, setCount] = useState(0);

  // ❌ Heavy computation that runs on every render
  const expensiveComputation = () => {
    console.log('🔴 Running expensive computation...');
    let result = 0;
    // Simulate heavy calculation
    for (let i = 0; i < 1000000; i++) {
      result += Math.sin(i) * Math.cos(i);
    }
    return result;
  };

  // ❌ Another heavy operation
  const anotherExpensiveOperation = () => {
    console.log('🔴 Running another expensive operation...');
    const data = [];
    for (let i = 0; i < 10000; i++) {
      data.push({
        id: i,
        value: Math.random(),
        computed: Math.pow(i, 2),
      });
    }
    return data.length;
  };

  console.log('🔴 SimpleContextProvider rendering with heavy computations...');

  const contextValue = {
    value,
    setValue,
    count,
    setCount,
    // ❌ These run on every render!
    expensiveResult: expensiveComputation(),
    dataSize: anotherExpensiveOperation(),
    // ❌ More expensive operations
    timestamp: Date.now(),
    randomValue: Math.random(),
  };

  return (
    <SimpleContext.Provider value={contextValue as any}>
      {children}
    </SimpleContext.Provider>
  );
};

// ❌ BAD PRACTICE: No error handling in context hook
const useSimpleContext = () => {
  const context = useContext(SimpleContext);
  // ❌ No check for undefined context
  return context as SimpleContextType;
};

// Components that demonstrate the performance impact
const ValueDisplay: React.FC = () => {
  const { value, expensiveResult } = useSimpleContext();
  
  console.log('🔴 ValueDisplay re-rendered with expensive computation!', { value, expensiveResult });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="error">Value Display</Typography>
        <Typography>Value: {value}</Typography>
        <Typography variant="body2">
          Expensive result: {expensiveResult?.toFixed(2)}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          ❌ Heavy computation runs on every render!
        </Typography>
      </CardContent>
    </Card>
  );
};

const CountDisplay: React.FC = () => {
  const { count, dataSize, randomValue } = useSimpleContext();
  
  console.log('🔴 CountDisplay re-rendered with expensive operations!', { count, dataSize, randomValue });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="error">Count Display</Typography>
        <Typography>Count: {count}</Typography>
        <Typography variant="body2">Data size: {dataSize}</Typography>
        <Typography variant="body2">Random: {randomValue?.toFixed(4)}</Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          ❌ All computations re-run even when count hasn't changed!
        </Typography>
      </CardContent>
    </Card>
  );
};

const Controls: React.FC = () => {
  const { value, setValue, count, setCount } = useSimpleContext();
  
  const updateValue = () => setValue(value + '!');
  const incrementCount = () => setCount(count + 1);
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="error">Controls</Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button variant="contained" color="error" onClick={updateValue}>
            Update Value
          </Button>
          <Button variant="outlined" color="error" onClick={incrementCount}>
            Increment Count
          </Button>
        </Box>
        <Alert severity="error" sx={{ mt: 2 }}>
          Every button click triggers expensive computations in the provider!
        </Alert>
      </CardContent>
    </Card>
  );
};

const HeavyComputationsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <ContextNavigation currentPage="heavy-computations" />
      
      <Typography variant="h4" gutterBottom color="error">
        ❌ Anti-Pattern: Heavy Computations
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        This demonstrates the anti-pattern of performing expensive computations directly 
        in the provider component, causing performance issues on every render.
      </Typography>

      <Alert severity="error" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          🚨 What's Wrong Here?
        </Typography>
        <Typography variant="body2">
          Heavy computations are performed directly in the provider component without 
          memoization. These expensive operations run on every render, causing significant 
          performance degradation and UI freezing.
        </Typography>
      </Alert>

      <Paper sx={{ p: 3, mb: 3, bgcolor: 'error.main', color: 'error.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Problems Demonstrated
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip 
            label="Blocking Computations" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="UI Freezing" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Wasted CPU Cycles" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Poor User Experience" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
        </Box>
      </Paper>

      <SimpleContextProvider>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Notice the delay when clicking buttons - heavy computations are blocking the UI!
        </Typography>
        
        <ValueDisplay />
        <CountDisplay />
        <Controls />
      </SimpleContextProvider>

      <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom color="success.main">
          ✅ How to Fix This
        </Typography>
        <ul>
          <li><strong>useMemo:</strong> Memoize expensive computations with proper dependencies</li>
          <li><strong>useCallback:</strong> Memoize expensive functions</li>
          <li><strong>Lazy Computation:</strong> Compute values only when needed</li>
          <li><strong>Web Workers:</strong> Move heavy computations to background threads</li>
          <li><strong>Debouncing:</strong> Delay expensive operations until user stops inputting</li>
          <li><strong>Virtualization:</strong> Only compute what's visible</li>
        </ul>
        
        <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            ✅ Correct Pattern:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`const expensiveResult = useMemo(() => {
  return performExpensiveComputation(input);
}, [input]);

const contextValue = useMemo(() => ({
  value,
  setValue,
  expensiveResult
}), [value, expensiveResult]);`}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default HeavyComputationsPage;
