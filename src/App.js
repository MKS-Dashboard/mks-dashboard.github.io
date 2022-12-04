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
import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Information from "./components/Information/Information";
import Awards from "./components/Information/Awards";
import Poi from "./components/Information/Poi";
import AllianceMissions from "./components/Information/AllianceMissions";
import NotFound from "./components/Default/NotFound";
import BuildingSpecialisations from "./components/Buildings/BuildingSpecialisations";
import Hospitals from "./components/Buildings/Hospitals";
import AllianceHospitals from "./components/Buildings/AllianceHospitals";
import AllianceCells from "./components/Buildings/AllianceCells";
import Cells from "./components/Buildings/Cells";
import AllianceInfo from "./components/AllianceInfo/AllianceInfo";
import AllianceEvents from "./components/Information/AllianceEvents";
import Missions from "./components/Information/Missions";

function App() {
  let apiUrl;
  const [sessionId, setSessionId] = useState(localStorage.getItem('session') || "")
  const [ApiVehicles, setApiVehicles] = useState([]);
  const [ApiBuildings, setApiBuildings] = useState([]);
  const [ApiAllianceBuildings, setApiAllianceBuildings] = useState([])
  const [ApiAllianceInfo, setApiAllianceInfo] = useState({})
  const [Agree, setAgree] = useState(Boolean(JSON.parse(localStorage.getItem('agree'))) || false)
  const loggedIn = (ApiVehicles.length > 0 || ApiBuildings.length > 0) ? true : false;
  const [Timer, setTimer] = useState(0);
  const [newTimer, setNewTimer] = useState();
  const [RememberSession, SetRememberSession] = useState(Boolean(JSON.parse(localStorage.getItem('remember_session'))) || false)
  const [missions, setMissions] = useState([])


  if (window.location.href.includes("localhost") || window.location.href.includes("netlify")) {
    apiUrl = "https://mks-dashboard-test-piet2001.cloud.okteto.net"
  }
  else {
    apiUrl = "https://mks-dashboard-mks-dashboard-piet2001.cloud.okteto.net"
  }

  function LoadData() {
    setTimeout(() => {
      SetNewTime()
      fetchUser();
      refreshdata();
      setInterval(() => {
        SetNewTime()
        refreshdata();
      }, 5 * 60 * 1000)
    }, 1000);
  }

  function updateRememberSession() {
    localStorage.setItem('remember_session', !RememberSession)
    SetRememberSession(!RememberSession)
  }

  function updateAgree() {
    localStorage.setItem('agree', !Agree)
    setAgree(!Agree)
  }

  function refreshdata() {
    fetchVehicles();
    fetchBuildings();
    fetchAllianceBuildings();
    fetchAllianceInfo();
  }

  async function fetchVehicles() {
    const fetchVersions = async () => {
      const result = await axios(`${apiUrl}/vehicles/${sessionId}`);
      return result.data;
    };
    fetchVersions().then((r) => setApiVehicles(r))
  }

  async function fetchBuildings() {
    const fetchBuildings = async () => {
      const result = await axios(`${apiUrl}/buildings/${sessionId}`);
      return result.data;
    };
    fetchBuildings().then((r) => setApiBuildings(r))
  }

  async function fetchAllianceBuildings() {
    const fetchAllianceBuildings = async () => {
      const result = await axios(`${apiUrl}/alliancebuildings/${sessionId}`);
      return result.data;
    };
    fetchAllianceBuildings().then((r) => setApiAllianceBuildings(r))
  }

  async function fetchAllianceInfo() {
    const fetchAllianceInfo = async () => {
      const result = await axios(`${apiUrl}/allianceinfo/${sessionId}`);
      return result.data;
    };
    fetchAllianceInfo().then((r) => setApiAllianceInfo(r))
  }

  async function fetchUser() {
    const fetchVersions = async () => {
      const result = await axios(`${apiUrl}/credits/${sessionId}`);
      return result.data;
    };
    fetchVersions().then((r) => {
      if (RememberSession) {
        localStorage.setItem("session", sessionId)
      }
      alert(`Welkom ${r.user_name}`)
    }).catch(function error() {
      alert("Ophalen usergegevens mislukt, probeer opnieuw!\nAls je een oud id gebruikt is deze mogelijk verlopen.")
    });
  }

  useEffect(() => {
    Timer > 0 && setTimeout(() => setTimer(Math.floor((newTimer - new Date()) / 1000)), 1000);
  }, [Timer, newTimer]);

  function SetNewTime() {
    if (Timer > 0) {
      setNewTimer(new Date(new Date().getTime() + 5 * 60 * 1000))
    }
    else {
      setTimer(3)
      setNewTimer(new Date(new Date().getTime() + 5 * 60 * 1000))
    }
  }

  useEffect(() => {
    fetchMissions()

    async function fetchMissions() {
      const fetchMission = async () => {
        const result = await axios("https://raw.githubusercontent.com/Piet2001/Missionfiles-All-Versions/master/Missions/nl_NL.json");
        return result.data;
      };
      fetchMission().then((r) => setMissions(r));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Layout
              refresh={refreshdata}
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <Home
                setInputValue={setSessionId}
                GetData={LoadData}
                template={sessionId}
                agree={Agree}
                updateAgree={updateAgree}
                rememberSession={RememberSession}
                updateRememberSession={updateRememberSession}
              />
            </Layout>}
        />

        <Route
          path='/login/*'
          element={
            <Layout
              refresh={refreshdata}
            >
              <Login
                setInputValue={setSessionId}
                GetData={LoadData}
                template={sessionId}
                agree={Agree}
                setAgree={setAgree}
              />
            </Layout>}
        />

        <Route
          path='/vehicles'
          element={
            <Layout
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <Vehicles
                vehicleData={ApiVehicles}
              />
            </Layout>
          } />

        <Route
          path='/buildings'
          element={
            <Layout
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <Buildings
                buildingsData={ApiBuildings}
              />
            </Layout>
          } />

        <Route
          path='/buildings/specialisations'
          element={
            <Layout
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <BuildingSpecialisations
                buildingsData={ApiBuildings}
              />
            </Layout>
          } />

        <Route
          path='/buildings/hospitals'
          element={
            <Layout
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <Hospitals
                buildingsData={ApiBuildings}
              />
            </Layout>
          } />

        <Route
          path='/buildings/cells'
          element={
            <Layout
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <Cells
                buildingsData={ApiBuildings}
              />
            </Layout>
          } />

        <Route
          path='/allianceinfo'
          element={
            <Layout
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <AllianceInfo
                allianceInfoData={ApiAllianceInfo}
              />
            </Layout>
          } />

        <Route
          path='/alliancebuildings'
          element={
            <Layout
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <AllianceBuildings
                allianceBuildingsData={ApiAllianceBuildings}
              />
            </Layout>
          } />

        <Route
          path='/alliancebuildings/hospitals'
          element={
            <Layout
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <AllianceHospitals
                allianceBuildingsData={ApiAllianceBuildings}
              />
            </Layout>
          } />

        <Route
          path='/alliancebuildings/cells'
          element={
            <Layout
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <AllianceCells
                allianceBuildingsData={ApiAllianceBuildings}
              />
            </Layout>
          } />

        <Route
          path='/progressdata'
          element={
            <Layout
              loggedIn={loggedIn}
              countdownGoal={Timer}
            >
              <Progressdata
                Buildings={ApiBuildings}
                AllianceBuildings={ApiAllianceBuildings}
              />
            </Layout>
          } />

        <Route
          path='/credits'
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <Credits />
            </Layout>
          } />

        <Route
          path='/voorwaarden'
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <Voorwaarden />
            </Layout>
          } />

        <Route
          path='/privacy'
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <Privacy />
            </Layout>
          } />

        <Route
          path='suggestions'
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <Suggestions />
            </Layout>
          } />

        <Route
          path='information'
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <Information />
            </Layout>
          } />

        <Route
          path='information/awards'
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <Awards />
            </Layout>
          } />

        <Route
          path='information/poi'
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <Poi />
            </Layout>
          } />

        <Route
          path='information/alliancemissions'
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <AllianceMissions />
            </Layout>
          } />

        <Route
          path='information/alliance_events'
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <AllianceEvents missions={missions} />
            </Layout>
          } />

        <Route
          path='information/missions'
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <Missions missions={missions} />
            </Layout>
          } />

        <Route
          path="*"
          element={
            <Layout
              loggedIn={loggedIn}
            >
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
