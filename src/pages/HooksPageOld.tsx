import React, { 
  useState, 
  useEffect, 
  useContext, 
  useReducer, 
  useMemo, 
  useCallback, 
  useRef, 
  useImperativeHandle, 
  forwardRef, 
  useLayoutEffect,
  useDeferredValue,
  useTransition,
  useId,
  useSyncExternalStore,
  useInsertionEffect,
  createContext
} from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  Container, 
  TextField,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  Slider,
  Switch,
  FormControlLabel,
  CircularProgress
} from '@mui/material';

// Context for useContext example
const ThemeContext = createContext<{ color: string; toggleColor: () => void } | null>(null);

// Custom hook examples
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(prev => prev + 1), []);
  const decrement = useCallback(() => setCount(prev => prev - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
};

const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  return [storedValue, setValue] as const;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
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

// useReducer example
interface CounterState {
  count: number;
  step: number;
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set_step'; step: number }
  | { type: 'reset' };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'set_step':
      return { ...state, step: action.step };
    case 'reset':
      return { count: 0, step: 1 };
    default:
      return state;
  }
};

// Forward ref component for useImperativeHandle
interface CustomInputRef {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

const CustomInput = forwardRef<CustomInputRef, { label: string }>((props, ref) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => setValue(''),
    getValue: () => value,
  }));

  return (
    <TextField
      ref={inputRef}
      label={props.label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      fullWidth
    />
  );
});

