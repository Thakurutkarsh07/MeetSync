import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TodosPage from "./pages/TodosPage";
function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar stays fixed at the top */}
      <div className="pt-16"> {/* Push content below the navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todopage" element={<TodosPage />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
