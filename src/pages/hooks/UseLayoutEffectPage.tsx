import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseLayoutEffectDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseLayoutEffectPage: React.FC = () => {
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
          useLayoutEffect Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useLayoutEffect hook is identical to useEffect, but it fires synchronously after all DOM mutations.
          Use this to read layout from the DOM and synchronously re-render.
        </Typography>
        
        <UseLayoutEffectDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Synchronous Execution:</strong> Runs before browser paint</li>
            <li><strong>DOM Measurements:</strong> Read layout information from the DOM</li>
            <li><strong>Prevent Flickering:</strong> Avoid visual inconsistencies</li>
            <li><strong>Performance Impact:</strong> Can block painting if not used carefully</li>
            <li><strong>Use Cases:</strong> Tooltips, modals, measuring elements</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseLayoutEffectPage;
