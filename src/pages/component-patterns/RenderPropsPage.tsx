import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { RenderPropsDemo } from '../../components/component-patterns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RenderPropsPage: React.FC = () => {
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
          Render Props Pattern
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          A technique for sharing code between components using a prop whose value is a function.
          The function receives data or state and returns React nodes to render, enabling flexible component composition.
        </Typography>
        
        <RenderPropsDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Function as Prop:</strong> Pass functions as children or render props</li>
            <li><strong>Data Injection:</strong> Provide state or computed values to the function</li>
            <li><strong>Flexible Rendering:</strong> Consumer decides how to render the data</li>
            <li><strong>Logic Separation:</strong> Separate data logic from presentation</li>
            <li><strong>Reusability:</strong> Same logic with different UI implementations</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default RenderPropsPage;
