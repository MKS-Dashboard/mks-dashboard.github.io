import React, { useState, useEffect } from 'react'
import { axios } from "axios"
import { lists_poi } from '../../Lists/poi';

function Poi() {

    const [missions, setMissions] = useState([])

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
                        lists_poi.sort((a, b) => (a.name > b.name) ? 1 : -1)
                        return (
                            lists_poi.map((poi) => {
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