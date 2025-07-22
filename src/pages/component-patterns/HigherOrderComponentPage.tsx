import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { HigherOrderComponentDemo } from '../../components/component-patterns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const HigherOrderComponentPage: React.FC = () => {
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
          Higher-Order Components (HOC)
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Functions that take a component and return a new component with additional functionality.
          HOCs are a pattern for reusing component logic and enhancing components with cross-cutting concerns.
        </Typography>
        
        <HigherOrderComponentDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Function Pattern:</strong> Functions that accept and return components</li>
            <li><strong>Props Enhancement:</strong> Add new props or modify existing ones</li>
            <li><strong>Logic Reuse:</strong> Share common functionality across components</li>
            <li><strong>Composition:</strong> Chain multiple HOCs for complex behavior</li>
            <li><strong>Naming Convention:</strong> Prefix with "with" (withAuth, withLoading)</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default HigherOrderComponentPage;
