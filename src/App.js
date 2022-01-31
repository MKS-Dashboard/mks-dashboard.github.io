import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home"
import Vehicles from "./components/Vehicles/Vehicles"
import Buildings from "./components/Buildings/Buildings"
import Credits from "./components/Credits/Credits"
import Voorwaarden from "./components/Voorwaarden/Voorwaarden"
import Privacy from "./components/Voorwaarden/Privacy";
import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  let apiUrl;
  const [inputvalue, setInputValue] = useState("")
  const [ApiVehicles, setApiVehicles] = useState([]);
  const [ApiBuildings, setApiBuildings] = useState([]);
  const [Agree, setAgree] = React.useState(false)

  if (window.location.href.includes("localhost") || window.location.href.includes("netlify")) {
    apiUrl = "https://mks-dashboard-test-piet2001.cloud.okteto.net/"
  }
  else {
    apiUrl = "https://mks-dashboard-mks-dashboard-piet2001.cloud.okteto.net/"
  }

  function LoadData() {
    setTimeout(() => {
      fetchUser();
      refreshdata();
      setInterval(() => {
        refreshdata();
      }, 5 * 60 * 1000)
    }, 3000);
  }

  function refreshdata() {
    fetchVehicles();
    fetchBuildings();
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
    <Router>
      <Switch>
        <Route exact path='/'>
          <Layout refresh={refreshdata}>
            <Home setInputValue={setInputValue} GetData={LoadData} template={inputvalue} agree={Agree} setAgree={setAgree} />
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
        <Route exact path='/voorwaarden'>
          <Layout>
            <Voorwaarden />
          </Layout>
        </Route>
        <Route exact path='/privacy'>
          <Layout>
            <Privacy />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
