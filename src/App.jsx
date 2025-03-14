import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Base from "./components/Base";
import Toppings from "./components/Toppings";
import Order from "./components/Order";
import Header from "./components/Header";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes({ pizza, addBase, addTopping }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/base"
          element={<Base addBase={addBase} pizza={pizza} />}
        />
        <Route
          path="/toppings"
          element={<Toppings addTopping={addTopping} pizza={pizza} />}
        />
        <Route path="/order" element={<Order pizza={pizza} />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [pizza, setPizza] = useState({ base: "", toppings: [] });

  const addBase = (base) => setPizza({ ...pizza, base });

  const addTopping = (topping) => {
    setPizza((prev) => ({
      ...prev,
      toppings: prev.toppings.includes(topping)
        ? prev.toppings.filter((item) => item !== topping)
        : [...prev.toppings, topping],
    }));
  };

  return (
    <Router>
      {" "}
      <Header />
      <AnimatedRoutes pizza={pizza} addBase={addBase} addTopping={addTopping} />
    </Router>
  );
}

export default App;
