import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Qrcode from "./components/Qrcode.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Qrcode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
