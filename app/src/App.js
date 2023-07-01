import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Box from '@mui/material/Box'

import Header from './components/Header/Header';
import RecordList from './components/RecordList/RecordList';
import Report from './components/Report/Report';
import Player from './components/Player/Player';

function App() {
  return (
    <Router>
      <Box sx={{ height: '100vh' }}>
        <Header />
        <Routes>
          <Route path="/" element={<RecordList />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/player/:sessionId" element={<Player />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;