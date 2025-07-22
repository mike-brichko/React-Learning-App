import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseEffectDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseEffectPage: React.FC = () => {
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
          useEffect Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useEffect hook lets you perform side effects in functional components.
          It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
        </Typography>
        
        <UseEffectDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Side Effects:</strong> Data fetching, subscriptions, DOM manipulation</li>
            <li><strong>Dependencies Array:</strong> Controls when effect runs</li>
            <li><strong>Cleanup Function:</strong> Prevents memory leaks and cancels subscriptions</li>
            <li><strong>Effect Timing:</strong> Runs after render is committed to screen</li>
            <li><strong>Multiple Effects:</strong> Separate concerns with different effects</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseEffectPage;
