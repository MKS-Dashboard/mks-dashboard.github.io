import React, { useState, useEffect } from 'react'
import axios from "axios"
import { ExcludedMissionKeysAllianceMissions } from '../../Lists/missions';

function AllianceMissions() {
    const [missionTemplate, setMissionTemplate] = useState([])
    const [allianceMissions, setAllianceMissions] = useState([])

    useEffect(() => {
        fetchMissionsTemplate()

        async function fetchMissionsTemplate() {
            const fetchMissionTemplate = async () => {
                const result = await axios("https://raw.githubusercontent.com/MKS-Dashboard/datafiles/main/Information/codeTranslations.json");
                return result.data;
            };
            fetchMissionTemplate().then((r) => setMissionTemplate(r));
        }

        fetchAllianceMissions()

        async function fetchAllianceMissions() {
            const fetchMission = async () => {
                const result = await axios("https://raw.githubusercontent.com/Piet2001/Missionfiles-All-Versions/master/Missions/nl_NL.json");
                return result.data.filter(mission => mission.additional.only_alliance_mission === true);
            };
            fetchMission().then((r) => setAllianceMissions(r));
        }
    }, []);


    return (
        <div id="Container">
            Het spel bevat momenteel de volgende teaminzetten<br />


            {(() => {
                return (
                    allianceMissions.map((mission) => {

                        let requirements = [];
                        for (var key in mission.requirements) {
                            var value = mission.requirements[key];
                            requirements.push({ a: key, b: value })
                        }

                        let additional = []
                        for (var key2 in mission.additional) {
                            var value2 = mission.additional[key2];
                            additional.push({ a: key2, b: value2 })
                        }

                        let chances = []
                        for (var key3 in mission.chances) {
                            var value3 = mission.chances[key3];
                            chances.push({ a: key3, b: value3 })
                        }

                        requirements.sort((a, b) => (a.b < b.b) ? 1 : -1)
                        return (
                            <>
                                <h1>{mission.id.toLocaleString()} - {mission.name}</h1>
                                <p>
                                    Credits: {mission.average_credits.toLocaleString()}<br />
                                    Benodigdheden:<br />
                                    {(() => {
                                        return (
                                            requirements.map((req) => {
                                                return (
                                                    <li>{`${req.b.toLocaleString()} ${req.b === 1 ? (missionTemplate[0].requirements[req.a] !== undefined ? missionTemplate[0].requirements[req.a].one : req.a) : (missionTemplate[0].requirements[req.a] !== undefined ? missionTemplate[0].requirements[req.a].more : req.a)}`}</li>
                                                )
                                            }
                                            ))
                                    })()}
                                    <br />
                                    Overig:
                                    {(() => {
                                        return (
                                            additional.map((add) => {
                                                if (ExcludedMissionKeysAllianceMissions.includes(add.a)) {
                                                    return (
                                                        ""
                                                    )
                                                }
                                                return (
                                                    <li>{`${missionTemplate[0].additional[add.a] !== undefined ? missionTemplate[0].additional[add.a] : add.a}: ${add.b}`}</li>
                                                )
                                            }
                                            ))
                                    })()}
                                    <br />
                                    Kansen:
                                    {(() => {
                                        return (
                                            chances.map((chance) => {
                                                if (ExcludedMissionKeysAllianceMissions.includes(chance.a)) {
                                                    return (
                                                        ""
                                                    )
                                                }
                                                return (
                                                    <li>{`${missionTemplate[0].chances[chance.a] !== undefined ? missionTemplate[0].chances[chance.a] : chance.a}: ${chance.b}%`}</li>
                                                )
                                            }
                                            ))
                                    })()}
                                </p>
                            </>

                        )
                    }
                    ))
            })()}
        </div>
    )
}

export default AllianceMissions