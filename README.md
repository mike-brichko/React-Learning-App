# React Learning App 🚀

A comprehensive, interactive React learning application built with modern tools and best practices. This project serves as both a learning resource and a practical playground for developers who want to master React, TypeScript, and the modern React ecosystem.

## 📚 What You'll Learn

This application demonstrates and teaches:

- **React Fundamentals**: Components, props, state, and lifecycle
- **React Hooks**: All built-in hooks with practical examples
- **Component Patterns**: HOCs, Render Props, Compound Components, and more
- **State Management**: Redux Toolkit and Context API
- **Data Fetching**: TanStack React Query with caching strategies
- **Routing**: React Router with nested routes and parameters
- **Testing**: Unit and integration testing with Vitest and React Testing Library
- **TypeScript**: Type safety and best practices
- **Modern UI**: Material-UI components and theming

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server

### UI & Styling
- **Material-UI (MUI) v7** - Comprehensive component library
- **Emotion** - CSS-in-JS styling
- **Material Icons** - Icon set

### State Management
- **Redux Toolkit** - Modern Redux with best practices
- **React Context** - Built-in state management
- **React Redux** - React bindings for Redux

### Data Fetching
- **TanStack React Query** - Server state management
- **Axios** - HTTP client

### Routing
- **React Router DOM** - Declarative routing

### Testing
- **Vitest** - Fast unit test framework
- **React Testing Library** - Testing utilities for React
- **Jest DOM** - Custom Jest matchers
- **User Event** - User interaction testing

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mike-brichko/React-Learning-App.git
   cd React-Learning-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## 📖 Learning Modules

### 🪝 React Hooks
Comprehensive examples of all React hooks:

- **Basic Hooks**: `useState`, `useEffect`, `useContext`
- **Additional Hooks**: `useReducer`, `useMemo`, `useCallback`, `useRef`
- **Advanced Hooks**: `useImperativeHandle`, `useLayoutEffect`, `useTransition`
- **Concurrent Features**: `useDeferredValue`, `useId`, `useSyncExternalStore`
- **Custom Hooks**: Creating reusable logic

### 🧩 Component Patterns
Learn essential React patterns:

- **Function Components** - Modern React components
- **Class Components** - Legacy pattern understanding
- **Higher-Order Components** - Component composition
- **Render Props** - Flexible component patterns
- **Compound Components** - Complex component APIs
- **Memoized Components** - Performance optimization
- **Forward Ref** - Ref forwarding patterns
- **Error Boundaries** - Error handling

### 🏪 State Management
- **Redux Toolkit** - Modern Redux patterns
- **Context API** - React's built-in state management
- **Local vs Global State** - When to use what

### 🌐 Data Fetching
- **React Query** - Server state management
- **Caching Strategies** - Optimizing data fetching
- **Loading States** - User experience patterns
- **Error Handling** - Robust error management

### 🧪 Testing
- **Unit Testing** - Testing individual components
- **Integration Testing** - Testing component interactions
- **Mocking** - Testing with mock data
- **User Interactions** - Testing user workflows

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── Layout.tsx
│   ├── Loading.tsx
│   ├── component-patterns/  # Component pattern demos
│   └── hooks/              # Hook demos
├── pages/               # Application pages
│   ├── component-patterns/ # Individual pattern pages
│   └── hooks/             # Individual hook pages
├── hooks/               # Custom hooks
├── store/               # Redux store configuration
├── services/            # API services
├── types/               # TypeScript definitions
├── utils/               # Utility functions
└── __tests__/           # Test files
```

## 🎯 Key Features

### Interactive Examples
- Live code demonstrations
- Editable examples in the browser
- Real-time state visualization
- Performance monitoring

### Best Practices
- TypeScript integration
- Error handling patterns
- Performance optimization
- Accessibility considerations
- Testing strategies

### Modern React
- Concurrent features
- Suspense boundaries
- Error boundaries
- Code splitting

## 🧪 Testing

The project includes comprehensive tests demonstrating:

- Component testing strategies
- Hook testing patterns
- Integration test examples
- Mocking external dependencies
- User interaction testing

Run tests with:
```bash
npm run test           # Run all tests
npm run test:ui        # Run with UI
npm run test:coverage  # Generate coverage report
```

## 🤝 Contributing

This is a learning project, but contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Vitest Documentation](https://vitest.dev/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Questions or Issues?

If you have questions or run into issues:

1. Check the existing issues
2. Create a new issue with a detailed description
3. Include steps to reproduce any bugs

Happy learning! 🎉