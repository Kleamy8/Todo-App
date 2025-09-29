import Logo from "@/assets/logo.png";
import HelloWorld from "@/components/HelloWorld/HelloWorld";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./components/home/home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
