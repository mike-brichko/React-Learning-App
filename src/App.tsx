import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from './store';
import { useAppSelector } from './store/hooks';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import HooksPage from './pages/HooksPage';
import ComponentsPage from './pages/ComponentsPage';
import ContextPage from './pages/ContextPage';
import PoorContextPage from './pages/PoorContextPage';
import GoodContextPage from './pages/GoodContextPage';
import MassiveContextPage from './pages/context-antipatterns/MassiveContextPage';
import ObjectRecreationPage from './pages/context-antipatterns/ObjectRecreationPage';
import MissingDependenciesPage from './pages/context-antipatterns/MissingDependenciesPage';
import HeavyComputationsPage from './pages/context-antipatterns/HeavyComputationsPage';
import ReduxPage from './pages/ReduxPage';
import ReactQueryPage from './pages/ReactQueryPage';
import TestingPage from './pages/TestingPage';

// Import individual hook pages
import {
  UseStatePage,
  UseEffectPage,
  UseContextPage,
  UseReducerPage,
  UseMemoPage,
  UseCallbackPage,
  UseRefPage,
  UseImperativeHandlePage,
  UseLayoutEffectPage,
  UseTransitionPage,
  UseDeferredValuePage,
  UseIdPage,
  UseSyncExternalStorePage,
  CustomHooksPage
} from './pages/hooks';

// Import individual component pattern pages
import {
  FunctionComponentPage,
  ClassComponentPage,
  HigherOrderComponentPage,
  RenderPropsPage,
  CompoundComponentPage,
  MemoizedComponentPage,
  ForwardRefPage,
  ErrorBoundaryPage
} from './pages/component-patterns';

// Create a component to handle theme switching
const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeMode = useAppSelector((state: any) => state.theme.mode) as 'light' | 'dark';
  
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper>
          <ErrorBoundary>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/hooks" element={<HooksPage />} />
                  
                  {/* Individual Hook Pages */}
                  <Route path="/hooks/use-state" element={<UseStatePage />} />
                  <Route path="/hooks/use-effect" element={<UseEffectPage />} />
                  <Route path="/hooks/use-context" element={<UseContextPage />} />
                  <Route path="/hooks/use-reducer" element={<UseReducerPage />} />
                  <Route path="/hooks/use-memo" element={<UseMemoPage />} />
                  <Route path="/hooks/use-callback" element={<UseCallbackPage />} />
                  <Route path="/hooks/use-ref" element={<UseRefPage />} />
                  <Route path="/hooks/use-imperative-handle" element={<UseImperativeHandlePage />} />
                  <Route path="/hooks/use-layout-effect" element={<UseLayoutEffectPage />} />
                  <Route path="/hooks/use-transition" element={<UseTransitionPage />} />
                  <Route path="/hooks/use-deferred-value" element={<UseDeferredValuePage />} />
                  <Route path="/hooks/use-id" element={<UseIdPage />} />
                  <Route path="/hooks/use-sync-external-store" element={<UseSyncExternalStorePage />} />
                  <Route path="/hooks/custom-hooks" element={<CustomHooksPage />} />
                  
                  <Route path="/components" element={<ComponentsPage />} />
                  
                  {/* Individual Component Pattern Pages */}
                  <Route path="/components/function-component" element={<FunctionComponentPage />} />
                  <Route path="/components/class-component" element={<ClassComponentPage />} />
                  <Route path="/components/higher-order-component" element={<HigherOrderComponentPage />} />
                  <Route path="/components/render-props" element={<RenderPropsPage />} />
                  <Route path="/components/compound-component" element={<CompoundComponentPage />} />
                  <Route path="/components/memoized-component" element={<MemoizedComponentPage />} />
                  <Route path="/components/forward-ref" element={<ForwardRefPage />} />
                  <Route path="/components/error-boundary" element={<ErrorBoundaryPage />} />
                  
                  <Route path="/context" element={<ContextPage />} />
                  <Route path="/poor-context" element={<PoorContextPage />} />
                  <Route path="/good-context" element={<GoodContextPage />} />
                  
                  {/* Context Anti-Pattern Pages */}
                  <Route path="/context-antipatterns/massive-context" element={<MassiveContextPage />} />
                  <Route path="/context-antipatterns/object-recreation" element={<ObjectRecreationPage />} />
                  <Route path="/context-antipatterns/missing-dependencies" element={<MissingDependenciesPage />} />
                  <Route path="/context-antipatterns/heavy-computations" element={<HeavyComputationsPage />} />
                  
                  <Route path="/redux" element={<ReduxPage />} />
                  <Route path="/react-query" element={<ReactQueryPage />} />
                  <Route path="/testing" element={<TestingPage />} />
                </Routes>
              </Layout>
            </Router>
          </ErrorBoundary>
        </ThemeWrapper>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
