import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ForwardRefDemo } from '../../components/component-patterns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForwardRefPage: React.FC = () => {
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
          Forward Ref Components
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Technique for passing refs through component hierarchies, enabling parent components to interact 
          directly with child component instances. Essential for focus management and imperative APIs.
        </Typography>
        
        <ForwardRefDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>React.forwardRef:</strong> HOC that forwards refs to child components</li>
            <li><strong>useImperativeHandle:</strong> Customize the ref interface exposed to parents</li>
            <li><strong>DOM Access:</strong> Direct access to DOM elements for focus/scroll</li>
            <li><strong>Imperative APIs:</strong> Expose methods for parent components to call</li>
            <li><strong>Third-party Integration:</strong> Bridge React with non-React libraries</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default ForwardRefPage;
