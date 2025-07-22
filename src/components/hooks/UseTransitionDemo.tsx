import React, { useState, useTransition, useDeferredValue } from 'react';
import { Typography, Box, Card, CardContent, TextField, Button, Chip, CircularProgress } from '@mui/material';

// Simulate heavy computation
const generateItems = (filter: string, count: number = 5000) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    const item = `Item ${i} - ${filter || 'default'}`;
    if (!filter || item.toLowerCase().includes(filter.toLowerCase())) {
      items.push(item);
    }
  }
  return items;
};

const UseTransitionDemo: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  
  // Deferred value for comparison
  const deferredFilter = useDeferredValue(filter);
  const [deferredItems, setDeferredItems] = useState<string[]>([]);

  const handleUrgentUpdate = () => {
    // This update is urgent and will not be deferred
    setFilter('urgent');
    
    // This update is non-urgent and will be deferred
    startTransition(() => {
      const newItems = generateItems('urgent');
      setItems(newItems);
    });
  };

  const handleNormalUpdate = () => {
    const newFilter = Math.random() > 0.5 ? 'normal' : 'test';
    setFilter(newFilter);
    
    startTransition(() => {
      const newItems = generateItems(newFilter);
      setItems(newItems);
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    
    // Use transition for expensive filtering
    startTransition(() => {
      const newItems = generateItems(newFilter);
      setItems(newItems);
    });
  };

  // Update deferred items when deferred filter changes
  React.useEffect(() => {
    const newItems = generateItems(deferredFilter);
    setDeferredItems(newItems);
  }, [deferredFilter]);

  const clearAll = () => {
    setFilter('');
    setItems([]);
    setDeferredItems([]);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          10. useTransition Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Marks state updates as non-urgent, keeping the UI responsive during expensive operations.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Button onClick={handleUrgentUpdate} variant="contained" size="small">
            Urgent Update
          </Button>
          <Button onClick={handleNormalUpdate} variant="outlined" size="small">
            Normal Update
          </Button>
          <Button onClick={clearAll} variant="outlined" size="small">
            Clear All
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Filter Items (with useTransition)"
            value={filter}
            onChange={handleFilterChange}
            size="small"
            fullWidth
            InputProps={{
              endAdornment: isPending && <CircularProgress size={20} />
            }}
          />
          {isPending && (
            <Chip 
              label="Filtering in progress..." 
              size="small" 
              color="primary" 
              sx={{ mt: 1 }}
            />
          )}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              With useTransition ({items.length} items)
            </Typography>
            <Box sx={{ 
              maxHeight: 200, 
              overflow: 'auto', 
              border: 1, 
              borderColor: 'divider', 
              borderRadius: 1,
              p: 1
            }}>
              {items.slice(0, 20).map((item, index) => (
                <Typography key={index} variant="caption" component="div">
                  {item}
                </Typography>
              ))}
              {items.length > 20 && (
                <Typography variant="caption" color="text.secondary">
                  ... and {items.length - 20} more items
                </Typography>
              )}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              With useDeferredValue ({deferredItems.length} items)
            </Typography>
            <Box sx={{ 
              maxHeight: 200, 
              overflow: 'auto', 
              border: 1, 
              borderColor: 'divider', 
              borderRadius: 1,
              p: 1
            }}>
              {deferredItems.slice(0, 20).map((item, index) => (
                <Typography key={index} variant="caption" component="div">
                  {item}
                </Typography>
              ))}
              {deferredItems.length > 20 && (
                <Typography variant="caption" color="text.secondary">
                  ... and {deferredItems.length - 20} more items
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">How useTransition works:</Typography>
          <ul>
            <li><strong>Non-urgent updates:</strong> Wrapped in startTransition() are interruptible</li>
            <li><strong>Pending state:</strong> isPending indicates when transition is active</li>
            <li><strong>Responsive UI:</strong> Urgent updates (like user input) take priority</li>
            <li><strong>No blocking:</strong> Expensive operations don't freeze the interface</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>🚀 Performance Benefits</Typography>
          <Typography variant="caption">
            useTransition helps maintain 60fps by allowing React to interrupt non-urgent updates 
            when urgent updates (like typing) occur. The UI stays responsive even during heavy computations.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UseTransitionDemo;
