import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FunctionComponentDemo } from '../../components/component-patterns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FunctionComponentPage: React.FC = () => {
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
          Function Components
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Modern React components using functional syntax with props and hooks for state management.
          Function components are the preferred way to write React components in modern applications.
        </Typography>
        
        <FunctionComponentDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Functional Syntax:</strong> Simple JavaScript functions that return JSX</li>
            <li><strong>Props Interface:</strong> TypeScript interfaces for type-safe props</li>
            <li><strong>Hook Integration:</strong> Use useState, useEffect, and other hooks</li>
            <li><strong>Performance:</strong> Better optimization and tree-shaking</li>
            <li><strong>Testing:</strong> Easier to test as pure functions</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default FunctionComponentPage;
