import React from 'react';
import './App.css';
import AppConditional from './Frontend/Structure/App-Conditional';
import AppNavbar from './Frontend/Structure/App-Navbar';
import AppRoutes from './Frontend/Structure/App-Routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import 'bootstrap/dist/css/bootstrap.min.css'
const App = () => {
  return (
    <React.Fragment>
      <div className="">
        <AppNavbar />
        <main >
          <div className="container mt-4" style={{ "minWidth": "100%" }}>
            <div className='jumbotron'>
              <form >
                <AppRoutes />
              </form>
              <AppConditional />
            </div>
          </div>
        </main>
      </div>
      <footer>
      </footer>
    </React.Fragment>
  );
}

export default App;
