import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home"
import Vehicles from "./components/Vehicles/Vehicles"
import Buildings from "./components/Buildings/Buildings"
import Credits from "./components/Credits/Credits"
import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {

  const [SessionId, setSessionId] = useState("Default");
  const [ApiVehicles, setApiVehicles] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      const result = await axios.get('https://www.meldkamerspel.com/einsaetze.json/',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
      console.log(result.data)
      return result.data;
    }
    fetchMissions().then(r => setApiVehicles(r));
  }, [SessionId]);

  console.log(ApiVehicles)
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Layout>
            <Home setSessionId={setSessionId} />
          </Layout>
        </Route>
        <Route exact path='/vehicles'>
          <Layout>
            <Vehicles />
          </Layout>
        </Route>
        <Route exact path='/buildings'>
          <Layout>
            <Buildings />
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
