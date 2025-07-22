import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, TextField, Alert } from '@mui/material';

const UseEffectDemo: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [windowTitle, setWindowTitle] = useState('useEffect Demo');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Document title effect
  useEffect(() => {
    const originalTitle = document.title;
    document.title = windowTitle;
    
    return () => {
      document.title = originalTitle;
    };
  }, [windowTitle]);

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
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
        
        <Box sx={{ mb: 2 }}>
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
        </Box>

        <Alert severity="success">
          Mouse Position: ({mousePosition.x}, {mousePosition.y})
        </Alert>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">useEffect Examples:</Typography>
          <ul>
            <li><strong>Timer:</strong> Runs every second, cleans up on unmount</li>
            <li><strong>Document Title:</strong> Updates when input changes</li>
            <li><strong>Mouse Tracking:</strong> Global event listener with cleanup</li>
          </ul>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UseEffectDemo;
