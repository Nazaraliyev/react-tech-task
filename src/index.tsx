import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { SnackbarProvider } from 'notistack';
import App from './app';
import '@/styles/styles.css';

const Config = () => {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  );
};

createRoot(document.getElementById('root')!).render(<Config />);
