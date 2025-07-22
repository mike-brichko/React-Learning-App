import React, { useContext, createContext, useState } from 'react';
import { Typography, Box, Card, CardContent, Button } from '@mui/material';

// Create context for this demo
interface ThemeContextType {
  color: string;
  toggleColor: () => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
}

const DemoThemeContext = createContext<ThemeContextType | null>(null);

// Provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [color, setColor] = useState('blue');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  const toggleColor = () => {
    setColor(prev => prev === 'blue' ? 'green' : prev === 'green' ? 'red' : 'blue');
  };

  return (
    <DemoThemeContext.Provider value={{ color, toggleColor, size, setSize }}>
      {children}
    </DemoThemeContext.Provider>
  );
};

// Consumer component
const ThemeConsumer: React.FC = () => {
  const context = useContext(DemoThemeContext);
  
  if (!context) {
    return <Typography>No theme context available</Typography>;
  }
  
  const { color, toggleColor, size, setSize } = context;
  
  return (
    <Box>
      <Box 
        sx={{ 
          p: 3, 
          mb: 2, 
          backgroundColor: color, 
          color: 'white',
          borderRadius: 1,
          fontSize: size === 'small' ? '0.875rem' : size === 'large' ? '1.25rem' : '1rem'
        }}
      >
        Current theme: {color} / {size}
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button onClick={toggleColor} variant="contained" size="small">
          Toggle Color
        </Button>
        <Button onClick={() => setSize('small')} variant="outlined" size="small">
          Small
        </Button>
        <Button onClick={() => setSize('medium')} variant="outlined" size="small">
          Medium
        </Button>
        <Button onClick={() => setSize('large')} variant="outlined" size="small">
          Large
        </Button>
      </Box>
    </Box>
  );
};

const UseContextDemo: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          3. useContext Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Consumes context values without nesting Consumer components.
        </Typography>
        
        <ThemeProvider>
          <ThemeConsumer />
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>How it works:</strong>
          </Typography>
          <ul>
            <li>Context created with createContext()</li>
            <li>Provider wraps components that need the context</li>
            <li>useContext() hook consumes the context value</li>
            <li>No need for render props or Consumer components</li>
          </ul>
        </ThemeProvider>
      </CardContent>
    </Card>
  );
};

export default UseContextDemo;
