import AppProvider from "./Context";
import Routes from "./routes";
import React from 'react';

const App = () => {
  return <AppProvider>
    <Routes />
  </AppProvider>;
}

export default App;