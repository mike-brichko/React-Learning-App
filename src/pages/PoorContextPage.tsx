import React from 'react';
import {
  Typography,
  Container,
  Paper,
  Box,
  Alert,
  Chip,
} from '@mui/material';
import PoorContextExample from '../components/PoorContextExample';

const PoorContextPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom color="error">
        ❌ Poor Context API Usage
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Learn what NOT to do with React Context API. This page demonstrates common anti-patterns 
        and mistakes that lead to performance issues and maintenance problems.
      </Typography>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          🚨 Warning: Performance Nightmare Ahead!
        </Typography>
        <Typography variant="body2">
          The examples below intentionally demonstrate poor practices. Open your browser's 
          developer console to see the excessive re-rendering caused by these anti-patterns.
        </Typography>
      </Alert>

      <Paper sx={{ p: 3, mb: 3, bgcolor: 'error.main', color: 'error.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Anti-Patterns Demonstrated
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip 
            label="Massive Single Context" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Object Recreation" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Heavy Computations" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Missing Dependencies" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Unnecessary Re-renders" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Poor Error Handling" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
        </Box>
      </Paper>

      {/* The Poor Context Example */}
      <PoorContextExample />

      <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          🔍 What Makes This Bad?
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom color="error">
              Performance Issues:
            </Typography>
            <ul>
              <li><strong>Excessive Re-renders:</strong> All components re-render when any context value changes</li>
              <li><strong>Heavy Computations:</strong> Expensive calculations run on every render</li>
              <li><strong>Memory Leaks:</strong> useEffect without proper cleanup</li>
              <li><strong>Object Recreation:</strong> New objects created constantly</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom color="error">
              Maintainability Issues:
            </Typography>
            <ul>
              <li><strong>God Object:</strong> Single context handling everything</li>
              <li><strong>Tight Coupling:</strong> Components depend on unrelated data</li>
              <li><strong>Poor Separation:</strong> No logical grouping of concerns</li>
              <li><strong>Hard to Test:</strong> Complex dependencies make testing difficult</li>
            </ul>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 2, bgcolor: 'info.main', color: 'info.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          💡 Key Takeaways
        </Typography>
        <ul>
          <li>Context is not a replacement for all state management</li>
          <li>Avoid putting unrelated data in the same context</li>
          <li>Always memoize context values to prevent unnecessary re-renders</li>
          <li>Use multiple smaller contexts instead of one large context</li>
          <li>Consider when state actually needs to be global</li>
          <li>Implement proper error boundaries and validation</li>
        </ul>
      </Paper>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          📚 Ready to See the Right Way?
        </Typography>
        <Typography variant="body2">
          Visit the <strong>Good Context API Usage</strong> page to see how to implement 
          Context properly with performance optimizations and best practices!
        </Typography>
      </Alert>
    </Container>
  );
};

export default PoorContextPage;
