import "./App.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { Home } from "./pages/home/Home";
import { Read } from "./pages/read/Read";
import { FlashCard } from "./pages/flash_card/FlashCard";
import { Quiz } from "./pages/quiz/Quiz";
import { Practice } from "./pages/practice/Practice";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read" element={<Read />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/flashcard" element={<FlashCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
