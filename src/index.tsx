import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './global.scss';
import { App } from './App';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LogsContextProvider } from './contexts/LogsContext';
import { theme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LogsContextProvider>
        <App />
      </LogsContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
