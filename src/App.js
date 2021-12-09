import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home"
import Vehicles from "./components/Vehicles/Vehicles"
import Buildings from "./components/Buildings/Buildings"
import Credits from "./components/Credits/Credits"
import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const apiUrl = "https://mks-dashboard-mks-dashboard-piet2001.cloud.okteto.net/"
  const [SessionId, setSessionId] = useState("Default");
  const [inputvalue, setInputValue] = useState("x")
  const [ApiVehicles, setApiVehicles] = useState([]);
  const [ApiBuildings, setApiBuildings] = useState([]);

  function SaveSessionID() {
    setSessionId(inputvalue);
    refreshdata();
  }

  function refreshdata() {
    fetchUser();
    fetchVehicles();
    fetchBuildings();
  }

  async function fetchVehicles() {
    const fetchVersions = async () => {
      const result = await axios(`${apiUrl}/vehicles/${SessionId}`);
      return result.data;
    };
    fetchVersions().then((r) => setApiVehicles(r))
  }

  async function fetchBuildings() {
    const fetchBuildings = async () => {
      const result = await axios(`${apiUrl}/buildings/${SessionId}`);
      return result.data;
    };
    fetchBuildings().then((r) => setApiBuildings(r))
  }

  async function fetchUser() {
    const fetchVersions = async () => {
      const result = await axios(`${apiUrl}/credits/${SessionId}`);
      console.log(result.data)
      return result.data;
    };
    fetchVersions().then((r) => alert(`Welkom ${r.user_name}`)).catch(function error() {
      alert("Ophalen usergegevens mislukt, probeer opnieuw!")
    });
  }


  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Layout refresh={refreshdata}>
            <Home setInputValue={setInputValue} SaveSessionID={SaveSessionID} template={SessionId} />
          </Layout>
        </Route>
        <Route exact path='/vehicles'>
          <Layout>
            <Vehicles vehicleData={ApiVehicles} />
          </Layout>
        </Route>
        <Route exact path='/buildings'>
          <Layout>
            <Buildings buildingsData={ApiBuildings} />
          </Layout>
        </Route>
        <Route exact path='/credits'>
          <Layout>
            <Credits />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
