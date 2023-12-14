import { Routes, Route } from 'react-router-dom';
import Swapi from '../../Swapi/Swapi';
import People from '../../Swapi/People/People';
import DetailView from '../../Swapi/OtherPages/DetailView';
import Species from '../../Swapi/OtherPages/Species';
import Films from '../../Swapi/OtherPages/Films';
import Starships from '../../Swapi/OtherPages/Starships';
import Vehicles from '../../Swapi/OtherPages/vehicles';
import DetailGenerate from '../../Swapi/DetailGenerate';
//AppRoutes
//AppNavbar
export default function AppRoutes() {
  return (

    <Routes>
      <Route path="*" element={<Swapi asStar='true' />}>
      </Route>
      <Route path="/" element={<Swapi />}>
      </Route>
      <Route path="/people" element={<People />} />
      <Route path="/people/:id" element={<DetailView />} >
        {/* <Route path="/people/:id/:list" element={<DetailGenerate />} >
        </Route> */}
      </Route>
      <Route path="/films" element={<Films />} />
      <Route path="/films/:id" element={<DetailView />} />
      <Route path="/species" element={<Species />} />
      <Route path="/species/:id" element={<DetailView />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/vehicles/:id" element={<DetailView />} />
      <Route path="/starships" element={<Starships />} />
      <Route path="/starships/:id" element={<DetailView />} />
      <Route path="/planets/:id" element={<DetailView />} />
    </Routes>
  );
}
