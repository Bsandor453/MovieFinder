import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ApolloProvider } from '@apollo/client/react';
import { CssBaseline } from '@mui/material';
import App from './App.tsx';
import { apolloClient } from './api/graphql/apolloClient.ts';
import { MUIThemeProvider } from './components/MUIThemeProvider.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <MUIThemeProvider>
          <CssBaseline />
          <App />
        </MUIThemeProvider>
      </ApolloProvider>
    </StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}
