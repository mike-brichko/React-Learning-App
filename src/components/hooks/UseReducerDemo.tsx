import React, { useReducer } from 'react';
import { Typography, Box, Card, CardContent, Button, TextField, Chip } from '@mui/material';

// Define state and actions for the reducer
interface CounterState {
  count: number;
  step: number;
  history: number[];
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set_step'; step: number }
  | { type: 'reset' }
  | { type: 'clear_history' };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      const newIncrementValue = state.count + state.step;
      return { 
        ...state, 
        count: newIncrementValue,
        history: [...state.history, newIncrementValue]
      };
    case 'decrement':
      const newDecrementValue = state.count - state.step;
      return { 
        ...state, 
        count: newDecrementValue,
        history: [...state.history, newDecrementValue]
      };
    case 'set_step':
      return { ...state, step: action.step };
    case 'reset':
      return { ...state, count: 0, history: [0] };
    case 'clear_history':
      return { ...state, history: [state.count] };
    default:
      return state;
  }
};

const UseReducerDemo: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, { 
    count: 0, 
    step: 1, 
    history: [0] 
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          4. useReducer Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Manages complex state logic with predictable state transitions.
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" color="primary">{state.count}</Typography>
          <Typography variant="body2">Step size: {state.step}</Typography>
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
        
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Step Size"
            type="number"
            value={state.step}
            onChange={(e) => dispatch({ type: 'set_step', step: Number(e.target.value) })}
            size="small"
            sx={{ width: 120 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>History:</Typography>
          <Box sx={{ mb: 1 }}>
            {state.history.map((value, index) => (
              <Chip
                key={index}
                label={value}
                size="small"
                color={index === state.history.length - 1 ? 'primary' : 'default'}
                sx={{ mr: 0.5, mb: 0.5 }}
              />
            ))}
          </Box>
          <Button
            size="small"
            variant="outlined"
            onClick={() => dispatch({ type: 'clear_history' })}
          >
            Clear History
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Benefits of useReducer:</Typography>
          <ul>
            <li>Predictable state updates</li>
            <li>Complex state logic centralized</li>
            <li>Easy to test reducers</li>
            <li>Works well with TypeScript</li>
          </ul>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UseReducerDemo;
