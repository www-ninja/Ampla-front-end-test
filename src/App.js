import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TableSheet from './components/TableSheet'
import HomePage from './components/HomePage'

function App() {
  return (
    <div className="App" style={{width:'max-content'}}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/:sheetId" element={<TableSheet x={26} y={100} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
