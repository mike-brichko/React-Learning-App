import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseImperativeHandleDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseImperativeHandlePage: React.FC = () => {
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
          useImperativeHandle Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useImperativeHandle hook customizes the instance value that is exposed to parent components when using ref.
          It should be used with forwardRef and is rarely needed in most applications.
        </Typography>
        
        <UseImperativeHandleDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Imperative API:</strong> Expose specific methods to parent components</li>
            <li><strong>forwardRef:</strong> Must be used together with React.forwardRef</li>
            <li><strong>Custom Interface:</strong> Define what the parent can access</li>
            <li><strong>Encapsulation:</strong> Hide internal implementation details</li>
            <li><strong>Rare Usage:</strong> Most cases should use props and callbacks instead</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseImperativeHandlePage;
