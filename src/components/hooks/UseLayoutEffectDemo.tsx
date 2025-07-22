import React, { useLayoutEffect, useState, useRef } from 'react';
import { Typography, Box, Card, CardContent, Button, Paper } from '@mui/material';

const UseLayoutEffectDemo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [measurements, setMeasurements] = useState<{ width: number; height: number } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect - runs synchronously after all DOM mutations
  useLayoutEffect(() => {
    const log = `useLayoutEffect: DOM updated at ${new Date().toLocaleTimeString()}`;
    setLogs(prev => [...prev, log]);

    if (elementRef.current && isVisible) {
      const rect = elementRef.current.getBoundingClientRect();
      setMeasurements({
        width: rect.width,
        height: rect.height
      });
      
      // Immediate DOM manipulation before paint
      elementRef.current.style.background = `linear-gradient(45deg, 
        hsl(${Math.random() * 360}, 70%, 80%), 
        hsl(${Math.random() * 360}, 70%, 60%))`;
    }
  }, [isVisible]);

  // Regular useEffect for comparison (commented out to avoid conflicts)
  // useEffect(() => {
  //   const log = `useEffect: Component updated at ${new Date().toLocaleTimeString()}`;
  //   setLogs(prev => [...prev, log]);
  // }, [isVisible]);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          9. useLayoutEffect Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Similar to useEffect, but fires synchronously after all DOM mutations and before the browser paints.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button onClick={handleToggle} variant="contained" size="small">
            {isVisible ? 'Hide' : 'Show'} Element
          </Button>
          <Button onClick={clearLogs} variant="outlined" size="small">
            Clear Logs
          </Button>
        </Box>

        {isVisible && (
          <Box sx={{ mb: 2 }}>
            <Paper
              ref={elementRef}
              sx={{
                p: 3,
                textAlign: 'center',
                minHeight: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                transition: 'all 0.3s ease'
              }}
            >
              <Typography variant="h6">
                🎨 Styled Element
              </Typography>
            </Paper>
            
            {measurements && (
              <Box sx={{ mt: 1, p: 1, bgcolor: 'success.light', borderRadius: 1 }}>
                <Typography variant="caption">
                  Measured dimensions: {measurements.width.toFixed(1)}px × {measurements.height.toFixed(1)}px
                </Typography>
              </Box>
            )}
          </Box>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Execution Log:</Typography>
          <Paper sx={{ p: 1, maxHeight: 150, overflow: 'auto', bgcolor: 'grey.100' }}>
            {logs.length === 0 ? (
              <Typography variant="caption" color="text.secondary">
                No logs yet. Toggle the element to see useLayoutEffect in action.
              </Typography>
            ) : (
              logs.map((log, index) => (
                <Typography key={index} variant="caption" component="div" sx={{ fontFamily: 'monospace' }}>
                  {log}
                </Typography>
              ))
            )}
          </Paper>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">useLayoutEffect vs useEffect:</Typography>
          <ul>
            <li><strong>Timing:</strong> useLayoutEffect runs before browser paint, useEffect runs after</li>
            <li><strong>Synchronous:</strong> useLayoutEffect blocks visual updates until complete</li>
            <li><strong>Use cases:</strong> DOM measurements, preventing flicker, immediate DOM updates</li>
            <li><strong>Performance:</strong> Can block painting if heavy computation is done</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>💡 When to use useLayoutEffect</Typography>
          <Typography variant="caption">
            Use when you need to read layout from the DOM and synchronously re-render. 
            Examples: tooltips, modals, measuring elements, preventing visual flickering.
            In most cases, useEffect is preferred for performance.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UseLayoutEffectDemo;
