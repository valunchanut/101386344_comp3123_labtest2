import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import theme from './theme';
import WeatherComponent from './components/WeatherComponent';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>Weather App</h1>
        </header>
        <Container maxWidth="sm">
          <WeatherComponent />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;