import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseCallbackDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseCallbackPage: React.FC = () => {
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
          useCallback Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useCallback hook lets you cache a function definition between re-renders.
          It returns a memoized version of the callback that only changes if one of the dependencies has changed.
        </Typography>
        
        <UseCallbackDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Function Memoization:</strong> Cache function references between renders</li>
            <li><strong>Dependencies:</strong> Array that determines when to recreate the function</li>
            <li><strong>Child Optimization:</strong> Prevents unnecessary re-renders in child components</li>
            <li><strong>Event Handlers:</strong> Stable references for event handling functions</li>
            <li><strong>Performance:</strong> Reduces unnecessary function recreations</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseCallbackPage;
