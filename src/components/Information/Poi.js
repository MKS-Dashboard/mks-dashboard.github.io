import React, { useState, useEffect } from 'react'
import axios from "axios"
import { lists_poi } from '../../Lists/poi';
import Loading from '../Default/Loading';

function Poi() {

    const [poi, setPoi] = useState([])
    const [orderby, setOrderBy] = useState("name")
    const [orderDesc, setOrderDesc] = useState(false)
    const [poiOrderd, setPoiOrderd] = useState([])

    useEffect(() => {
        fetchMissions()

        async function fetchMissions() {
            const fetchMission = async () => {
                const result = await axios("https://raw.githubusercontent.com/Piet2001/Missionfiles-All-Versions/master/Missions/nl_NL.json");
                return result.data;
            };
            fetchMission().then((r) => getAmount(r));
        }

        async function getAmount(missions) {
            let poi_check = lists_poi;

            for (let i = 0; i < poi_check.length; i++) {
                poi_check[i].used = missions.filter(mission => mission.place_array.includes(poi_check[i].name)).length
            }
            setPoi(poi_check);

            if (!orderDesc) {
                setPoiOrderd(poi_check.sort((a, b) => (a[orderby] > b[orderby]) ? 1 : -1))
            }
            else {
                setPoiOrderd(poi_check.sort((a, b) => (a[orderby] < b[orderby]) ? 1 : -1))
            }
        }
    }, [orderDesc, orderby]);


    function UpdateOrder(column) {
        if (orderby !== column) {
            setOrderBy(column)
            setOrderDesc(true)
        }
        else if (orderby === column) {
            setOrderDesc(!orderDesc)
        }

        if (!orderDesc) {
            setPoiOrderd(poi.sort((a, b) => (a[orderby] > b[orderby]) ? 1 : -1))
        }
        else {
            setPoiOrderd(poi.sort((a, b) => (a[orderby] < b[orderby]) ? 1 : -1))
        }
    }


    return (
        <div id="Container">
            Hier vind je alle POI die in het spel zitten met een overzicht van het aantal meldingen dat eraan gekoppeld zitten.<br />

            {(() => {
                if (poi.length > 0) {
                    return (
                        <table className="table" id="Tabel">
                            <thead>
                                <tr>
                                    <th onClick={() => UpdateOrder("name")}>POI</th>
                                    <th onClick={() => UpdateOrder("used")}>Aantal inzetten</th>
                                </tr>
                            </thead>
                            <tbody>

                                {(() => {
                                    return (
                                        poiOrderd.map((poi) => {
                                            return (
                                                <tr key={poi.name}>
                                                    <td>{poi.name.toLocaleString()}</td>
                                                    <td>{poi.used}</td>
                                                </tr>
                                            )
                                        }
                                        ))
                                })()}
                            </tbody>
                        </table>
                    )
                }
                else {
                    return (
                        <Loading />
                    )
                }
            })()}
        </div>
    )
}

export default Poi