import React, { useState, useEffect } from 'react'
import axios from "axios"

function Credits() {

    const [VersionsList, setVersions] = useState([]);
    const [LastUpdate, setLastUpdate] = useState(new Date(1, 1, 1))
    const [orderby, setOrderBy] = useState("avg")
    const [orderDesc, setOrderDesc] = useState(true)

    useEffect(() => {
        fetchLastUpdate()

        async function fetchLastUpdate() {
            const fetchUpdate = async () => {
                const result = await axios("https://api.github.com/repos/Piet2001/Missionfiles-All-Versions/branches/master");
                return new Date(result.data.commit.commit.author.date);
            };
            fetchUpdate().then((r) => setLastUpdate(r));
        }

        fetchVersions()

        async function fetchVersions() {
            const fetchVersions = async () => {
                const result = await axios("https://mks-dashboard.github.io/datafiles/games.json");
                return result.data;
            };
            fetchVersions().then((r) => update(r));
        }

        async function update(versions) {
            for (let i = 0; i < versions.length; i++) {
                var data = await fetch(`https://raw.githubusercontent.com/Piet2001/Missionfiles-All-Versions/master/Missions/${versions[i].code}.json`)
                    .then(response => response.json())
                    .then(data => {
                        return data
                    })
                // amounts
                versions[i].missions = data.filter(mission => mission.additional.only_alliance_mission !== true && mission.additional.guard_mission !== true).length
                versions[i].plannedMissions = data.filter(mission => mission.additional.guard_mission === true).length
                versions[i].allianceMissions = data.filter(mission => mission.additional.only_alliance_mission === true).length

                // averages
                versions[i].avg = (data.filter(mission => mission.additional.only_alliance_mission !== true && mission.additional.guard_mission !== true).reduce((total, next) => total + next.average_credits, 0) / versions[i].missions)
                versions[i].plannedAvg = (data.filter(mission => mission.additional.guard_mission === true).reduce((total, next) => total + next.average_credits, 0) / versions[i].plannedMissions)
                versions[i].allianceMissionsAvg = (data.filter(mission => mission.additional.only_alliance_mission === true).reduce((total, next) => total + next.average_credits, 0) / versions[i].allianceMissions)

            }
            setVersions(versions)
        }
    }, []);

    function UpdateOrder(column) {
        if (orderby !== column) {
            setOrderBy(column)
            setOrderDesc(true)
        }
        else if (orderby === column) {
            setOrderDesc(!orderDesc)
        }
    }

    return (
        <div id="Container">
            Op deze pagina vind je het gemiddelde aantal credits wat een melding in een versie opleverd.<br />
            Laatste update: {LastUpdate.toLocaleString()}
            <br /><br />

            <table className="table" id="Tabel">
                <thead>
                    <tr>
                        <th>Plek</th>
                        <th onClick={() => UpdateOrder("code")}>Locale</th>
                        <th onClick={() => UpdateOrder("missions")}>Aantal inzetten</th>
                        <th onClick={() => UpdateOrder("avg")}>Gemiddelde</th>
                        <th onClick={() => UpdateOrder("plannedMissions")}>Geplande inzetten</th>
                        <th onClick={() => UpdateOrder("plannedAvg")}>Gemiddelde geplandeinzetten</th>
                        <th onClick={() => UpdateOrder("allianceMissions")}>Teaminzetten</th>
                        <th onClick={() => UpdateOrder("allianceMissionsAvg")}>Teaminzetten gemiddelde</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        if (!orderDesc) {
                            VersionsList.sort((a, b) => (a[orderby] > b[orderby]) ? 1 : -1)
                        }
                        else {
                            VersionsList.sort((a, b) => (a[orderby] < b[orderby]) ? 1 : -1)
                        }

                        var count = 0
                        return (
                            VersionsList.map((version) => {
                                count++
                                return (
                                    <tr key={version.code}>
                                        <td>#{count}</td>
                                        <td>{version.code}</td>
                                        <td>{version.missions.toLocaleString()}</td>
                                        <td>{version.avg.toLocaleString(undefined, { minimumfractiondigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td>{version.plannedMissions.toLocaleString()}</td>
                                        <td>{version.plannedAvg.toLocaleString(undefined, { minimumfractiondigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td>{version.allianceMissions.toLocaleString()}</td>
                                        <td>{version.allianceMissionsAvg.toLocaleString(undefined, { minimumfractiondigits: 2, maximumFractionDigits: 2 })}</td>
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

export default Credits
