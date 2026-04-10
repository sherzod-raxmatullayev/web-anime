import React from 'react';
import { routes } from "./utils/routes.jsx";
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const location = useLocation()
  
  // Header va Footer yashiriladigan sahifalar
  const hideLayout = location.pathname.startsWith('/anime/')

  return (
    <>
      {!hideLayout && <Header />}

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

      <SpeedInsights />
    </>
  );
}

export default App;