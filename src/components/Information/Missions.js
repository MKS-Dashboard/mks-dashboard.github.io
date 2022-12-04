import React from 'react'
import { lists_Codetranslations, lists_ExcludedMissionKeysMissions } from '../../Lists/missions';
import Loading from '../Default/Loading';

function Missions(props) {
    const missions = props.missions;
    return (
        <div id="Container">
            Het spel bevat momenteel de volgende inzetten<br />

            {(() => {
                if (missions.length > 0 && lists_Codetranslations.length > 0) {
                    return (
                        <>
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
                                            missions.map((mission) => {
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
                else {
                    return (
                        <Loading />
                    )
                }
            })()}

        </div >
    )
}

export default Missions

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
    additional.sort((a, b) => (a.b < b.b) ? 1 : -1)
    chances.sort((a, b) => (a.b < b.b) ? 1 : -1)
    return (
        <>
            <p>
                Credits: {(mission.average_credits ?? 0).toLocaleString()}<br />
                {(() => {
                    if (requirements.filter(item => !lists_ExcludedMissionKeysMissions.includes(item.a)).length > 0) {
                        return (
                            <>Benodigdheden:</>
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
