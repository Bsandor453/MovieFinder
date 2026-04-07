import { CssBaseline } from '@mui/material';
import { MUIThemeProvider } from './components/MUIThemeProvider';
import Home from './pages/Home/Home';

function App() {
  return (
    <MUIThemeProvider>
      <CssBaseline />
      <Home />
    </MUIThemeProvider>
  );
}

export default App;
