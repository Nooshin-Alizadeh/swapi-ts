import { NavLink } from 'react-router-dom';

const AppNavbar = () => {
  return (

    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#">SWAPI</a> */}
        <NavLink className="nav-link navbar-brand" to='/'>SWAPI</NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {/* <NavLink className="nav-link" to='/'>Main</NavLink> */}
            <NavLink className="nav-link" to='/people'>People</NavLink>
            <NavLink className="nav-link" to='/films'>Films</NavLink>
            <NavLink className="nav-link" to='/species'>Species</NavLink>
            <NavLink className="nav-link" to='/starships'>Starships</NavLink>
            <NavLink className="nav-link" to='/vehicles'>Vehicles</NavLink>
            {/* <a className="nav-link active" aria-current="page" href="#">Home</a>
      <a className="nav-link" href="#">Features</a>
      <a className="nav-link" href="#">Pricing</a>
      <a className="nav-link disabled">Disabled</a> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default AppNavbar;