import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseDeferredValueDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseDeferredValuePage: React.FC = () => {
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
          useDeferredValue Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useDeferredValue hook lets you defer updating a part of the UI.
          It accepts a value and returns a new copy of the value that will defer to more urgent updates.
        </Typography>
        
        <UseDeferredValueDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Deferred Updates:</strong> Lower priority updates for expensive rendering</li>
            <li><strong>Stale Content:</strong> Show old content while new content loads</li>
            <li><strong>Automatic Scheduling:</strong> React decides when to update</li>
            <li><strong>Search Results:</strong> Perfect for filtering large lists</li>
            <li><strong>Background Work:</strong> Keep UI responsive during heavy computation</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseDeferredValuePage;
