import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../firebase';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { BiSolidCameraMovie } from "react-icons/bi";
import { CiHome } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { MdOutlineChangeCircle } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";


function NavBar() {
  const firebase = useFirebase();
  const [search, setSearch] = useState("");
  const [searchedData, setSD] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    signOut(auth);
    console.log(firebase.user);
    navigate("/register");
  };

  return (
    <nav className="navbar navbar-expand-lg" 
         style={{ 
           height: "65px", 
           backgroundColor: "#1e1c2a", 
           boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" 
         }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" 
           style={{ 
             marginLeft: "15px", 
             fontWeight: "800", 
             color: "gold" ,
             fontSize:"17px",
             marginTop:"4px"
           }}>
          <BiSolidCameraMovie  size={25} /> R -Moviezz
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: "30px" }}>
            <li className="nav-item active">
              <Link className="nav-link" to="/" style={{ marginLeft: "13px", fontWeight: "700", fontSize:"12px",color: "white" }}>
              <IoHomeOutline size={15} /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Add" className="nav-link" style={{ marginLeft: "13px", fontWeight: "700", color: "white", fontSize:"12px" }}>
              <IoMdAddCircleOutline size={20}/> Add A Movie
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Change" className="nav-link" style={{ marginLeft: "13px", fontWeight: "700", color: "white", fontSize:"12px" }}>
              <MdOutlineChangeCircle size={20}/> Change Details
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/filter" className="nav-link" style={{ marginLeft: "13px", fontWeight: "700", color: "white" , fontSize:"12px" }}>
              <CiFilter size={20}/> Filter
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/delete" className="nav-link" style={{ marginLeft: "13px", fontWeight: "700", color: "white" , fontSize:"12px" }}>
              <FaDeleteLeft size={20}/>  Delete
              </Link>
            </li>
          
          </ul>
          <div className="d-flex ms-auto">
          <li className="nav-item" style={{marginRight:"10px"}}>
              <Link to="/" className="nav-link" style={{ marginRight: "30px",marginBottom:"20px", fontWeight: "700", color: "white", fontSize:"12px" }}>
              <FaRegUser size={20}/>    {firebase.user.email} 
              </Link>
            </li>
            <button
              onClick={handleClick}
              className="btn"
              style={{ 
                marginRight: "20px", 
                backgroundColor: "#ccaa62", 
                borderColor: "#ccaa62", 
                color: "white", 
                fontWeight: "900" ,
                height:"40px",
                marginTop:"12px",
                fontSize:"13px"
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
