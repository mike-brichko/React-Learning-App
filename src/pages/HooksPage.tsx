import React from 'react';
import { Typography, Box, Container, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface HookInfo {
  title: string;
  description: string;
  path: string;
  category: 'Basic' | 'Advanced' | 'Performance' | 'Concurrent' | 'Utility' | 'Custom';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const hooks: HookInfo[] = [
  {
    title: 'useState',
    description: 'Manage local component state with reactive updates',
    path: '/hooks/use-state',
    category: 'Basic',
    difficulty: 'Beginner'
  },
  {
    title: 'useEffect',
    description: 'Perform side effects and manage component lifecycle',
    path: '/hooks/use-effect',
    category: 'Basic',
    difficulty: 'Beginner'
  },
  {
    title: 'useContext',
    description: 'Access React context values without nesting',
    path: '/hooks/use-context',
    category: 'Basic',
    difficulty: 'Intermediate'
  },
  {
    title: 'useReducer',
    description: 'Manage complex state logic with reducer pattern',
    path: '/hooks/use-reducer',
    category: 'Advanced',
    difficulty: 'Intermediate'
  },
  {
    title: 'useMemo',
    description: 'Cache expensive calculations between re-renders',
    path: '/hooks/use-memo',
    category: 'Performance',
    difficulty: 'Intermediate'
  },
  {
    title: 'useCallback',
    description: 'Memoize function references for performance optimization',
    path: '/hooks/use-callback',
    category: 'Performance',
    difficulty: 'Intermediate'
  },
  {
    title: 'useRef',
    description: 'Reference values and DOM elements without re-rendering',
    path: '/hooks/use-ref',
    category: 'Utility',
    difficulty: 'Beginner'
  },
  {
    title: 'useImperativeHandle',
    description: 'Customize the instance value exposed by refs',
    path: '/hooks/use-imperative-handle',
    category: 'Advanced',
    difficulty: 'Advanced'
  },
  {
    title: 'useLayoutEffect',
    description: 'Synchronously perform side effects before paint',
    path: '/hooks/use-layout-effect',
    category: 'Advanced',
    difficulty: 'Advanced'
  },
  {
    title: 'useTransition',
    description: 'Mark state updates as non-urgent for better UX',
    path: '/hooks/use-transition',
    category: 'Concurrent',
    difficulty: 'Advanced'
  },
  {
    title: 'useDeferredValue',
    description: 'Defer expensive updates to keep UI responsive',
    path: '/hooks/use-deferred-value',
    category: 'Concurrent',
    difficulty: 'Advanced'
  },
  {
    title: 'useId',
    description: 'Generate unique IDs for accessibility attributes',
    path: '/hooks/use-id',
    category: 'Utility',
    difficulty: 'Beginner'
  },
  {
    title: 'useSyncExternalStore',
    description: 'Subscribe to external data sources safely',
    path: '/hooks/use-sync-external-store',
    category: 'Advanced',
    difficulty: 'Advanced'
  },
  {
    title: 'Custom Hooks',
    description: 'Create reusable stateful logic with custom hooks',
    path: '/hooks/custom-hooks',
    category: 'Custom',
    difficulty: 'Intermediate'
  }
];

const getCategoryColor = (category: HookInfo['category']) => {
  switch (category) {
    case 'Basic': return 'primary';
    case 'Advanced': return 'secondary';
    case 'Performance': return 'success';
    case 'Concurrent': return 'warning';
    case 'Utility': return 'info';
    case 'Custom': return 'error';
    default: return 'default';
  }
};

const getDifficultyColor = (difficulty: HookInfo['difficulty']) => {
  switch (difficulty) {
    case 'Beginner': return 'success';
    case 'Intermediate': return 'warning';
    case 'Advanced': return 'error';
    default: return 'default';
  }
};

const HooksPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React Hooks
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Comprehensive demonstrations of all React hooks with interactive examples.
          Click on any hook card to explore detailed examples and explanations.
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gap: 3, 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)' 
          },
          mt: 4
        }}>
          {hooks.map((hook) => (
            <Card key={hook.path} sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {hook.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label={hook.category} 
                      size="small" 
                      color={getCategoryColor(hook.category) as any}
                      variant="outlined"
                    />
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {hook.description}
                </Typography>
                
                <Chip 
                  label={hook.difficulty} 
                  size="small" 
                  color={getDifficultyColor(hook.difficulty) as any}
                  sx={{ mt: 1 }}
                />
              </CardContent>
              
              <CardActions sx={{ pt: 0 }}>
                <Button
                  component={Link}
                  to={hook.path}
                  endIcon={<ArrowForwardIcon />}
                  fullWidth
                  variant="contained"
                >
                  Explore {hook.title}
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
        
        <Box sx={{ mt: 6, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Learning Path Recommendations
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Beginners:</strong> Start with useState, useEffect, and useRef to understand the fundamentals.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Intermediate:</strong> Move on to useContext, useReducer, and performance hooks (useMemo, useCallback).
          </Typography>
          <Typography variant="body2">
            <strong>Advanced:</strong> Explore concurrent features (useTransition, useDeferredValue) and specialized hooks.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HooksPage;
