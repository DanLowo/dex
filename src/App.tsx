import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import Theme from "./theme";

// pages
import { Home } from "./pages/";

function App() {
  const themeState = "dark"

  return (
    <div className="App">
      <ThemeProvider theme={Theme[themeState]}>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
