import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseRefDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseRefPage: React.FC = () => {
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
          useRef Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useRef hook lets you reference a value that's not needed for rendering.
          It returns a mutable ref object whose .current property persists for the full lifetime of the component.
        </Typography>
        
        <UseRefDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>DOM References:</strong> Direct access to DOM elements</li>
            <li><strong>Mutable Values:</strong> Store values that don't trigger re-renders</li>
            <li><strong>Previous Values:</strong> Keep track of previous state or props</li>
            <li><strong>Timers & Intervals:</strong> Store timer IDs for cleanup</li>
            <li><strong>Focus Management:</strong> Programmatically focus elements</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseRefPage;
