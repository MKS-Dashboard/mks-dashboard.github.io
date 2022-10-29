import React, { useState, useEffect } from 'react'
import axios from "axios"
import { lists_games } from '../../Lists/games';
import Loading from '../Default/Loading';
import { lists_translations_credits } from '../../Lists/translations';


function Credits() {

    const [VersionsList, setVersions] = useState([]);
    const [LastUpdate, setLastUpdate] = useState(new Date(1, 1, 1))
    const [orderby, setOrderBy] = useState("avg")
    const [orderDesc, setOrderDesc] = useState(true)
    const [language, setLanguage] = useState("nl_NL")

    useEffect(() => {
        fetchLastUpdate()

        async function fetchLastUpdate() {
            const fetchUpdate = async () => {
                const result = await axios("https://api.github.com/repos/Piet2001/Missionfiles-All-Versions/branches/master");
                return new Date(result.data.commit.commit.author.date);
            };
            fetchUpdate().then((r) => setLastUpdate(r));
        }

        update(lists_games)

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

    const handleLanguageChange = event => {
        setLanguage(event.target.value)
    };

    console.log(lists_translations_credits[0][language])

    return (

        <div id="Container">
            <div className='language'>
                {lists_translations_credits[0][language].language}: <select id="language" name="taal" onChange={handleLanguageChange}>
                    <option value="nl_NL">Nederlands</option>
                    <option value="en_EN">English</option>
                </select>
            </div>
            {lists_translations_credits[0][language].pagedescription}<br />
            {lists_translations_credits[0][language].lastupdate}: {LastUpdate.toLocaleString()}


            <br /><br />
            {(() => {
                if (VersionsList.length > 0) {
                    return (
                        <table className="table" id="Tabel">
                            <thead>
                                <tr>
                                    <th>{lists_translations_credits[0][language].place}</th>
                                    <th onClick={() => UpdateOrder("code")}>Locale</th>
                                    <th onClick={() => UpdateOrder("missions")}>{lists_translations_credits[0][language].amountmissions}</th>
                                    <th onClick={() => UpdateOrder("avg")}>{lists_translations_credits[0][language].averagemissions}</th>
                                    <th onClick={() => UpdateOrder("plannedMissions")}>{lists_translations_credits[0][language].planned}</th>
                                    <th onClick={() => UpdateOrder("plannedAvg")}>{lists_translations_credits[0][language].plannedavg}</th>
                                    <th onClick={() => UpdateOrder("allianceMissions")}>{lists_translations_credits[0][language].alliance}</th>
                                    <th onClick={() => UpdateOrder("allianceMissionsAvg")}>{lists_translations_credits[0][language].allianceavg}</th>
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
                                                    <td>{version.avg.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td>{version.plannedMissions.toLocaleString()}</td>
                                                    <td>{version.plannedAvg.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td>{version.allianceMissions.toLocaleString()}</td>
                                                    <td>{version.allianceMissionsAvg.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
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
                        < Loading />
                    )
                }
            })()}

        </div>
    )
}

export default Credits
