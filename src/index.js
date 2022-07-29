import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.css';
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import { mainTheme } from 'components/styles/styles';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <SnackbarProvider
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        autoHideDuration={2000}
                    >
                        <ThemeProvider theme={mainTheme}>
                            <App />
                        </ThemeProvider>
                    </SnackbarProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
