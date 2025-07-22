# Copilot Instructions for React Learning App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a comprehensive React learning application built with Vite, TypeScript, and Material-UI. The app serves as an interactive playground for developers to learn and experiment with various React features and patterns.

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit, React Context
- **Data Fetching**: TanStack React Query
- **Routing**: React Router DOM
- **Testing**: Vitest, React Testing Library
- **Styling**: Material-UI themes and Emotion

## Project Structure
- `/src/pages/` - Individual learning modules for React features
- `/src/components/` - Reusable UI components
- `/src/store/` - Redux store configuration
- `/src/hooks/` - Custom React hooks
- `/src/services/` - API services and data fetching
- `/src/utils/` - Utility functions
- `/src/types/` - TypeScript type definitions
- `/src/__tests__/` - Test files

## Key Features & Pages
1. **Hooks Playground**: useState, useEffect, useContext, useReducer, custom hooks
2. **Component Patterns**: Props, composition, render props, HOCs
3. **Context API**: Global state management without Redux
4. **Redux Integration**: Complete Redux Toolkit setup with examples
5. **React Query**: Data fetching, caching, and synchronization
6. **Router Examples**: Navigation, nested routes, route parameters
7. **Testing Showcase**: Unit tests, integration tests, mocking examples
8. **Material-UI Components**: Comprehensive component library usage

## Coding Guidelines
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Implement proper error handling and loading states
- Write comprehensive tests for all components
- Use Material-UI components consistently
- Maintain clear separation of concerns
- Document complex logic with comments
- Use proper naming conventions (PascalCase for components, camelCase for functions)

## Testing Strategy
- Unit tests for individual components
- Integration tests for feature workflows
- Mock external dependencies appropriately
- Test user interactions and edge cases
- Maintain high test coverage

## When providing code suggestions:
1. Always use TypeScript
2. Prefer functional components with hooks
3. Use Material-UI components when possible
4. Include proper error handling
5. Add loading states for async operations
6. Write accompanying tests
7. Follow established patterns in the codebase
8. Include JSDoc comments for complex functions
