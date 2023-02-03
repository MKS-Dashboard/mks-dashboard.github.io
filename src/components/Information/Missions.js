import React, { useEffect, useState } from 'react'
import { lists_Codetranslations, lists_ExcludedMissionKeysMissions } from '../../Lists/missions';
import Loading from '../Default/Loading';

function Missions(props) {
    const missions = props.missions;
    const [filteredMissions, setFilteredMissions] = useState(missions)
    const [creditsmin, setCreditsmin] = useState(0)
    const [creditsmax, setCreditsmax] = useState(0)
    const [followup, setfollowup] = useState('null')
    const [subsequent, setSubsequent] = useState('null')
    const [expansion, setExpansion] = useState('null')
    const [guard, setGuard] = useState('null')
    const [alliance, setAlliance] = useState('null')

    useEffect(() => {
        var missionlist = missions
        if (creditsmin > 0)
            missionlist = missionlist.filter(m => m.average_credits > creditsmin)

        if (creditsmax > 0)
            missionlist = missionlist.filter(m => m.average_credits < creditsmax)

        if (followup === 'true')
            missionlist = missionlist.filter(m => m.additional.followup_mission_only) //.followup_mission_only === followup)
        if (followup === 'false')
            missionlist = missionlist.filter(m => !m.additional.followup_mission_only) //.followup_mission_only === followup)

        if (subsequent === 'true')
            missionlist = missionlist.filter(m => m.additional.subsequent_mission_only)
        if (subsequent === 'false')
            missionlist = missionlist.filter(m => !m.additional.subsequent_mission_only)

        if (expansion === 'true')
            missionlist = missionlist.filter(m => m.additional.expansion_mission_only)
        if (expansion === 'false')
            missionlist = missionlist.filter(m => !m.additional.expansion_mission_only)

        if (guard === 'true')
            missionlist = missionlist.filter(m => m.additional.guard_mission)
        if (guard === 'false')
            missionlist = missionlist.filter(m => !m.additional.guard_mission)

        if (alliance === 'true')
            missionlist = missionlist.filter(m => m.additional.only_alliance_mission)
        if (alliance === 'false')
            missionlist = missionlist.filter(m => !m.additional.only_alliance_mission)

        setFilteredMissions(missionlist)
    }, [missions, creditsmin, creditsmax, followup, subsequent, expansion, guard, alliance]);

    return (
        <div id="Container">
            Het spel bevat momenteel de volgende inzetten<br />
            <br />
            Filter inzetten: <br />
            Minimale aantal credits:&nbsp;
            <input name='mincredits' type='number' min="0" onChange={e => setCreditsmin(e.target.value)} /><br />
            Maximale aantal credits:&nbsp;
            <input name='maxcredits' type='number' min="0" onChange={e => setCreditsmax(e.target.value)} /><br />
            Alleen verspreiding:&nbsp;
            <select
                value={followup}
                onChange={e => setfollowup(e.target.value)}>
                <option value='null' >Alle</option>
                <option value='true' >Ja</option>
                <option value='false' >Nee</option>
            </select><br />
            Alleen vervolginzet:&nbsp;
            <select
                value={subsequent}
                onChange={e => setSubsequent(e.target.value)}>
                <option value='null' >Alle</option>
                <option value='true' >Ja</option>
                <option value='false' >Nee</option>
            </select><br />
            Alleen opschaling:&nbsp;
            <select
                value={expansion}
                onChange={e => setExpansion(e.target.value)}>
                <option value='null' >Alle</option>
                <option value='true' >Ja</option>
                <option value='false' >Nee</option>
            </select><br />
            Alleen geplandeinzet:&nbsp;
            <select
                value={guard}
                onChange={e => setGuard(e.target.value)}>
                <option value='null' >Alle</option>
                <option value='true' >Ja</option>
                <option value='false' >Nee</option>
            </select><br />
            Alleen Teaminzet:&nbsp;
            <select
                value={alliance}
                onChange={e => setAlliance(e.target.value)}>
                <option value='null' >Alle</option>
                <option value='true' >Ja</option>
                <option value='false' >Nee</option>
            </select><br />

            <br /><br />
            {(() => {
                if (filteredMissions.length > 0 && lists_Codetranslations.length > 0) {
                    return (
                        <>
                            <h3>Aantal inzetten: {filteredMissions.length.toLocaleString()}</h3>
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
                                            filteredMissions.map((mission) => {
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
                        <Loading loadingtext="Geen meldingen gevonden, probeer overnieuw of verander je filtervoorwaarden" />
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
