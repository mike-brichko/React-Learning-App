import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseMemoDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseMemoPage: React.FC = () => {
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
          useMemo Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useMemo hook lets you cache the result of a calculation between re-renders.
          It only recalculates the memoized value when one of the dependencies has changed.
        </Typography>
        
        <UseMemoDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Memoization:</strong> Cache expensive calculations</li>
            <li><strong>Dependencies:</strong> Array of values that trigger recalculation</li>
            <li><strong>Performance:</strong> Avoid unnecessary expensive operations</li>
            <li><strong>Reference Equality:</strong> Prevents unnecessary re-renders of child components</li>
            <li><strong>Memory Trade-off:</strong> Uses memory to save computation time</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseMemoPage;
