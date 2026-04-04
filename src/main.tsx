import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ApolloProvider } from '@apollo/client/react';
import App from './App.tsx';
import { apolloClient } from './api/apollo-client.ts';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}
