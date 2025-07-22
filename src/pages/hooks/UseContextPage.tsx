import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseContextDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseContextPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Button
          component={Link}
          to="/hooks"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Back to All Hooks
        </Button>
        
        <Typography variant="h3" component="h1" gutterBottom>
          useContext Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useContext hook lets you read context and subscribe to its changes.
          It provides a way to pass data through the component tree without having to pass props manually at every level.
        </Typography>
        
        <UseContextDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Context Creation:</strong> Use createContext to define a context</li>
            <li><strong>Provider:</strong> Wrap components that need the context value</li>
            <li><strong>Consumer:</strong> Use useContext to read the context value</li>
            <li><strong>Default Values:</strong> Fallback values when no provider is found</li>
            <li><strong>Performance:</strong> Components re-render when context value changes</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseContextPage;
