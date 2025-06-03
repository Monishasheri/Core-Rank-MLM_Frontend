import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import MLMTree from "./components/MLMTree";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MLMTree/>} />
        
        </Routes>
      </Router>
        
    </div>
  );
}

export default App;
