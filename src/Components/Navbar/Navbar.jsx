import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({userData ,logOut }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  fixed fixed-top">
        <div className="container">
          <Link className="navbar-brand text-light" to='home'><h3>Noxe</h3></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
          {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='home'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to='movies'>Movies</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to='Tvshow'>Tvshow</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to='people'>People</Link>
              </li>



              </ul>:""}
           
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 " id='navbarSupportedContent'>

              <li className="nav-item d-flex align-items-center">
                <i className='fab mx-2 fa-facebook'></i>
                <i className='fab mx-2 fa-twitter'></i>
                <i className='fab mx-2 fa-instagram'></i>
                <i className='fab mx-2 fa-soundcloud'></i>
              </li>

              {userData? <li className="nav-item ms-auto">
                <span onClick={logOut} className="nav-link"  >Logout</span>
              </li>:<><li className="nav-item ms-auto">
                <Link className="nav-link active" to='/'>Register</Link>
              </li>

              <li className="nav-item ms-auto">
                <Link className="nav-link active" to='login'>Login</Link>
              </li></>}

             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
