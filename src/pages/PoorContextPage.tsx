import React from 'react';
import {
  Typography,
  Container,
  Paper,
  Box,
  Alert,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Error, NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ContextNavigation from '../components/ContextNavigation';

const antiPatterns = [
  {
    title: 'Massive Context',
    description: 'Putting everything into a single context causing unnecessary re-renders.',
    path: '/context-antipatterns/massive-context',
    problems: ['Single Responsibility Violation', 'Unnecessary Re-renders', 'Tight Coupling'],
  },
  {
    title: 'Object Recreation',
    description: 'Creating new objects on every render causing all consumers to re-render.',
    path: '/context-antipatterns/object-recreation',
    problems: ['New Objects Every Render', 'Performance Degradation', 'Computed Values Recalculated'],
  },
  {
    title: 'Missing Dependencies',
    description: 'useEffect without proper dependency arrays causing infinite loops.',
    path: '/context-antipatterns/missing-dependencies',
    problems: ['Infinite Re-renders', 'Excessive API Calls', 'State Update Loops'],
  },
  {
    title: 'Heavy Computations',
    description: 'Expensive operations directly in providers blocking the UI.',
    path: '/context-antipatterns/heavy-computations',
    problems: ['Blocking Computations', 'UI Freezing', 'Wasted CPU Cycles'],
  },
];

const PoorContextPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <ContextNavigation currentPage="poor-context" />
      
      <Typography variant="h4" gutterBottom color="error">
        ❌ Context API Anti-Patterns
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Learn what NOT to do with React Context API. Explore common anti-patterns 
        and mistakes that lead to performance issues and maintenance problems.
      </Typography>

      <Alert severity="warning" sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          🚨 Warning: Performance Nightmares Ahead!
        </Typography>
        <Typography variant="body2">
          The examples in these sections intentionally demonstrate poor practices. 
          Open your browser's developer console to see the excessive re-rendering 
          and performance issues caused by these anti-patterns.
        </Typography>
      </Alert>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
        }}
      >
        {antiPatterns.map((pattern, index) => (
          <Card 
            key={index}
            sx={{ 
              height: '100%',
              border: 2, 
              borderColor: 'error.main',
              '&:hover': { boxShadow: 6 },
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Error color="error" sx={{ mr: 1 }} />
                <Typography variant="h6" color="error">
                  {pattern.title}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                {pattern.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom color="error">
                  🚨 Issues Demonstrated:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {pattern.problems.map((problem, idx) => (
                    <Box 
                      key={idx}
                      sx={{ 
                        fontSize: '0.75rem', 
                        bgcolor: 'error.main', 
                        color: 'error.contrastText',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {problem}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="error"
                fullWidth
                endIcon={<NavigateNext />}
                onClick={() => navigate(pattern.path)}
                sx={{ mt: 'auto' }}
              >
                Explore Anti-Pattern
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Paper sx={{ p: 3, mt: 4, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Learning Objectives
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom color="error">
              Identify Problems:
            </Typography>
            <ul>
              <li>Recognize performance anti-patterns</li>
              <li>Understand the root causes of issues</li>
              <li>See the impact on user experience</li>
              <li>Learn debugging techniques</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom color="warning.main">
              Understand Impact:
            </Typography>
            <ul>
              <li>Excessive re-renders and performance degradation</li>
              <li>Memory leaks and infinite loops</li>
              <li>Poor maintainability and code quality</li>
              <li>Bad user experience and UI freezing</li>
            </ul>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 2, bgcolor: 'info.main', color: 'info.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          💡 How to Use These Examples
        </Typography>
        <ol>
          <li><strong>Open Developer Tools:</strong> Watch the console for re-render logs</li>
          <li><strong>Monitor Performance:</strong> Use React DevTools Profiler</li>
          <li><strong>Interact with Examples:</strong> Click buttons to trigger the issues</li>
          <li><strong>Compare with Solutions:</strong> Visit the Good Context Usage examples</li>
        </ol>
      </Paper>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          📚 Ready to See the Right Way?
        </Typography>
        <Typography variant="body2">
          After exploring these anti-patterns, visit the{' '}
          <Button 
            variant="text" 
            size="small" 
            onClick={() => navigate('/good-context')}
            sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
          >
            Good Context API Usage
          </Button>{' '}
          page to see how to implement Context properly with performance optimizations 
          and best practices!
        </Typography>
      </Alert>
    </Container>
  );
};

export default PoorContextPage;