// External store for useSyncExternalStore
const createStore = <T,>(initialState: T) => {
  let state = initialState;
  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    setState: (newState: T) => {
      state = newState;
      listeners.forEach(listener => listener());
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
};

const colorStore = createStore({ color: 'blue', count: 0 });

const HooksPage: React.FC = () => {
  // useState examples
  const [basicCount, setBasicCount] = useState(0);
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  
  // useEffect examples
  const [seconds, setSeconds] = useState(0);
  const [windowTitle, setWindowTitle] = useState('Hooks Demo');
  
  // useContext example
  const [contextColor, setContextColor] = useState('blue');
  const toggleContextColor = useCallback(() => {
    setContextColor(prev => prev === 'blue' ? 'red' : 'blue');
  }, []);
  
  // useReducer example
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });
  
  // useMemo example - Fixed to demonstrate proper memoization
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(2);
  const [shouldRecalculate, setShouldRecalculate] = useState(true);
  
  // This useMemo will only recalculate when numbers or multiplier actually change
  const expensiveCalculation = useMemo(() => {
    console.log('🔄 Performing expensive calculation...');
    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i * 0.0001;
    }
    return numbers.reduce((sum, num) => sum + (num * multiplier), 0) + result;
  }, [numbers, multiplier]);
  
  // This is a stable reference that won't change
  const stableNumbers = useMemo(() => [1, 2, 3, 4, 5], []);
  
  // This calculation will only run once and be memoized
  const stableCalculation = useMemo(() => {
    console.log('✅ Stable calculation - should only run once!');
    return stableNumbers.reduce((sum, num) => sum + (num * 2), 0);
  }, [stableNumbers]);
  
  // useCallback example
  const memoizedCallback = useCallback((value: number) => {
    console.log('Callback called with:', value);
    setBasicCount(value);
  }, []);
  
  // useRef examples
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(0);
  const customInputRef = useRef<CustomInputRef>(null);
  
  // useLayoutEffect example
  const [boxWidth, setBoxWidth] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if (boxRef.current) {
      setBoxWidth(boxRef.current.offsetWidth);
    }
  }, [text]);
  
  // useTransition and useDeferredValue examples
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  // useId example
  const id = useId();
  
  // Custom hooks
  const { count: customCount, increment, decrement, reset } = useCounter(0);
  const [storageValue, setStorageValue] = useLocalStorage('hooksDemo', 'Hello World');
  const windowSize = useWindowSize();
  
  // useSyncExternalStore example
  const externalState = useSyncExternalStore(
    colorStore.subscribe,
    colorStore.getState
  );
  
  // useInsertionEffect example (rarely used, mainly for CSS-in-JS)
  useInsertionEffect(() => {
    console.log('useInsertionEffect: This runs before all other effects');
  }, []);
  
  // useEffect for timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // useEffect for document title
  useEffect(() => {
    document.title = windowTitle;
    return () => {
      document.title = 'React Learning App';
    };
  }, [windowTitle]);
  
  // Update render count
  renderCount.current += 1;
  
  const addManyItems = () => {
    startTransition(() => {
      const newItems = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
      setItems(newItems);
    });
  };
  
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [items, deferredQuery]);

  return (
    <ThemeContext.Provider value={{ color: contextColor, toggleColor: toggleContextColor }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          React Hooks Comprehensive Guide
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Explore all React hooks with interactive examples and real-world use cases.
        </Typography>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          
          {/* useState Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                1. useState Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manages local component state with functional components.
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Counter Example:</Typography>
                <Box display="flex" alignItems="center" gap={1} my={1}>
                  <Button variant="outlined" onClick={() => setBasicCount(prev => prev - 1)}>-</Button>
                  <Chip label={basicCount} />
                  <Button variant="outlined" onClick={() => setBasicCount(prev => prev + 1)}>+</Button>
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Text Input:</Typography>
                <TextField
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type something..."
                  size="small"
                  fullWidth
                />
                <Typography variant="caption">Value: {text}</Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />
                }
                label="Toggle visibility"
              />
            </CardContent>
          </Card>

          {/* useEffect Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                2. useEffect Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Handles side effects like API calls, timers, and subscriptions.
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                Timer: {seconds} seconds
              </Alert>
              
              <TextField
                label="Window Title"
                value={windowTitle}
                onChange={(e) => setWindowTitle(e.target.value)}
                size="small"
                fullWidth
              />
              <Typography variant="caption">
                Check the browser tab title!
              </Typography>
            </CardContent>
          </Card>

          {/* useContext Hook */}
          <UseContextExample />

          {/* useReducer Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                4. useReducer Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manages complex state logic with predictable state transitions.
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography>Count: {state.count}</Typography>
                <Typography>Step: {state.step}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Button onClick={() => dispatch({ type: 'increment' })} variant="contained">
                  +{state.step}
                </Button>
                <Button onClick={() => dispatch({ type: 'decrement' })} variant="outlined">
                  -{state.step}
                </Button>
                <Button onClick={() => dispatch({ type: 'reset' })} variant="text">
                  Reset
                </Button>
              </Box>
              
              <TextField
                label="Step Size"
                type="number"
                value={state.step}
                onChange={(e) => dispatch({ type: 'set_step', step: Number(e.target.value) })}
                size="small"
              />
            </CardContent>
          </Card>

          {/* useMemo Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                5. useMemo Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Memoizes expensive calculations to optimize performance.
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="subtitle2">🔍 Watch the console for calculation logs!</Typography>
                <Typography variant="caption">
                  The expensive calculation should only run when dependencies change.
                </Typography>
              </Alert>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Dynamic Calculation:</Typography>
                <Typography variant="body2">Numbers: {numbers.join(', ')}</Typography>
                <Typography variant="body2">Multiplier: {multiplier}</Typography>
                <Typography variant="h6" color="success.main">
                  Result: {Math.round(expensiveCalculation)}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Stable Calculation (Memoized):</Typography>
                <Typography variant="h6" color="primary">
                  Stable Result: {stableCalculation}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  This value is calculated once and never recalculated
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Multiplier (triggers recalculation):</Typography>
                <Slider
                  value={multiplier}
                  onChange={(_, value) => setMultiplier(value as number)}
                  min={1}
                  max={10}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Button 
                  onClick={() => setNumbers(prev => [...prev, prev.length + 1])}
                  variant="outlined"
                  size="small"
                >
                  Add Number (triggers calc)
                </Button>
                <Button 
                  onClick={() => setShouldRecalculate(!shouldRecalculate)}
                  variant="text"
                  size="small"
                >
                  Re-render (no calc)
                </Button>
              </Box>
              
              <Typography variant="caption" display="block" color="warning.main">
                💡 Tip: Only the "Dynamic Calculation" should log when changed. 
                Re-rendering without changing dependencies won't trigger the expensive calculation.
              </Typography>
            </CardContent>
          </Card>

          {/* useCallback Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                6. useCallback Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Memoizes functions to prevent unnecessary re-renders.
              </Typography>
              
              <Typography>Basic Count: {basicCount}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button onClick={() => memoizedCallback(10)} variant="contained">
                  Set to 10
                </Button>
                <Button onClick={() => memoizedCallback(20)} variant="outlined">
                  Set to 20
                </Button>
                <Button onClick={() => memoizedCallback(0)} variant="text">
                  Reset
                </Button>
              </Box>
              
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Check console for callback logs
              </Typography>
            </CardContent>
          </Card>

          {/* useRef Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                7. useRef Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Creates mutable references that persist across renders.
              </Typography>
              
              <TextField
                ref={inputRef}
                label="Focus me with button"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              
              <Button 
                onClick={() => inputRef.current?.focus()}
                variant="contained"
                sx={{ mb: 2, mr: 1 }}
              >
                Focus Input
              </Button>
              
              <Alert severity="info">
                This component has rendered {renderCount.current} times
              </Alert>
            </CardContent>
          </Card>

          {/* useImperativeHandle Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                8. useImperativeHandle Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Customizes the instance value exposed to parent components.
              </Typography>
              
              <CustomInput ref={customInputRef} label="Custom Input" />
              
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button 
                  onClick={() => customInputRef.current?.focus()}
                  variant="contained"
                  size="small"
                >
                  Focus
                </Button>
                <Button 
                  onClick={() => customInputRef.current?.clear()}
                  variant="outlined"
                  size="small"
                >
                  Clear
                </Button>
                <Button 
                  onClick={() => alert(customInputRef.current?.getValue())}
                  variant="text"
                  size="small"
                >
                  Get Value
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* useLayoutEffect Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                9. useLayoutEffect Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Runs synchronously after all DOM mutations.
              </Typography>
              
              <Box ref={boxRef} sx={{ border: 1, p: 2, mb: 2 }}>
                {text || 'Type in the text field above to see this box resize'}
              </Box>
              
              <Typography variant="body2">
                Box width: {boxWidth}px
              </Typography>
            </CardContent>
          </Card>

          {/* useTransition Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                10. useTransition Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Marks state updates as non-urgent to keep UI responsive.
              </Typography>
              
              <Button 
                onClick={addManyItems} 
                variant="contained"
                disabled={isPending}
                sx={{ mb: 2 }}
              >
                {isPending ? <CircularProgress size={20} /> : 'Add 1000 Items'}
              </Button>
              
              <Typography variant="body2">
                Items count: {items.length}
              </Typography>
              
              {isPending && (
                <Alert severity="info" sx={{ mt: 1 }}>
                  Adding items in background...
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* useDeferredValue Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                11. useDeferredValue Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Defers updates to less important parts of the UI.
              </Typography>
              
              <TextField
                label="Search items"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                Filtered items ({filteredItems.length}):
              </Typography>
              
              <Paper sx={{ maxHeight: 150, overflow: 'auto' }}>
                <List dense>
                  {filteredItems.slice(0, 10).map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                  {filteredItems.length > 10 && (
                    <ListItem>
                      <ListItemText primary={`... and ${filteredItems.length - 10} more`} />
                    </ListItem>
                  )}
                </List>
              </Paper>
            </CardContent>
          </Card>

          {/* useId Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                12. useId Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Generates unique IDs for accessibility attributes.
              </Typography>
              
              <Box component="fieldset" sx={{ border: 1, borderRadius: 1, p: 2 }}>
                <Typography component="legend" variant="subtitle2">
                  Accessible Form
                </Typography>
                <TextField
                  id={`${id}-name`}
                  label="Name"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  id={`${id}-email`}
                  label="Email"
                  type="email"
                  size="small"
                  fullWidth
                />
              </Box>
              
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Generated ID prefix: {id}
              </Typography>
            </CardContent>
          </Card>

          {/* useSyncExternalStore Hook */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                13. useSyncExternalStore Hook
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Subscribes to external stores safely.
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                External State: {JSON.stringify(externalState)}
              </Alert>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  onClick={() => colorStore.setState({ 
                    ...externalState, 
                    color: externalState.color === 'blue' ? 'red' : 'blue' 
                  })}
                  variant="contained"
                  size="small"
                >
                  Toggle Color
                </Button>
                <Button 
                  onClick={() => colorStore.setState({ 
                    ...externalState, 
                    count: externalState.count + 1 
                  })}
                  variant="outlined"
                  size="small"
                >
                  Increment Count
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Custom Hooks */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                14. Custom Hooks
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Reusable stateful logic extracted into custom hooks.
              </Typography>
              
              <Typography variant="subtitle2">useCounter Hook:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Button onClick={decrement} variant="outlined" size="small">-</Button>
                <Chip label={customCount} />
                <Button onClick={increment} variant="outlined" size="small">+</Button>
                <Button onClick={reset} variant="text" size="small">Reset</Button>
              </Box>
              
              <Typography variant="subtitle2">useLocalStorage Hook:</Typography>
              <TextField
                value={storageValue}
                onChange={(e) => setStorageValue(e.target.value)}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle2">useWindowSize Hook:</Typography>
              <Typography variant="body2">
                Window: {windowSize.width} × {windowSize.height}
              </Typography>
            </CardContent>
          </Card>

          {/* Hook Rules & Best Practices */}
          <Card sx={{ gridColumn: '1 / -1' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Hook Rules & Best Practices
              </Typography>
              
              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Rules of Hooks:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Only call at the top level"
                        secondary="Never inside loops, conditions, or nested functions"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Only call from React functions"
                        secondary="Components or custom hooks only"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Use ESLint plugin"
                        secondary="eslint-plugin-react-hooks catches violations"
                      />
                    </ListItem>
                  </List>
                </Box>
                
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Performance Tips:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="useMemo for expensive calculations"
                        secondary="Only when performance testing shows benefit"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="useCallback for stable references"
                        secondary="Prevent unnecessary child re-renders"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="useRef for DOM access"
                        secondary="Alternative to imperative DOM operations"
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </CardContent>
          </Card>

        </Box>
      </Container>
    </ThemeContext.Provider>
  );
};

// useContext example component
const UseContextExample: React.FC = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    return <Card><CardContent>Context not available</CardContent></Card>;
  }
  
  const { color, toggleColor } = context;
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          3. useContext Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Consumes context values without nesting.
        </Typography>
        
        <Box 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: color, 
            color: 'white',
            borderRadius: 1 
          }}
        >
          Current theme color: {color}
        </Box>
        
        <Button onClick={toggleColor} variant="contained">
          Toggle Color
        </Button>
      </CardContent>
    </Card>
  );
};

export default HooksPage;
