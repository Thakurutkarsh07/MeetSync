import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TodosPage from "./pages/TodosPage";
import EmailPage from "./pages/EmailPage";
import About from "./pages/About";
import Services from "./pages/Services";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar stays fixed at the top */}
      <div className="pt-16"> {/* Push content below the navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todopage" element={<TodosPage />} />
          <Route path="/emails" element={<EmailPage />} /> {/* Add this line */}
          <Route path="/about" element={<About />} /> {/* Add this line */}
          <Route path="/services" element={<Services/>}/>
        </Routes>
      </div>
    </Router>
  );
}


export default App;
