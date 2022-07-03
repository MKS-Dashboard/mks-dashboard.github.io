import "./Header.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiPoliceCarFill } from "react-icons/ri";
import { FaHome, FaBuilding, FaBed } from "react-icons/fa"; //FaDollarSign
import { BiWorld } from "react-icons/bi";
import { TiGroup } from "react-icons/ti";
// import { BsPersonFill } from "react-icons/bs";
import React from "react";

const Header = () => {
  return (
    <div className="header-wrapper">
      <Navbar collapseOnSelect className="navbar" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link className="link" to="/">
              <FaHome id="icon" size={50} />
            </Link>
            <Link className="link" to="/vehicles">
              <RiPoliceCarFill id="icon" size={50} />
            </Link>
            <Link className="link" to="/buildings">
              <FaBuilding id="icon" size={50} />
            </Link>
            <Link className="link" to="/alliancebuildings">
              <TiGroup id="icon" size={50} />
            </Link>
            <Link className="link" to="/beds">
              <FaBed id="icon" size={50} />
            </Link>
            <Link className="link" to="/credits">
              <BiWorld id="icon" size={50} />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
