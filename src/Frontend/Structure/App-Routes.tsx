import { Routes, Route } from 'react-router-dom';
import Swapi from '../../Swapi/Swapi';
import People from '../../Swapi/People/People';
import PeopleDetail from '../../Swapi/People/PeopleDetail';
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
      <Route path="/people/:id" element={<PeopleDetail created={''} edited={''} name={undefined} gender={undefined} films={''} species={''} starships={''} vehicles={''} />} />
      <Route path="/films" element={<Swapi />} />
      <Route path="/species" element={<Swapi />} />
      <Route path="/vehicles" element={<Swapi />} />
      <Route path="/starships" element={<Swapi />} />

    </Routes>


  );
}
