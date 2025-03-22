import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from './components/TestPage';



export default function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={<TestPage />}
            />
            <Route path="*" element={<div>404 page not found.</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}