import React from 'react';
import './tailwind.css';
import Login from './Login';
import Profile from './Profile';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/profile/:username' element={<Profile />}/>

        {/* Default Route */}
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
    
  );
}

export default App;
