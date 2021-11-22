import "./Header.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { RiPoliceCarFill } from "react-icons/ri";
import { FaHome, FaDollarSign } from "react-icons/fa"; //FaBuilding
import React from "react";

const Header = () => {
  return (
    <div className="header-wrapper">
      <Navbar className="navbar" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link className="link" to="/">
              <FaHome id="icon" size={50} />
            </Link>
            {/* <Link className="link" to="/vehicles">
              <RiPoliceCarFill id="icon" size={50} />
            </Link>
            <Link className="link" to="/buildings">
              <FaBuilding id="icon" size={50} />
            </Link> */}
            <Link className="link" to="/credits">
              <FaDollarSign id="icon" size={50} />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
