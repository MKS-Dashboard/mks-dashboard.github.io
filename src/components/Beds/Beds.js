import React, { useState, useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import "./Beds.css";

function Beds(props) {

    const [totalBedsUser, setTotalBedsUser] = useState();
    const [usedBedsUser, setUsedbedsUser] = useState();
    const [totalBedsTeam, setTotalBedsTeam] = useState();
    const [usedBedsTeam, setUsedbedsTeam] = useState();

    useEffect(() => {
        var ziekenhuizen = props.Buildings.filter(building => building.building_type === 2)
        let totalOwn = 0
        let OwnUsed = 0
        for (var i = 0; i < ziekenhuizen.length; i++) {
            totalOwn += 10 + ziekenhuizen[i].level
            OwnUsed += ziekenhuizen[i].patient_count
        }
        setTotalBedsUser(totalOwn)
        setUsedbedsUser(OwnUsed)

        var TeamZiekenhuizen = props.AllianceBuildings.filter(building => building.building_type === 2)
        let totalTeam = 0
        let TeamUsed = 0
        for (var j = 0; j < TeamZiekenhuizen.length; j++) {
            totalTeam += 10 + TeamZiekenhuizen[j].level
            TeamUsed += TeamZiekenhuizen[j].patient_count
        }
        setTotalBedsTeam(totalTeam)
        setUsedbedsTeam(TeamUsed)

    }, [props.Buildings, props.AllianceBuildings]);

    return (
        <div id="Container">
            <h2>Hieronder vind je informatie over de bedden van ziekenhuizen</h2>
            <br /><br />
            Eigen ({(usedBedsUser / totalBedsUser * 100).toFixed(2)}% in gebruik):
            <ProgressBar>
                <ProgressBar animated striped variant="danger" now={usedBedsUser} key={1} min={0} max={totalBedsUser} label={usedBedsUser?.toLocaleString()} />
                <ProgressBar animated striped variant="success" now={totalBedsUser - usedBedsUser} key={2} min={0} max={totalBedsUser} label={(totalBedsUser - usedBedsUser)?.toLocaleString()} />
            </ProgressBar>

            <br /><br />
            Team ({(usedBedsTeam / totalBedsTeam * 100).toFixed(2)}% in gebruik):
            <ProgressBar>
                <ProgressBar animated striped variant="danger" now={usedBedsTeam} key={1} min={0} max={totalBedsTeam} label={usedBedsTeam?.toLocaleString()} />
                <ProgressBar animated striped variant="success" now={totalBedsTeam - usedBedsTeam} key={2} min={0} max={totalBedsTeam} label={(totalBedsTeam - usedBedsTeam)?.toLocaleString()} />
            </ProgressBar>

        </div>
    );
}

export default Beds;
