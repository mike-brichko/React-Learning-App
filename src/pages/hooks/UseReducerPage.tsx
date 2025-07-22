import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseReducerDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseReducerPage: React.FC = () => {
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
          useReducer Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useReducer hook is usually preferable to useState when you have complex state logic
          that involves multiple sub-values or when the next state depends on the previous one.
        </Typography>
        
        <UseReducerDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Reducer Function:</strong> Pure function that takes state and action</li>
            <li><strong>Actions:</strong> Objects that describe what happened</li>
            <li><strong>Dispatch:</strong> Function to send actions to the reducer</li>
            <li><strong>Initial State:</strong> The starting state value</li>
            <li><strong>Complex Logic:</strong> Better than useState for complex state updates</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseReducerPage;
