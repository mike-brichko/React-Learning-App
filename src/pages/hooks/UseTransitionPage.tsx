import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseTransitionDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseTransitionPage: React.FC = () => {
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
          useTransition Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useTransition hook lets you update the state without blocking the UI.
          It marks state updates as non-urgent, allowing React to keep the interface responsive.
        </Typography>
        
        <UseTransitionDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Non-urgent Updates:</strong> Mark state updates as interruptible</li>
            <li><strong>Pending State:</strong> Track when transition is in progress</li>
            <li><strong>Concurrent Features:</strong> Keep UI responsive during heavy work</li>
            <li><strong>Priority System:</strong> Urgent updates take precedence</li>
            <li><strong>Performance:</strong> Maintain 60fps during expensive operations</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseTransitionPage;
