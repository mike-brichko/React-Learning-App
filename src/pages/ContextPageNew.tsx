import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Container,
  Paper,
  Alert,
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ContextPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        React Context API Learning Hub
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Master React Context API by exploring both the right way and wrong way to implement it. 
        Learn through practical examples and understand the performance implications of different patterns.
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          📚 Learning Approach
        </Typography>
        <Typography variant="body2">
          We believe in learning by comparison. See what happens when Context is implemented poorly, 
          then learn the correct patterns and best practices. Both approaches are essential for 
          becoming a Context API expert!
        </Typography>
      </Alert>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Poor Context Usage Card */}
        <Card 
          sx={{ 
            border: 2, 
            borderColor: 'error.main',
            '&:hover': { boxShadow: 6 }
          }}
        >
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Error color="error" sx={{ mr: 1 }} />
              <Typography variant="h5" color="error">
                Poor Context Usage
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
              Learn what NOT to do! See common anti-patterns that cause performance issues, 
              maintenance nightmares, and excessive re-renders. Perfect for understanding 
              the pitfalls to avoid.
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                🚨 What You'll See:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.875rem' }}>
                <li>Massive single context with everything</li>
                <li>Object recreation causing excessive re-renders</li>
                <li>Heavy computations in providers</li>
                <li>Missing dependency arrays</li>
                <li>Poor error handling</li>
              </ul>
            </Box>

            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => navigate('/poor-context')}
              sx={{ mt: 'auto' }}
            >
              See Anti-Patterns
            </Button>
          </CardContent>
        </Card>

        {/* Good Context Usage Card */}
        <Card 
          sx={{ 
            border: 2, 
            borderColor: 'success.main',
            '&:hover': { boxShadow: 6 }
          }}
        >
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle color="success" sx={{ mr: 1 }} />
              <Typography variant="h5" color="success.main">
                Good Context Usage
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
              Master the right way! Explore best practices, performance optimizations, 
              and proper separation of concerns. Learn patterns used in production 
              applications.
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                ✅ What You'll Learn:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.875rem' }}>
                <li>Focused, single-responsibility contexts</li>
                <li>Memoization and performance optimization</li>
                <li>Proper error handling and validation</li>
                <li>Provider composition patterns</li>
                <li>TypeScript integration</li>
              </ul>
            </Box>

            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => navigate('/good-context')}
              sx={{ mt: 'auto' }}
            >
              Learn Best Practices
            </Button>
          </CardContent>
        </Card>
      </Box>

      <Paper sx={{ p: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Context API Mastery Path
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
            mt: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1" color="error" gutterBottom>
              1. Identify Problems
            </Typography>
            <Typography variant="body2">
              Start with the poor examples to understand what causes performance 
              issues and maintenance problems.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color="warning.main" gutterBottom>
              2. Learn Solutions
            </Typography>
            <Typography variant="body2">
              Explore the good examples to see how proper patterns solve 
              the problems from step 1.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color="success.main" gutterBottom>
              3. Apply Knowledge
            </Typography>
            <Typography variant="body2">
              Practice implementing these patterns in your own projects 
              with confidence.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 3, bgcolor: 'info.main', color: 'info.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          💡 Context API Quick Reference
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              When to Use Context:
            </Typography>
            <ul>
              <li>Theme and UI preferences</li>
              <li>User authentication state</li>
              <li>Localization/internationalization</li>
              <li>Feature flags and app configuration</li>
              <li>Shopping cart or user preferences</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              When NOT to Use Context:
            </Typography>
            <ul>
              <li>Frequently changing data (like form inputs)</li>
              <li>Large, complex application state</li>
              <li>Data that needs time-travel debugging</li>
              <li>State that requires complex middleware</li>
              <li>Performance-critical frequent updates</li>
            </ul>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContextPage;
