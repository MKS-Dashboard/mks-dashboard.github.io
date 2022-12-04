import React, { useState, useEffect } from 'react'
import axios from "axios";
import { lists_Codetranslations, lists_ExcludedMissionKeysAllianceMissions as lists_ExcludedMissionKeysAllianceEvents } from '../../Lists/missions';
import Loading from '../Default/Loading';

function AllianceEvents(props) {
    const [allianceEvents, setAllianceEvents] = useState([])

    useEffect(() => {
        fetchAllianceEvents()

        async function fetchAllianceEvents() {
            const fetchEvents = async () => {
                const result = await axios("https://raw.githubusercontent.com/Piet2001/Missionfiles-All-Versions/master/Events/nl_NL.json");
                return result.data
            };
            fetchEvents().then((r) => findMissions(r));
        }

        function findMissions(events) {
            for (let i = 0; i < events.length; i++) {
                const missionsInEvent = events[i].mission_type_ids.map(num => { return String(num); })
                events[i].missions = props.missions.filter(m => missionsInEvent.includes(String(m.id)))
            }
            console.log(events)

            setAllianceEvents(events)
        }

    }, [props.missions]);

    return (
        <div id="Container">
            Het spel bevat momenteel de volgende Team events<br />


            {(() => {
                if (allianceEvents.length > 0 && lists_Codetranslations.length > 0) {
                    return (
                        allianceEvents.map((event) => {
                            return (
                                <>
                                    <h2>{event.caption}</h2>
                                    <table className="table" id="MissionTabel">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Naam</th>
                                                <th>Info</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {(() => {
                                                return (
                                                    event.missions.map((mission) => {
                                                        return (
                                                            <tr key={mission.id}>
                                                                <td>{mission.id.toLocaleString()}</td>
                                                                <td>{mission.name.toLocaleString()}</td>
                                                                <td className='allignLeft'>{GetMissionRequirements(mission)}</td>
                                                            </tr>
                                                        )
                                                    }
                                                    ))
                                            })()}
                                        </tbody>
                                    </table>

                                </>
                            )
                        }
                        ))
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

export default AllianceEvents

function GetMissionRequirements(mission) {

    console.log(mission)

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
            <p>
                Credits: {(mission.average_credits ?? 0).toLocaleString()}<br />
                {(() => {
                    if (requirements.filter(item => !lists_ExcludedMissionKeysAllianceEvents.includes(item.a)).length > 0) {
                        return (
                            <>Benodigdheeden:</>
                        )
                    }
                })()}
                {(() => {
                    return (
                        requirements.filter(item => !lists_ExcludedMissionKeysAllianceEvents.includes(item.a)).map((req) => {
                            return (
                                <li>{`${req.b.toLocaleString()} ${req.b === 1 ? (lists_Codetranslations[0].requirements[req.a] !== undefined ? lists_Codetranslations[0].requirements[req.a].one : req.a) : (lists_Codetranslations[0].requirements[req.a] !== undefined ? lists_Codetranslations[0].requirements[req.a].more : req.a)}`}</li>
                            )
                        }
                        ))
                })()}
                {(() => {
                    if (additional.filter(item => !lists_ExcludedMissionKeysAllianceEvents.includes(item.a)).length > 0) {
                        return (
                            <><br />Overige:</>
                        )
                    }
                })()}
                {(() => {
                    return (
                        additional.filter(item => !lists_ExcludedMissionKeysAllianceEvents.includes(item.a)).map((add) => {
                            return (
                                <li>{`${lists_Codetranslations[0].additional[add.a] !== undefined ? lists_Codetranslations[0].additional[add.a] : add.a}: ${add.b}`}</li>
                            )
                        }
                        ))
                })()}
                {(() => {
                    if (chances.filter(item => !lists_ExcludedMissionKeysAllianceEvents.includes(item.a)).length > 0) {
                        return (
                            <> <br />Kansen: </>

                        )
                    }
                })()}
                {(() => {
                    return (
                        chances.filter(item => !lists_ExcludedMissionKeysAllianceEvents.includes(item.a)).map((chance) => {
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