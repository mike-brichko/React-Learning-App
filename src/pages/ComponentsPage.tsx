import React from 'react';
import { Typography, Box, Container, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ComponentPatternInfo {
  title: string;
  description: string;
  path: string;
  category: 'Basic' | 'Advanced' | 'Performance' | 'Patterns' | 'Legacy';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const componentPatterns: ComponentPatternInfo[] = [
  {
    title: 'Function Components',
    description: 'Modern React components using functional syntax with hooks',
    path: '/components/function-component',
    category: 'Basic',
    difficulty: 'Beginner'
  },
  {
    title: 'Class Components',
    description: 'Traditional React components with lifecycle methods and state',
    path: '/components/class-component',
    category: 'Legacy',
    difficulty: 'Intermediate'
  },
  {
    title: 'Higher-Order Components',
    description: 'Functions that enhance components with additional functionality',
    path: '/components/higher-order-component',
    category: 'Patterns',
    difficulty: 'Advanced'
  },
  {
    title: 'Render Props',
    description: 'Share code between components using function as children',
    path: '/components/render-props',
    category: 'Patterns',
    difficulty: 'Advanced'
  },
  {
    title: 'Compound Components',
    description: 'Flexible components with implicit state sharing via context',
    path: '/components/compound-component',
    category: 'Patterns',
    difficulty: 'Advanced'
  },
  {
    title: 'Memoized Components',
    description: 'Performance optimization using React.memo and useMemo',
    path: '/components/memoized-component',
    category: 'Performance',
    difficulty: 'Intermediate'
  },
  {
    title: 'Forward Ref',
    description: 'Pass refs through component hierarchies for DOM access',
    path: '/components/forward-ref',
    category: 'Advanced',
    difficulty: 'Advanced'
  },
  {
    title: 'Error Boundaries',
    description: 'Catch JavaScript errors in component tree with fallback UI',
    path: '/components/error-boundary',
    category: 'Advanced',
    difficulty: 'Advanced'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Basic': return 'primary';
    case 'Legacy': return 'warning';
    case 'Patterns': return 'secondary';
    case 'Performance': return 'success';
    case 'Advanced': return 'info';
    default: return 'default';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'success';
    case 'Intermediate': return 'warning';
    case 'Advanced': return 'error';
    default: return 'default';
  }
};

const ComponentsPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          React Component Patterns
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Explore different React component patterns and techniques. From basic function components 
          to advanced patterns like HOCs and render props, learn how to structure and organize your React components effectively.
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gap: 3, 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)' 
          } 
        }}>
          {componentPatterns.map((pattern) => (
            <Card 
              key={pattern.path} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {pattern.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label={pattern.category} 
                      size="small" 
                      color={getCategoryColor(pattern.category) as any}
                      variant="outlined"
                    />
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {pattern.description}
                </Typography>
                
                <Chip 
                  label={pattern.difficulty} 
                  size="small" 
                  color={getDifficultyColor(pattern.difficulty) as any}
                  sx={{ mt: 1 }}
                />
              </CardContent>
              
              <CardActions sx={{ pt: 0 }}>
                <Button
                  component={Link}
                  to={pattern.path}
                  endIcon={<ArrowForwardIcon />}
                  fullWidth
                  variant="contained"
                >
                  Explore {pattern.title}
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
            <strong>Beginners:</strong> Start with Function Components and understand the basics of props and state management.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Intermediate:</strong> Learn Class Components for legacy codebases, then explore Memoized Components for performance.
          </Typography>
          <Typography variant="body2">
            <strong>Advanced:</strong> Master component patterns like HOCs, Render Props, and Compound Components for flexible architectures.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ComponentsPage;
