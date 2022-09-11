import React, { useState, useEffect } from 'react'
import axios from "axios"

function Poi() {

    const [poi, setPoi] = useState([])
    const [missions, setMissions] = useState([])

    useEffect(() => {
        fetchPoi()

        async function fetchPoi() {
            const fetchPoi = async () => {
                const result = await axios("https://mks-dashboard.github.io/datafiles/Information/poi.json");
                return result.data;
            };
            fetchPoi().then((r) => setPoi(r));
        }

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
        <div id="Container">
            Hier vind je alle POI die in het spel zitten met een overzicht van het aantal meldingen dat eraan gekoppeld zitten.<br />

            <table className="table" id="Tabel">
                <thead>
                    <tr>
                        <th>POI</th>
                        <th>Aantal inzetten</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {
                        poi.sort((a, b) => (a.name > b.name) ? 1 : -1)
                        return (
                            poi.map((poi) => {
                                return (
                                    <tr key={poi.name}>
                                        <td>{poi.name.toLocaleString()}</td>
                                        <td>{missions.filter(mission => mission.place_array.includes(poi.name)).length}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>


        </div>
    )
}

export default Poi