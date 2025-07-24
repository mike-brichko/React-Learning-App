import React from 'react';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Chip,
  Paper,
  Button,
} from '@mui/material';
import {
  NavigateNext,
  NavigateBefore,
  Home,
  ErrorOutline,
  CheckCircle,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

interface ContextNavigationProps {
  currentPage: string;
  showNavigation?: boolean;
}

const contextPages = [
  {
    path: '/context',
    title: 'Context Hub',
    type: 'hub',
    icon: <Home />,
  },
  {
    path: '/poor-context',
    title: 'Anti-Patterns Overview',
    type: 'poor',
    icon: <ErrorOutline />,
  },
  {
    path: '/context-antipatterns/massive-context',
    title: 'Massive Context',
    type: 'antipattern',
    icon: <ErrorOutline />,
    parent: '/poor-context',
  },
  {
    path: '/context-antipatterns/object-recreation',
    title: 'Object Recreation',
    type: 'antipattern',
    icon: <ErrorOutline />,
    parent: '/poor-context',
  },
  {
    path: '/context-antipatterns/missing-dependencies',
    title: 'Missing Dependencies',
    type: 'antipattern',
    icon: <ErrorOutline />,
    parent: '/poor-context',
  },
  {
    path: '/context-antipatterns/heavy-computations',
    title: 'Heavy Computations',
    type: 'antipattern',
    icon: <ErrorOutline />,
    parent: '/poor-context',
  },
  {
    path: '/good-context',
    title: 'Best Practices',
    type: 'good',
    icon: <CheckCircle />,
  },
];

const ContextNavigation: React.FC<ContextNavigationProps> = ({ 
  showNavigation = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPageData = contextPages.find(page => page.path === location.pathname);
  
  // Get breadcrumb path
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { path: '/context', title: 'Context Hub' }
    ];
    
    if (currentPageData?.parent) {
      const parentPage = contextPages.find(page => page.path === currentPageData.parent);
      if (parentPage) {
        breadcrumbs.push({ path: parentPage.path, title: parentPage.title });
      }
    }
    
    if (currentPageData && currentPageData.path !== '/context') {
      breadcrumbs.push({ path: currentPageData.path, title: currentPageData.title });
    }
    
    return breadcrumbs;
  };

  // Get next/previous pages for anti-patterns
  const getAdjacentPages = () => {
    const antiPatternPages = contextPages.filter(page => page.type === 'antipattern');
    const currentAntiPatternIndex = antiPatternPages.findIndex(page => page.path === location.pathname);
    
    if (currentAntiPatternIndex === -1) return { prev: null, next: null, antiPatternPages };
    
    return {
      prev: currentAntiPatternIndex > 0 ? antiPatternPages[currentAntiPatternIndex - 1] : null,
      next: currentAntiPatternIndex < antiPatternPages.length - 1 ? antiPatternPages[currentAntiPatternIndex + 1] : null,
      antiPatternPages,
    };
  };

  const breadcrumbs = getBreadcrumbs();
  const { prev, next, antiPatternPages } = getAdjacentPages();

  return (
    <Box>
      {/* Breadcrumbs */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="context navigation breadcrumb"
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const pageData = contextPages.find(page => page.path === crumb.path);
            
            return isLast ? (
              <Box key={crumb.path} display="flex" alignItems="center" gap={1}>
                {pageData?.icon}
                <Typography 
                  color="text.primary" 
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {crumb.title}
                </Typography>
                <Chip
                  label={pageData?.type === 'antipattern' ? 'Anti-Pattern' : 
                         pageData?.type === 'good' ? 'Best Practice' :
                         pageData?.type === 'poor' ? 'Anti-Patterns' : 'Hub'}
                  size="small"
                  color={pageData?.type === 'good' ? 'success' : 
                         pageData?.type === 'poor' || pageData?.type === 'antipattern' ? 'error' : 'primary'}
                  variant="outlined"
                />
              </Box>
            ) : (
              <Link
                key={crumb.path}
                component={RouterLink}
                to={crumb.path}
                underline="hover"
                color="inherit"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                {pageData?.icon}
                {crumb.title}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Paper>

      {/* Anti-Pattern Navigation */}
      {showNavigation && currentPageData?.type === 'antipattern' && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'error.light', color: 'error.contrastText' }}>
          <Typography variant="subtitle1" gutterBottom>
            🚨 Anti-Pattern Navigation
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              {prev ? (
                <Button
                  startIcon={<NavigateBefore />}
                  onClick={() => navigate(prev.path)}
                  sx={{ color: 'inherit' }}
                >
                  {prev.title}
                </Button>
              ) : (
                <Button
                  startIcon={<NavigateBefore />}
                  onClick={() => navigate('/poor-context')}
                  sx={{ color: 'inherit' }}
                >
                  Back to Overview
                </Button>
              )}
            </Box>
            
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Anti-Pattern {antiPatternPages.findIndex((p: any) => p.path === location.pathname) + 1} of {contextPages.filter((p: any) => p.type === 'antipattern').length}
            </Typography>
            
            <Box>
              {next ? (
                <Button
                  endIcon={<NavigateNext />}
                  onClick={() => navigate(next.path)}
                  sx={{ color: 'inherit' }}
                >
                  {next.title}
                </Button>
              ) : (
                <Button
                  endIcon={<NavigateNext />}
                  onClick={() => navigate('/good-context')}
                  sx={{ color: 'inherit' }}
                >
                  See Solutions
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      )}

      {/* Quick Navigation Links */}
      {showNavigation && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Quick Navigation
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Button
              size="small"
              variant={location.pathname === '/context' ? 'contained' : 'outlined'}
              startIcon={<Home />}
              onClick={() => navigate('/context')}
            >
              Context Hub
            </Button>
            <Button
              size="small"
              variant={location.pathname === '/poor-context' ? 'contained' : 'outlined'}
              color="error"
              startIcon={<ErrorOutline />}
              onClick={() => navigate('/poor-context')}
            >
              Anti-Patterns
            </Button>
            <Button
              size="small"
              variant={location.pathname === '/good-context' ? 'contained' : 'outlined'}
              color="success"
              startIcon={<CheckCircle />}
              onClick={() => navigate('/good-context')}
            >
              Best Practices
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ContextNavigation;
