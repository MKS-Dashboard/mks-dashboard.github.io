import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home"
import Vehicles from "./components/Vehicles/Vehicles"
import Buildings from "./components/Buildings/Buildings"
import AllianceBuildings from "./components/Buildings/AllianceBuildings";
import Credits from "./components/Credits/Credits"
import Voorwaarden from "./components/Voorwaarden/Voorwaarden"
import Privacy from "./components/Voorwaarden/Privacy";
import Beds from "./components/Beds/Beds"
import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  let apiUrl;
  const [inputvalue, setInputValue] = useState("")
  const [ApiVehicles, setApiVehicles] = useState([]);
  const [ApiBuildings, setApiBuildings] = useState([]);
  const [ApiAllianceBuildings, setApiAllianceBuildings] = useState([])
  const [Agree, setAgree] = React.useState(false)

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
          <Layout refresh={refreshdata}>
            <Home setInputValue={setInputValue} GetData={LoadData} template={inputvalue} agree={Agree} setAgree={setAgree} />
          </Layout>}
        />
        <Route path='/vehicles' element={
          <Layout>
            <Vehicles vehicleData={ApiVehicles} />
          </Layout>
        } />

        <Route path='/buildings' element={
          <Layout>
            <Buildings buildingsData={ApiBuildings} />
          </Layout>
        } />

        <Route path='/alliancebuildings' element={
          <Layout>
            <AllianceBuildings allianceBuildingsData={ApiAllianceBuildings} />
          </Layout>
        } />
        <Route path='/beds' element={
          <Layout>
            <Beds Buildings={ApiBuildings} AllianceBuildings={ApiAllianceBuildings} />
          </Layout>
        } />
        <Route path='/credits' element={
          <Layout>
            <Credits />
          </Layout>
        } />
        <Route path='/voorwaarden' element={
          <Layout>
            <Voorwaarden />
          </Layout>
        } />
        <Route path='/privacy' element={
          <Layout>
            <Privacy />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
