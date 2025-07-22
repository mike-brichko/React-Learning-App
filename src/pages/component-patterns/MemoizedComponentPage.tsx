import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { MemoizedComponentDemo } from '../../components/component-patterns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MemoizedComponentPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Button
          component={Link}
          to="/components"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Back to All Components
        </Button>
        
        <Typography variant="h3" component="h1" gutterBottom>
          Memoized Components
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Performance optimization using React.memo and useMemo to prevent unnecessary re-renders and calculations.
          Memoization techniques help optimize React applications by reducing computational overhead.
        </Typography>
        
        <MemoizedComponentDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>React.memo:</strong> Higher-order component for memoizing component renders</li>
            <li><strong>Shallow Comparison:</strong> Props are compared using Object.is()</li>
            <li><strong>useMemo Hook:</strong> Memoize expensive calculations within components</li>
            <li><strong>Dependencies:</strong> Re-render only when specified dependencies change</li>
            <li><strong>Performance Trade-offs:</strong> Memory usage vs computational savings</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default MemoizedComponentPage;
