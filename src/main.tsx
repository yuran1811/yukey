import App from '@/App';
import ErrorBoundary from '@/components/ErrorBoundary';
import '@/styles.css';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
