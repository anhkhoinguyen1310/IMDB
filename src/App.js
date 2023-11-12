import NaviBar from './components/NaviBar'
import {  Route, Routes} from "react-router-dom"
import HomePage from './pages/HomePage';
import DetailReview from './pages/DetailReview';

import './App.css';


function App() {
  return (
    <div className="App">
     <NaviBar/>
     <Routes>
          <Route exact path  = "/" element={<HomePage/>}/>
          <Route exact path  = "/videos/:id" element={<DetailReview/>}/>
      </Routes>
    </div>
  );
}

export default App;
