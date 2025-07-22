import React, { useState, useMemo } from 'react';
import { Typography, Box, Card, CardContent, Button, Slider, Alert } from '@mui/material';

const UseMemoDemo: React.FC = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(2);
  const [shouldRecalculate, setShouldRecalculate] = useState(true);

  console.log('🔄 UseMemoDemo rendered');

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


  return (
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
  );
};

export default UseMemoDemo;
