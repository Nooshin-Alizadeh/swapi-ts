import { Routes,Route } from 'react-router-dom';
import Swapi from '../../Swapi/Swapi';

export default function AppNavbar() {
  return (

    <Routes>
    <Route path="/" element={<Swapi />}>
    </Route>
    <Route path="/people" element={<Swapi />} />
    <Route path="/people/:module/:id" element={<Swapi />} />
    <Route path="/films" element={<Swapi />} />
    <Route path="/species" element={<Swapi />} />
    <Route path="/vehicles" element={<Swapi />} />
    <Route path="/starships" element={<Swapi />} />

  </Routes>

  
  );
}
