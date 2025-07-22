import React, { useState, useDeferredValue, useMemo, useTransition } from 'react';
import { Typography, Box, Card, CardContent, TextField, Chip, Slider } from '@mui/material';

// Heavy computation component
const ExpensiveList: React.FC<{ filter: string; items: number }> = ({ filter, items }) => {
  const filteredItems = useMemo(() => {
    console.log('🔄 Filtering items...', { filter, items });
    const result = [];
    for (let i = 0; i < items; i++) {
      const item = `Item ${i} - ${Math.random().toString(36).substring(7)}`;
      if (!filter || item.toLowerCase().includes(filter.toLowerCase())) {
        result.push(item);
      }
    }
    return result;
  }, [filter, items]);

  return (
    <Box sx={{ 
      maxHeight: 200, 
      overflow: 'auto', 
      border: 1, 
      borderColor: 'divider', 
      borderRadius: 1,
      p: 1
    }}>
      {filteredItems.slice(0, 50).map((item, index) => (
        <Typography key={index} variant="caption" component="div">
          {item}
        </Typography>
      ))}
      {filteredItems.length > 50 && (
        <Typography variant="caption" color="text.secondary">
          ... and {filteredItems.length - 50} more items (Total: {filteredItems.length})
        </Typography>
      )}
    </Box>
  );
};

const UseDeferredValueDemo: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [itemCount, setItemCount] = useState(1000);
  const [isPending, startTransition] = useTransition();
  
  // Deferred values - these update with lower priority
  const deferredFilter = useDeferredValue(filter);
  const deferredItemCount = useDeferredValue(itemCount);
  
  // Check if values are deferred (stale)
  const isStale = filter !== deferredFilter || itemCount !== deferredItemCount;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleItemCountChange = (_: Event, value: number | number[]) => {
    startTransition(() => {
      setItemCount(value as number);
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          11. useDeferredValue Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Defers updates to a value, showing stale content while fresh content is loading in the background.
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Filter (immediate update)"
            value={filter}
            onChange={handleFilterChange}
            size="small"
            fullWidth
            placeholder="Type to filter..."
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Item Count: {itemCount}
          </Typography>
          <Slider
            value={itemCount}
            onChange={handleItemCountChange}
            min={100}
            max={5000}
            step={100}
            marks={[
              { value: 100, label: '100' },
              { value: 1000, label: '1K' },
              { value: 2500, label: '2.5K' },
              { value: 5000, label: '5K' }
            ]}
            valueLabelDisplay="auto"
          />
        </Box>

        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {isStale && (
            <Chip 
              label="Showing stale content" 
              size="small" 
              color="warning" 
              variant="outlined"
            />
          )}
          {isPending && (
            <Chip 
              label="Update in progress" 
              size="small" 
              color="primary"
            />
          )}
          <Chip 
            label={`Filter: "${filter}"`} 
            size="small" 
            color="info"
            variant="outlined"
          />
          <Chip 
            label={`Deferred: "${deferredFilter}"`} 
            size="small" 
            color={isStale ? "warning" : "success"}
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Current Values (immediate)
            </Typography>
            <Typography variant="caption" component="div">
              Filter: "{filter}"
            </Typography>
            <Typography variant="caption" component="div">
              Count: {itemCount}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Deferred Values (background)
            </Typography>
            <Typography variant="caption" component="div">
              Filter: "{deferredFilter}"
            </Typography>
            <Typography variant="caption" component="div">
              Count: {deferredItemCount}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Expensive List (using deferred values)
          </Typography>
          <ExpensiveList filter={deferredFilter} items={deferredItemCount} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">How useDeferredValue works:</Typography>
          <ul>
            <li><strong>Delayed updates:</strong> Deferred value updates after urgent ones complete</li>
            <li><strong>Stale content:</strong> Shows old content while new content renders</li>
            <li><strong>Automatic:</strong> React decides when to update based on priority</li>
            <li><strong>Non-blocking:</strong> User interactions remain responsive</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>🎯 Best Practices</Typography>
          <Typography variant="caption">
            Use useDeferredValue for expensive rendering that depends on frequently changing values.
            Great for search results, filtering large lists, or complex visualizations.
            The UI stays responsive to user input while heavy computations happen in the background.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UseDeferredValueDemo;
