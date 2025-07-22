import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseSyncExternalStoreDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UseSyncExternalStorePage: React.FC = () => {
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
          useSyncExternalStore Hook
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          The useSyncExternalStore hook lets you subscribe to an external store.
          It's designed for libraries that integrate with external data sources outside of React.
        </Typography>
        
        <UseSyncExternalStoreDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>External Stores:</strong> Subscribe to data sources outside React</li>
            <li><strong>Concurrent Safe:</strong> Prevents tearing during concurrent updates</li>
            <li><strong>Browser APIs:</strong> Window size, online status, etc.</li>
            <li><strong>Third-party Libraries:</strong> Redux, Zustand, custom stores</li>
            <li><strong>Server Snapshots:</strong> Handle server-side rendering properly</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default UseSyncExternalStorePage;
