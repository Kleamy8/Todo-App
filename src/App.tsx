import Logo from "@/assets/logo.png";
import HelloWorld from "@/components/HelloWorld/HelloWorld";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./components/home/home";
import { CreateTodo } from "./components/createTodo/createTodo";

export default function App() {
  return (
    <Router basename="/Todo-App/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTodo />} />
      </Routes>
    </Router>
  );
}
