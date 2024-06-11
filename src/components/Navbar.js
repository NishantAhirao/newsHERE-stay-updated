import React from 'react'
import { Link } from "react-router-dom";
import './navbar.css';
import logoM from './logoM.jpg'
const Navbar = () => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img className='navlogo' src={logoM} alt='img'/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        
        <li className="nav-item "><Link className="nav-link btn btn-sm" to="/general">General</Link></li>
        <li className="nav-item"><Link className="nav-link btn btn-sm" to="/business">Business</Link></li>
        <li className="nav-item"><Link className="nav-link btn btn-sm " to="/entertainment">Entertainment</Link></li>
        <li className="nav-item"><Link className="nav-link btn btn-sm" to="/health ">Health</Link></li>
        <li className="nav-item"><Link className="nav-link btn btn-sm" to="/science">Science</Link></li>
        <li className="nav-item"><Link className="nav-link btn btn-sm" to="/sports">Sports</Link></li>
        <li className="nav-item"><Link className="nav-link btn btn-sm" to="/technology">Technology</Link></li>
        
      </ul>
     
      

    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
