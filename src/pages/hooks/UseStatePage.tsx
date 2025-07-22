import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseStateDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseStatePage: React.FC = () => {
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
          useState Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useState hook is the most fundamental React hook for managing local component state.
          It allows functional components to have state variables that persist between re-renders.
        </Typography>
        
        <UseStateDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>State Variable:</strong> The current state value</li>
            <li><strong>Setter Function:</strong> Function to update the state</li>
            <li><strong>Initial State:</strong> The initial value when component mounts</li>
            <li><strong>Functional Updates:</strong> Use previous state to calculate new state</li>
            <li><strong>Lazy Initial State:</strong> Pass a function for expensive initialization</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseStatePage;
