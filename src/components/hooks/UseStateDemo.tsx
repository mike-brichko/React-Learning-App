import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, Button, Chip, TextField, Switch, FormControlLabel } from '@mui/material';

const UseStateDemo: React.FC = () => {
  const [basicCount, setBasicCount] = useState(0);
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  return (
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
        
        {isVisible && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
            <Typography>This content is conditionally rendered!</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UseStateDemo;
