import React, { memo, useMemo, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Slider,
  Chip,
  TextField
} from '@mui/material';

// Expensive Component that benefits from memoization
interface ExpensiveComponentProps {
  items: string[];
  multiplier: number;
  title?: string;
}

const ExpensiveComponent = memo<ExpensiveComponentProps>(({ items, multiplier, title = "Memoized Component" }) => {
  console.log('🔄 ExpensiveComponent rendering...');
  
  const expensiveValue = useMemo(() => {
    console.log('💰 Calculating expensive value...');
    // Simulate expensive calculation
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.random();
    }
    return items.reduce((sum, item) => sum + item.length * multiplier, 0) + Math.floor(result);
  }, [items, multiplier]);

  const formattedItems = useMemo(() => {
    console.log('📝 Formatting items...');
    return items.map(item => item.toUpperCase()).join(', ');
  }, [items]);

  return (
    <Card sx={{ border: '2px solid', borderColor: 'success.main' }}>
      <CardContent>
        <Typography variant="h6" color="success.main">{title}</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This component is wrapped with React.memo and uses internal useMemo.
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Items ({items.length}):</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {formattedItems}
          </Typography>
          
          <Typography variant="subtitle2">Multiplier: {multiplier}</Typography>
          <Typography variant="h6" color="primary">
            Calculated Value: {expensiveValue.toLocaleString()}
          </Typography>
        </Box>
        
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="caption">
            Check console for render and calculation logs
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
});

// Non-memoized version for comparison
const RegularComponent: React.FC<ExpensiveComponentProps> = ({ items, multiplier, title = "Regular Component" }) => {
  console.log('🔄 RegularComponent rendering...');
  
  // Same expensive calculation but without useMemo
  console.log('💸 Calculating without memoization...');
  let result = 0;
  for (let i = 0; i < 100000; i++) {
    result += Math.random();
  }
  const expensiveValue = items.reduce((sum, item) => sum + item.length * multiplier, 0) + Math.floor(result);
  
  const formattedItems = items.map(item => item.toUpperCase()).join(', ');

  return (
    <Card sx={{ border: '2px solid', borderColor: 'warning.main' }}>
      <CardContent>
        <Typography variant="h6" color="warning.main">{title}</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This component is NOT memoized and recalculates on every render.
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Items ({items.length}):</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {formattedItems}
          </Typography>
          
          <Typography variant="subtitle2">Multiplier: {multiplier}</Typography>
          <Typography variant="h6" color="primary">
            Calculated Value: {expensiveValue.toLocaleString()}
          </Typography>
        </Box>
        
        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            This component recalculates everything on each render
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

// Demo Component
const MemoizedComponentDemo: React.FC = () => {
  const [items, setItems] = useState(['React', 'TypeScript', 'Material-UI']);
  const [multiplier, setMultiplier] = useState(2);
  const [unrelatedState, setUnrelatedState] = useState(0);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems(prev => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const triggerRerender = () => {
    setUnrelatedState(prev => prev + 1);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Memoized Components
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Performance optimization using React.memo and useMemo to prevent unnecessary re-renders and calculations.
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Optimization Techniques:</Typography>
          <Typography variant="caption">
            • React.memo prevents re-renders when props haven't changed • useMemo caches expensive calculations • useCallback memoizes function references • Only re-compute when dependencies change
          </Typography>
        </Alert>

        {/* Controls */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Controls</Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Multiplier: {multiplier}</Typography>
            <Slider
              value={multiplier}
              onChange={(_, value) => setMultiplier(value as number)}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              label="Add Item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              size="small"
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
            />
            <Button onClick={addItem} variant="outlined" size="small">
              Add Item
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Current Items:</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {items.map((item, index) => (
                <Chip 
                  key={index} 
                  label={item} 
                  onDelete={() => removeItem(index)}
                  size="small"
                />
              ))}
            </Box>
          </Box>

          <Button 
            onClick={triggerRerender} 
            variant="contained" 
            color="secondary"
            size="small"
          >
            Trigger Re-render (Unrelated State: {unrelatedState})
          </Button>
        </Box>

        {/* Component Comparison */}
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' } }}>
          <ExpensiveComponent 
            items={items} 
            multiplier={multiplier}
            title="Memoized Component ✅"
          />
          
          <RegularComponent 
            items={items} 
            multiplier={multiplier}
            title="Regular Component ❌"
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2">When to Use React.memo:</Typography>
          <ul>
            <li><strong>Expensive renders:</strong> Components with heavy calculations or large lists</li>
            <li><strong>Frequent re-renders:</strong> Child components that re-render often due to parent updates</li>
            <li><strong>Stable props:</strong> Props that don't change frequently</li>
            <li><strong>Performance bottlenecks:</strong> Identified through profiling</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">When NOT to Use React.memo:</Typography>
          <ul>
            <li><strong>Props change frequently:</strong> Memo overhead outweighs benefits</li>
            <li><strong>Simple components:</strong> Fast-rendering components don't need optimization</li>
            <li><strong>Complex comparison:</strong> Custom comparison functions can be expensive</li>
            <li><strong>Premature optimization:</strong> Profile first, optimize later</li>
          </ul>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            💡 React.memo performs shallow comparison by default. For deep comparisons, provide a custom comparison function as the second argument.
          </Typography>
        </Alert>

        <Alert severity="info" sx={{ mt: 1 }}>
          <Typography variant="caption">
            🔍 Open browser console and interact with the controls to see the difference in render behavior between memoized and regular components.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default MemoizedComponentDemo;
