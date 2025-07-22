import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CustomHooksDemo } from '../../components/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CustomHooksPage: React.FC = () => {
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
          Custom Hooks
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Custom hooks are JavaScript functions whose names start with "use" and that may call other hooks.
          They let you extract component logic into reusable functions.
        </Typography>
        
        <CustomHooksDemo />
        
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Key Concepts:
          </Typography>
          <ul>
            <li><strong>Reusable Logic:</strong> Extract and share stateful logic between components</li>
            <li><strong>Naming Convention:</strong> Must start with "use" to follow hook rules</li>
            <li><strong>Composition:</strong> Combine multiple built-in hooks</li>
            <li><strong>Testability:</strong> Test hook logic independently from components</li>
            <li><strong>Separation of Concerns:</strong> Keep components focused on rendering</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default CustomHooksPage;
