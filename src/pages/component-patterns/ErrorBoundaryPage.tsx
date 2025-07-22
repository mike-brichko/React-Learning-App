import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ErrorBoundaryDemo } from '../../components/component-patterns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ErrorBoundaryPage: React.FC = () => {
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
          Error Boundary Components
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Class components that catch JavaScript errors anywhere in their component tree and display fallback UI.
          Error boundaries prevent entire application crashes and provide graceful error handling.
        </Typography>
        
        <ErrorBoundaryDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Error Catching:</strong> Catch errors in component tree during rendering</li>
            <li><strong>Fallback UI:</strong> Display alternative UI when errors occur</li>
            <li><strong>Error Logging:</strong> Log error details for debugging and monitoring</li>
            <li><strong>Recovery Mechanisms:</strong> Provide ways to recover from errors</li>
            <li><strong>Class-only Feature:</strong> Error boundaries must be class components</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorBoundaryPage;
