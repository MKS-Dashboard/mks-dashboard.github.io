import React, { useState, useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
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



    }, [props.Buildings, props.AllianceBuildings]);

    console.log(props.Vehicles.filter(vehicle => vehicle.fms_show === 5))
    console.log(props.Vehicles.filter(vehicle => vehicle.fms_show === 1).length)
    return (
        <div id="Container">
            <h4>Hieronder vind je informatie over de bedden van ziekenhuizen</h4>
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
        </div>
    );
}

export default Progressdata;
