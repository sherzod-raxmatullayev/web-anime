import React, { useState } from 'react';
import { routes } from "./utils/routes.jsx";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { NotInternet } from "./pages/index.js";
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {

  return (
    
    <>
     <Header />

      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>

      <Footer />
    </>
  );
}

export default App;