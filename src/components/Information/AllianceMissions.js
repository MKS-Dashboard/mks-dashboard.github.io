import React, { useState, useEffect } from 'react'
import { Axios } from "axios"
import { lists_Codetranslations, lists_ExcludedMissionKeysAllianceMissions } from '../../Lists/missions';

function AllianceMissions() {
    const [allianceMissions, setAllianceMissions] = useState([])

    useEffect(() => {
        fetchAllianceMissions()

        async function fetchAllianceMissions() {
            const fetchMission = async () => {
                const result = await Axios("https://raw.githubusercontent.com/Piet2001/Missionfiles-All-Versions/master/Missions/nl_NL.json");
                return result.data.filter(mission => mission.additional.only_alliance_mission === true);
            };
            fetchMission().then((r) => setAllianceMissions(r));
        }
    }, []);


    return (
        <div id="Container">
            Het spel bevat momenteel de volgende teaminzetten<br />


            {(() => {
                if (allianceMissions.length > 0 && lists_Codetranslations.length > 0) {
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
                                        {(() => {
                                            if (requirements.filter(item => !lists_ExcludedMissionKeysAllianceMissions.includes(item.a)).length > 0) {
                                                return (
                                                    <>Benodigdheeden:</>
                                                )
                                            }
                                        })()}
                                        {(() => {
                                            return (
                                                requirements.filter(item => !lists_ExcludedMissionKeysAllianceMissions.includes(item.a)).map((req) => {
                                                    return (
                                                        <li>{`${req.b.toLocaleString()} ${req.b === 1 ? (lists_Codetranslations[0].requirements[req.a] !== undefined ? lists_Codetranslations[0].requirements[req.a].one : req.a) : (lists_Codetranslations[0].requirements[req.a] !== undefined ? lists_Codetranslations[0].requirements[req.a].more : req.a)}`}</li>
                                                    )
                                                }
                                                ))
                                        })()}
                                        {(() => {
                                            if (additional.filter(item => !lists_ExcludedMissionKeysAllianceMissions.includes(item.a)).length > 0) {
                                                return (
                                                    <><br />Overige:</>
                                                )
                                            }
                                        })()}
                                        {(() => {
                                            return (
                                                additional.filter(item => !lists_ExcludedMissionKeysAllianceMissions.includes(item.a)).map((add) => {
                                                    return (
                                                        <li>{`${lists_Codetranslations[0].additional[add.a] !== undefined ? lists_Codetranslations[0].additional[add.a] : add.a}: ${add.b}`}</li>
                                                    )
                                                }
                                                ))
                                        })()}
                                        {(() => {
                                            if (chances.filter(item => !lists_ExcludedMissionKeysAllianceMissions.includes(item.a)).length > 0) {
                                                return (
                                                    <> <br />Kansen: </>

                                                )
                                            }
                                        })()}
                                        {(() => {
                                            return (
                                                chances.filter(item => !lists_ExcludedMissionKeysAllianceMissions.includes(item.a)).map((chance) => {
                                                    return (
                                                        <li>{`${lists_Codetranslations[0].chances[chance.a] !== undefined ? lists_Codetranslations[0].chances[chance.a] : chance.a}: ${chance.b}%`}</li>
                                                    )
                                                }
                                                ))
                                        })()}
                                    </p>
                                </>

                            )
                        }
                        ))
                }
                else {
                    return (
                        <p>Momenteel verzamelen wij de data over de inzetten</p>
                    )
                }
            })()}

        </div>
    )
}

export default AllianceMissions