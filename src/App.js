import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home"
import Vehicles from "./components/Vehicles/Vehicles"
import Buildings from "./components/Buildings/Buildings"
import AllianceBuildings from "./components/Buildings/AllianceBuildings";
import Credits from "./components/Credits/Credits"
import Voorwaarden from "./components/Voorwaarden/Voorwaarden"
import Privacy from "./components/Voorwaarden/Privacy";
import Progressdata from "./components/Progressdata/Progressdata"
import Suggestions from "./components/Suggestions/suggestions"
import Login from "./components/Login/Login";
import React, { useState } from "react";
import axios from "axios";
import './App.css';
import Information from "./components/Information/Information";
import Awards from "./components/Information/Awards";
import Poi from "./components/Information/Poi";

function App() {
  let apiUrl;
  const [inputvalue, setInputValue] = useState("")
  const [ApiVehicles, setApiVehicles] = useState([]);
  const [ApiBuildings, setApiBuildings] = useState([]);
  const [ApiAllianceBuildings, setApiAllianceBuildings] = useState([])
  const [Agree, setAgree] = React.useState(false)
  const loggedIn = (ApiVehicles.length > 0 || ApiBuildings.length > 0) ? true : false;

  if (window.location.href.includes("localhost") || window.location.href.includes("netlify")) {
    apiUrl = "https://mks-dashboard-test-piet2001.cloud.okteto.net"
  }
  else {
    apiUrl = "https://mks-dashboard-mks-dashboard-piet2001.cloud.okteto.net"
  }

  function LoadData() {
    setTimeout(() => {
      fetchUser();
      refreshdata();
      setInterval(() => {
        refreshdata();
      }, 5 * 60 * 1000)
    }, 1000);
  }

  function refreshdata() {
    fetchVehicles();
    fetchBuildings();
    fetchAllianceBuildings();
  }

  async function fetchVehicles() {
    const fetchVersions = async () => {
      const result = await axios(`${apiUrl}/vehicles/${inputvalue}`);
      return result.data;
    };
    fetchVersions().then((r) => setApiVehicles(r))
  }

  async function fetchBuildings() {
    const fetchBuildings = async () => {
      const result = await axios(`${apiUrl}/buildings/${inputvalue}`);
      return result.data;
    };
    fetchBuildings().then((r) => setApiBuildings(r))
  }

  async function fetchAllianceBuildings() {
    const fetchAllianceBuildings = async () => {
      const result = await axios(`${apiUrl}/alliancebuildings/${inputvalue}`);
      return result.data;
    };
    fetchAllianceBuildings().then((r) => setApiAllianceBuildings(r))
  }

  async function fetchUser() {
    const fetchVersions = async () => {
      const result = await axios(`${apiUrl}/credits/${inputvalue}`);
      return result.data;
    };
    fetchVersions().then((r) => alert(`Welkom ${r.user_name}`)).catch(function error() {
      alert("Ophalen usergegevens mislukt, probeer opnieuw!")
    });
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Layout refresh={refreshdata} loggedIn={loggedIn}>
            <Home setInputValue={setInputValue} GetData={LoadData} template={inputvalue} agree={Agree} setAgree={setAgree} />
          </Layout>}
        />

        <Route path='/login/*' element={
          <Layout refresh={refreshdata}>
            <Login setInputValue={setInputValue} GetData={LoadData} template={inputvalue} agree={Agree} setAgree={setAgree} />
          </Layout>}
        />

        <Route path='/vehicles' element={
          <Layout loggedIn={loggedIn}>
            <Vehicles vehicleData={ApiVehicles} />
          </Layout>
        } />

        <Route path='/buildings' element={
          <Layout loggedIn={loggedIn}>
            <Buildings buildingsData={ApiBuildings} />
          </Layout>
        } />

        <Route path='/alliancebuildings' element={
          <Layout loggedIn={loggedIn}>
            <AllianceBuildings allianceBuildingsData={ApiAllianceBuildings} />
          </Layout>
        } />
        <Route path='/progressdata' element={
          <Layout loggedIn={loggedIn}>
            <Progressdata Buildings={ApiBuildings} AllianceBuildings={ApiAllianceBuildings} />
          </Layout>
        } />
        <Route path='/credits' element={
          <Layout loggedIn={loggedIn}>
            <Credits />
          </Layout>
        } />
        <Route path='/voorwaarden' element={
          <Layout loggedIn={loggedIn}>
            <Voorwaarden />
          </Layout>
        } />
        <Route path='/privacy' element={
          <Layout loggedIn={loggedIn}>
            <Privacy />
          </Layout>
        } />
        <Route path='suggestions' element={
          <Layout loggedIn={loggedIn}>
            <Suggestions />
          </Layout>
        } />
        <Route path='information' element={
          <Layout loggedIn={loggedIn}>
            <Information />
          </Layout>
        } />
        <Route path='information/awards' element={
          <Layout loggedIn={loggedIn}>
            <Awards />
          </Layout>
        } />
        <Route path='information/poi' element={
          <Layout loggedIn={loggedIn}>
            <Poi />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
