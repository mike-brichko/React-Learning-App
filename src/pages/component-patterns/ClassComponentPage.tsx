import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ClassComponentDemo } from '../../components/component-patterns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ClassComponentPage: React.FC = () => {
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
          Class Components
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Traditional React components using ES6 class syntax with lifecycle methods and state management.
          While function components are preferred, class components are still important for error boundaries and legacy code.
        </Typography>
        
        <ClassComponentDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Class Syntax:</strong> ES6 classes extending React.Component</li>
            <li><strong>Lifecycle Methods:</strong> componentDidMount, componentDidUpdate, etc.</li>
            <li><strong>State Management:</strong> this.state and this.setState</li>
            <li><strong>Method Binding:</strong> Arrow functions for automatic binding</li>
            <li><strong>Error Boundaries:</strong> Only available in class components</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default ClassComponentPage;
