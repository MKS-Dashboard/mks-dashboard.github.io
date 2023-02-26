import React, { useState, useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { lists_Schools } from '../../Lists/buildings';
import Loading from '../Default/Loading';
import "./Progressdata.css";

function Progressdata(props) {

    const [totalBedsUser, setTotalBedsUser] = useState();
    const [usedBedsUser, setUsedbedsUser] = useState();
    const [totalBedsTeam, setTotalBedsTeam] = useState();
    const [usedBedsTeam, setUsedbedsTeam] = useState();
    const [totalCellsUser, setTotalCellsUser] = useState();
    const [usedCellsUser, setUsedCellsUser] = useState();
    const [totalCellsTeam, setTotalCellsTeam] = useState();
    const [usedCellsTeam, setUsedCellsTeam] = useState();
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        var ziekenhuizen = props.Buildings.filter(building => building.building_type === 2)
        let totalOwn = 0
        let OwnUsed = 0
        for (var i = 0; i < ziekenhuizen.length; i++) {
            totalOwn += 10 + ziekenhuizen[i].level
            OwnUsed += ziekenhuizen[i].patient_count ?? 0
        }
        setTotalBedsUser(totalOwn)
        setUsedbedsUser(OwnUsed)

        var TeamZiekenhuizen = props.AllianceBuildings.filter(building => building.building_type === 2)
        let totalTeam = 0
        let TeamUsed = 0
        for (var j = 0; j < TeamZiekenhuizen.length; j++) {
            totalTeam += 10 + TeamZiekenhuizen[j].level
            TeamUsed += TeamZiekenhuizen[j].patient_count ?? 0
        }
        setTotalBedsTeam(totalTeam)
        setUsedbedsTeam(TeamUsed)

        var politie = props.Buildings.filter(building => building.building_type === 5)
        let totalCelOwn = 0
        let OwnCelUsed = 0
        for (var k = 0; k < politie.length; k++) {
            totalCelOwn += politie[k].extensions.filter(ex => (ex.caption === "Gevangeniscel" || ex.caption === "Extra cel") && ex.available === true).length
            OwnCelUsed += politie[k].prisoner_count ?? 0
        }
        setTotalCellsUser(totalCelOwn)
        setUsedCellsUser(OwnCelUsed)

        var TeamCellen = props.AllianceBuildings.filter(building => building.building_type === 12)
        let totalCellTeam = 0
        let TeamCellUsed = 0
        for (var l = 0; l < TeamCellen.length; l++) {
            totalCellTeam += 10 + TeamCellen[l].extensions.filter(ex => (ex.caption === "Gevangeniscel" || ex.caption === "Extra cel") && ex.available === true).length
            TeamCellUsed += TeamCellen[l].prisoner_count ?? 0
        }
        setTotalCellsTeam(totalCellTeam)
        setUsedCellsTeam(TeamCellUsed)

        for (let m = 0; m < lists_Schools.length; m++) {
            var schoolOfType = props.Buildings.filter(building => building.building_type === lists_Schools[m].building_id)
            var classes = 0
            var classes_used = 0
            for (var a = 0; a < schoolOfType.length; a++) {
                classes += (schoolOfType[a].extensions.filter(ex => (ex.caption === "Extra klaslokaal") && ex.available === true).length + 1)
                classes_used += (schoolOfType[a].schoolings.length)
            }

            var allianceSchoolOfType = props.AllianceBuildings.filter(building => building.building_type === lists_Schools[m].building_id)
            var allianceClasses = 0
            var allianceClasses_used = 0
            for (var b = 0; b < allianceSchoolOfType.length; b++) {
                allianceClasses += (allianceSchoolOfType[b].extensions.filter(ex => (ex.caption === "Extra klaslokaal") && ex.available === true).length + 1)
                allianceClasses_used += (allianceSchoolOfType[b].schoolings.length)
            }

            lists_Schools[m].classes = classes ?? 0;
            lists_Schools[m].classes_used = classes_used ?? 0
            lists_Schools[m].allianceClasses = allianceClasses ?? 0
            lists_Schools[m].allianceClasses_used = allianceClasses_used ?? 0
        }

        setSchools(lists_Schools)

    }, [props.Buildings, props.AllianceBuildings]);

    return (
        <div id="Container">
            <h4>Hieronder vind je informatie over de bedden van ziekenhuizen</h4>

            {(() => {
                if (props.Buildings.length > 0 && props.AllianceBuildings.length > 0) {
                    return (
                        <>
                            Eigen ({(usedBedsUser / totalBedsUser * 100).toFixed(2)}% in gebruik):
                            <ProgressBar>
                                <ProgressBar animated striped variant="danger" now={usedBedsUser} key={1} min={0} max={totalBedsUser} label={usedBedsUser?.toLocaleString()} />
                                <ProgressBar animated striped variant="success" now={totalBedsUser - usedBedsUser} key={2} min={0} max={totalBedsUser} label={(totalBedsUser - usedBedsUser)?.toLocaleString()} />
                            </ProgressBar>
                            Team ({(usedBedsTeam / totalBedsTeam * 100).toFixed(2)}% in gebruik):
                            <ProgressBar>
                                <ProgressBar animated striped variant="danger" now={usedBedsTeam} key={1} min={0} max={totalBedsTeam} label={usedBedsTeam?.toLocaleString()} />
                                <ProgressBar animated striped variant="success" now={totalBedsTeam - usedBedsTeam} key={2} min={0} max={totalBedsTeam} label={(totalBedsTeam - usedBedsTeam)?.toLocaleString()} />
                            </ProgressBar>
                            <br />
                            <h4>Hieronder vind je informatie over de cellen</h4>
                            Eigen ({(usedCellsUser / totalCellsUser * 100).toFixed(2)}% in gebruik):
                            <ProgressBar>
                                <ProgressBar animated striped variant="danger" now={usedCellsUser} key={1} min={0} max={totalCellsUser} label={usedCellsUser?.toLocaleString()} />
                                <ProgressBar animated striped variant="success" now={totalCellsUser - usedCellsUser} key={2} min={0} max={totalCellsUser} label={(totalCellsUser - usedCellsUser)?.toLocaleString()} />
                            </ProgressBar>
                            Team ({(usedCellsTeam / totalCellsTeam * 100).toFixed(2)}% in gebruik):
                            <ProgressBar>
                                <ProgressBar animated striped variant="danger" now={usedCellsTeam} key={1} min={0} max={totalCellsTeam} label={usedCellsTeam?.toLocaleString()} />
                                <ProgressBar animated striped variant="success" now={totalCellsTeam - usedCellsTeam} key={2} min={0} max={totalCellsTeam} label={(totalCellsTeam - usedCellsTeam)?.toLocaleString()} />
                            </ProgressBar>
                            <br />
                            <br />

                            {(() => {
                                if (schools.length > 0) {
                                    return (
                                        <>
                                            <h2>Scholen</h2>
                                            {(() => {
                                                return (
                                                    schools.map((school) => {
                                                        return (
                                                            <>
                                                                <h4>{school.name}</h4>
                                                                Eigen ({(school.classes_used / school.classes * 100).toFixed(2)}% in gebruik): <br />
                                                                <ProgressBar>
                                                                    <ProgressBar animated striped variant="danger" now={school.classes_used} key={1} min={0} max={school.classes} label={school.classes_used?.toLocaleString()} />
                                                                    <ProgressBar animated striped variant="success" now={school.classes - school.classes_used} key={2} min={0} max={school.classes} label={(school.classes - school.classes_used)?.toLocaleString()} />
                                                                </ProgressBar>
                                                                Team ({(school.allianceClasses_used / school.allianceClasses * 100).toFixed(2)}% in gebruik):
                                                                <ProgressBar>
                                                                    <ProgressBar animated striped variant="danger" now={school.allianceClasses_used} key={1} min={0} max={school.allianceClasses} label={school.allianceClasses_used?.toLocaleString()} />
                                                                    <ProgressBar animated striped variant="success" now={school.allianceClasses - school.allianceClasses_used} key={2} min={0} max={school.allianceClasses} label={(school.allianceClasses - school.allianceClasses_used)?.toLocaleString()} />
                                                                </ProgressBar>
                                                            </>
                                                        )
                                                    }))
                                            })()}
                                        </>

                                    )
                                }
                            })()}
                        </>
                    )
                }
                else {
                    return (
                        <Loading loadingtext='Momenteel verzamelen we de data, duurt dit lang? Controleer of je bent ingelogd.' />
                    )
                }

            })()}


        </div>
    );
}

export default Progressdata;
