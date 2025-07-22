import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import {
  UseStateDemo,
  UseEffectDemo,
  UseContextDemo,
  UseReducerDemo,
  UseMemoDemo,
  UseCallbackDemo,
  UseRefDemo,
  UseImperativeHandleDemo,
  UseLayoutEffectDemo,
  UseTransitionDemo,
  UseDeferredValueDemo,
  UseIdDemo,
  UseSyncExternalStoreDemo,
  CustomHooksDemo
} from '../components/hooks';

const HooksPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React Hooks
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Comprehensive demonstrations of all React hooks with interactive examples.
          Each hook is presented with practical use cases and educational explanations.
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gap: 3, 
          gridTemplateColumns: { 
            xs: '1fr', 
            lg: 'repeat(2, 1fr)' 
          } 
        }}>
          <UseStateDemo />
          <UseEffectDemo />
          <UseContextDemo />
          <UseReducerDemo />
          <UseMemoDemo />
          <UseCallbackDemo />
          <UseRefDemo />
          <UseImperativeHandleDemo />
          <UseLayoutEffectDemo />
          <UseTransitionDemo />
          <UseDeferredValueDemo />
          <UseIdDemo />
          
          <Box sx={{ gridColumn: { xs: '1', lg: '1 / -1' } }}>
            <UseSyncExternalStoreDemo />
          </Box>
          
          <Box sx={{ gridColumn: { xs: '1', lg: '1 / -1' } }}>
            <CustomHooksDemo />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HooksPage;
