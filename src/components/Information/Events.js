import React, { useState, useEffect } from 'react'
import { lists_Codetranslations, lists_EventMissions, lists_EventMissions_filterkeys, lists_ExcludedMissionKeysMissions } from '../../Lists/missions';
import Loading from '../Default/Loading';

function Events(props) {
    const [events, setEvents] = useState([])
    const [selectedKey, setSelectedKey] = useState("all")
    const [filteredEvents, setFilteredEvents] = useState([])

    useEffect(() => {

        for (let i = 0; i < lists_EventMissions.length; i++) {
            lists_EventMissions[i].missions = props.missions.filter(m => lists_EventMissions[i].mission_ids.includes(m.base_mission_id))
            if (lists_EventMissions[i].missions.length > 0) {
                lists_EventMissions[i].date = lists_EventMissions[i].missions[0].additional.date_start
            }
        }
        setEvents(lists_EventMissions)
        setFilteredEvents(lists_EventMissions.filter(e => e.keys.includes(selectedKey)))

    }, [props.missions, selectedKey]);

    const handleFilterChange = event => {
        setSelectedKey(event.target.value)
        setFilteredEvents(events.filter(e => e.keys.includes(selectedKey)))
    };

    return (
        <div id="Container">
            Filter welke events u wilt zien.<br />

            <div className='keyfilter'>
                <select id="keyfilter" name="filter" onChange={handleFilterChange}>
                    {lists_EventMissions_filterkeys.sort((a, b) => (a.name > b.name) ? 1 : -1).map((key) => {
                        return (
                            <option value={key.key}>{key.name}</option>
                        )
                    })}
                </select>
            </div>

            {(() => {
                if (filteredEvents.length > 0 && lists_Codetranslations.length > 0) {
                    filteredEvents.sort((a, b) => (a.name > b.name) ? 1 : -1)
                    return (
                        filteredEvents.map((event) => {
                            return (
                                <>
                                    <h2>{event.name}</h2>
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

export default Events

function GetMissionRequirements(mission) {

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
                    if (requirements.filter(item => !lists_ExcludedMissionKeysMissions.includes(item.a)).length > 0) {
                        return (
                            <>Benodigdheeden:</>
                        )
                    }
                })()}
                {(() => {
                    return (
                        requirements.filter(item => !lists_ExcludedMissionKeysMissions.includes(item.a)).map((req) => {
                            return (
                                <li>{`${req.b.toLocaleString()} ${req.b === 1 ? (lists_Codetranslations[0].requirements[req.a] !== undefined ? lists_Codetranslations[0].requirements[req.a].one : req.a) : (lists_Codetranslations[0].requirements[req.a] !== undefined ? lists_Codetranslations[0].requirements[req.a].more : req.a)}`}</li>
                            )
                        }
                        ))
                })()}
                {(() => {
                    if (additional.filter(item => !lists_ExcludedMissionKeysMissions.includes(item.a)).length > 0) {
                        return (
                            <><br />Overige:</>
                        )
                    }
                })()}
                {(() => {
                    return (
                        additional.filter(item => !lists_ExcludedMissionKeysMissions.includes(item.a)).map((add) => {
                            return (
                                <li>{`${lists_Codetranslations[0].additional[add.a] !== undefined ? lists_Codetranslations[0].additional[add.a] : add.a}: ${add.b}`}</li>
                            )
                        }
                        ))
                })()}
                {(() => {
                    if (chances.filter(item => !lists_ExcludedMissionKeysMissions.includes(item.a)).length > 0) {
                        return (
                            <> <br />Kansen: </>

                        )
                    }
                })()}
                {(() => {
                    return (
                        chances.filter(item => !lists_ExcludedMissionKeysMissions.includes(item.a)).map((chance) => {
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
