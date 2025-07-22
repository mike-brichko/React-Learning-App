import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseIdDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseIdPage: React.FC = () => {
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
          useId Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useId hook generates stable, unique IDs that are consistent across the server and client.
          It's particularly useful for accessibility attributes and form element associations.
        </Typography>
        
        <UseIdDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Unique IDs:</strong> Generate unique identifiers for HTML elements</li>
            <li><strong>SSR Safe:</strong> IDs match between server and client</li>
            <li><strong>Accessibility:</strong> Proper form labeling and ARIA attributes</li>
            <li><strong>Stable:</strong> IDs remain consistent across re-renders</li>
            <li><strong>Not for Keys:</strong> Don't use for React list keys</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseIdPage;
