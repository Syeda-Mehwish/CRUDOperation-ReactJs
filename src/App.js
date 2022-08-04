import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import Edit from "./Components/student/Edit";
import View from "./Components/student/View";
function App() {
  return (
    < >
      
      <BrowserRouter>
      <Routes>
        
          <Route index path="/"element={<Home />} />
           <Route index path="/view/:id" element={<View />} />
          <Route index path="/edit/:id" element={<Edit />} /> 
        
      </Routes>
    </BrowserRouter>
       
    </>
  );
}

export default App;
