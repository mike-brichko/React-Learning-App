import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CompoundComponentDemo } from '../../components/component-patterns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CompoundComponentPage: React.FC = () => {
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
          Compound Components
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Pattern for creating flexible, reusable components with implicit state sharing between parent and children.
          Components work together as a cohesive unit while maintaining individual responsibilities.
        </Typography>
        
        <CompoundComponentDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Parent-Child Coordination:</strong> Parent manages shared state via Context</li>
            <li><strong>Implicit Communication:</strong> Children automatically access parent state</li>
            <li><strong>Flexible Composition:</strong> Arrange components as needed</li>
            <li><strong>Clean API:</strong> Intuitive, HTML-like component structure</li>
            <li><strong>Encapsulation:</strong> Internal state management is hidden from consumers</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default CompoundComponentPage;
