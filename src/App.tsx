import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Swapi from './Swapi/Swapi';
import AppNavbar from './Frontend/Structure/App-Routes';
import AppRoutes from './Frontend/Structure/App-Navbar copy';
function App() {
  return (
    <div className="App">
      <AppNavbar/>
      <AppRoutes/>
      
    </div>
  );
}

export default App;
