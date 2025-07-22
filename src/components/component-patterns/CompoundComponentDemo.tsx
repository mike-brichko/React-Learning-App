import React, { useState, createContext, useContext } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Paper,
  Chip
} from '@mui/material';

// Compound Component Pattern - Tabs Example
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Main Tabs component with compound children
const Tabs: React.FC<{ children: React.ReactNode; defaultTab?: string }> & {
  Tab: React.FC<{ label: string; children: React.ReactNode }>;
  Panel: React.FC<{ label: string; children: React.ReactNode }>;
} = ({ children, defaultTab = 'tab1' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Tabs Component</Typography>
          {children}
        </CardContent>
      </Card>
    </TabsContext.Provider>
  );
};

// Tab component (for tab buttons)
const Tab: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');
  
  const { activeTab, setActiveTab } = context;
  
  return (
    <Button
      variant={activeTab === label ? 'contained' : 'outlined'}
      onClick={() => setActiveTab(label)}
      sx={{ mr: 1, mb: 1 }}
    >
      {children}
    </Button>
  );
};

// Panel component (for tab content)
const Panel: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Panel must be used within Tabs');
  
  const { activeTab } = context;
  
  if (activeTab !== label) return null;
  
  return (
    <Paper sx={{ mt: 2, p: 2, bgcolor: 'grey.50' }}>
      {children}
    </Paper>
  );
};

// Attach compound components
Tabs.Tab = Tab;
Tabs.Panel = Panel;

// Another example - Accordion
interface AccordionContextType {
  openItems: string[];
  toggleItem: (item: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

const Accordion: React.FC<{ children: React.ReactNode; allowMultiple?: boolean }> & {
  Item: React.FC<{ id: string; children: React.ReactNode }>;
  Header: React.FC<{ id: string; children: React.ReactNode }>;
  Content: React.FC<{ id: string; children: React.ReactNode }>;
} = ({ children, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    setOpenItems(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return allowMultiple ? [...prev, item] : [item];
      }
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Accordion Component</Typography>
          {children}
        </CardContent>
      </Card>
    </AccordionContext.Provider>
  );
};

const AccordionItem: React.FC<{ id: string; children: React.ReactNode }> = ({ children }) => {
  return <Box sx={{ mb: 1 }}>{children}</Box>;
};

const AccordionHeader: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionHeader must be used within Accordion');
  
  const { openItems, toggleItem } = context;
  const isOpen = openItems.includes(id);
  
  return (
    <Button
      onClick={() => toggleItem(id)}
      variant="outlined"
      fullWidth
      sx={{ 
        justifyContent: 'space-between',
        textTransform: 'none',
        mb: isOpen ? 1 : 0
      }}
    >
      {children}
      <Chip label={isOpen ? '−' : '+'} size="small" />
    </Button>
  );
};

const AccordionContent: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');
  
  const { openItems } = context;
  const isOpen = openItems.includes(id);
  
  if (!isOpen) return null;
  
  return (
    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
      {children}
    </Paper>
  );
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

// Demo Component
const CompoundComponentDemo: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Compound Component Pattern
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Pattern for creating flexible, reusable components with implicit state sharing between parent and children.
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Key Characteristics:</Typography>
          <Typography variant="caption">
            • Parent manages shared state • Children access state via React Context • API resembles HTML elements • Flexible composition • Implicit communication
          </Typography>
        </Alert>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
          {/* Tabs Example */}
          <Tabs defaultTab="overview">
            <Box>
              <Tabs.Tab label="overview">Overview</Tabs.Tab>
              <Tabs.Tab label="features">Features</Tabs.Tab>
              <Tabs.Tab label="examples">Examples</Tabs.Tab>
            </Box>
            
            <Tabs.Panel label="overview">
              <Typography variant="body2">
                Compound components work together as a cohesive unit while maintaining individual responsibilities.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                The parent component manages state, and children automatically have access to it through context.
              </Typography>
            </Tabs.Panel>
            
            <Tabs.Panel label="features">
              <Typography variant="body2" gutterBottom>
                Key features of compound components:
              </Typography>
              <ul>
                <li>Flexible composition</li>
                <li>Implicit state sharing</li>
                <li>Clean API design</li>
                <li>Reusable patterns</li>
              </ul>
            </Tabs.Panel>
            
            <Tabs.Panel label="examples">
              <Typography variant="body2">
                Common examples include:
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip label="Select.Option" size="small" sx={{ mr: 1, mb: 1 }} />
                <Chip label="Tabs.Panel" size="small" sx={{ mr: 1, mb: 1 }} />
                <Chip label="Menu.Item" size="small" sx={{ mr: 1, mb: 1 }} />
                <Chip label="Accordion.Content" size="small" sx={{ mr: 1, mb: 1 }} />
              </Box>
            </Tabs.Panel>
          </Tabs>

          {/* Accordion Example */}
          <Accordion allowMultiple>
            <Accordion.Item id="item1">
              <Accordion.Header id="item1">
                React Fundamentals
              </Accordion.Header>
              <Accordion.Content id="item1">
                <Typography variant="body2">
                  Learn the basics of React including components, props, and state management.
                </Typography>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item id="item2">
              <Accordion.Header id="item2">
                Advanced Patterns
              </Accordion.Header>
              <Accordion.Content id="item2">
                <Typography variant="body2">
                  Explore advanced React patterns like HOCs, render props, and compound components.
                </Typography>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item id="item3">
              <Accordion.Header id="item3">
                Performance Optimization
              </Accordion.Header>
              <Accordion.Content id="item3">
                <Typography variant="body2">
                  Learn about memoization, code splitting, and other performance techniques.
                </Typography>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2">Benefits:</Typography>
          <ul>
            <li><strong>Flexibility:</strong> Consumers can arrange components as needed</li>
            <li><strong>Encapsulation:</strong> Internal state management is hidden</li>
            <li><strong>Intuitive API:</strong> Resembles familiar HTML structure</li>
            <li><strong>Composability:</strong> Easy to extend and customize</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Real-world Examples:</Typography>
          <ul>
            <li><strong>React Router:</strong> Router, Route, Link components</li>
            <li><strong>Formik:</strong> Form, Field, ErrorMessage components</li>
            <li><strong>React Select:</strong> Select, Option, Menu components</li>
            <li><strong>Reach UI:</strong> Most components use compound patterns</li>
          </ul>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            💡 Compound components provide excellent developer experience but can be more complex to implement than simple prop-based APIs.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default CompoundComponentDemo;
