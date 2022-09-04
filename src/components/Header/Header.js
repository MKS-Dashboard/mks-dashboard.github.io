import "./Header.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiPoliceCarFill } from "react-icons/ri";
import { FaHome, FaBuilding } from "react-icons/fa"; //FaDollarSign FaBed
import { FcMultipleInputs } from "react-icons/fc";
import { BiWorld } from "react-icons/bi";
import { TiGroup } from "react-icons/ti";
import { BsClipboardData } from "react-icons/bs"; //BsPersonFill
import React from "react";

const Header = (props) => {
  return (
    <div className="header-wrapper">
      <Navbar className="navbar" expand="lg">
        <Link className="link" to="/">
          <Navbar.Brand>
            <FaHome id="icon" size={50} />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link hidden={props.loggedIn} className="link" to="/vehicles" >
              <RiPoliceCarFill id="icon" size={50} />
            </Link>
            <Link hidden={props.loggedIn} className="link" to="/buildings">
              <FaBuilding id="icon" size={50} />
            </Link>
            <Link hidden={props.loggedIn} className="link" to="/alliancebuildings">
              <TiGroup id="icon" size={50} />
            </Link>
            <Link hidden={props.loggedIn} className="link" to="/progressdata">
              <BsClipboardData id="icon" size={50} />
            </Link>
            <Link className="link" to="/credits">
              <BiWorld id="icon" size={50} />
            </Link>
            <Link className="link" to="/suggestions">
              <FcMultipleInputs id="icon" size={50} />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div >
  );
};

export default Header;
