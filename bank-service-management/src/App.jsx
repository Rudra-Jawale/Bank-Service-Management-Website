import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Banks from "./pages/Banks";
import Branches from "./pages/Branches";
import Machines from "./pages/Machines";

function App() {
  return (
    <BrowserRouter>

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1 }}>
          <Navbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/machines" element={<Machines />} />
          </Routes>

        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;