import "./Header.css";
import { NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiPoliceCarFill, RiInformationLine } from "react-icons/ri";
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
            <Link hidden={!props.loggedIn} className="link" to="/vehicles" >
              <RiPoliceCarFill id="icon" size={50} />
            </Link>
            <NavDropdown hidden={!props.loggedIn} title={<FaBuilding id="icon" size={50} />} id="nav-dropdown" className="link">
              <NavDropdown.Item >
                <Link className="link" to="/buildings">Overzicht</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="Link" to="/buildings/specialisations">Specialisaties</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="Link" to="/buildings/hospitals">Ziekenhuizen</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link hidden={!props.loggedIn} className="link" to="/alliancebuildings">
              <TiGroup id="icon" size={50} />
            </Link>
            <Link hidden={!props.loggedIn} className="link" to="/progressdata">
              <BsClipboardData id="icon" size={50} />
            </Link>
            <Link className="link" to="/credits">
              <BiWorld id="icon" size={50} />
            </Link>
            <NavDropdown title={<RiInformationLine id="icon" size={50} />} id="nav-dropdown" className="link">
              <NavDropdown.Item >
                <Link className="link" to="/information">Algemeen</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="Link" to="/information/awards">Awards</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="Link" to="/information/poi">POI</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="Link" to="/information/alliancemissions">Teaminzetten</Link>
              </NavDropdown.Item>
            </NavDropdown>
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
