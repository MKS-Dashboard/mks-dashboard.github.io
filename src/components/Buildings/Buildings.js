import React, { useState, useEffect } from "react";
// import axios from "axios";
import { lists_BuildingExtensionsOverview, lists_BuildingInformation } from "../../Lists/buildings";

function Buildings(props) {

    const [buildingTypes, setBuildingTypes] = useState([]);
    const [extensions, setExtensions] = useState([]);

    useEffect(() => {
        update(lists_BuildingInformation)

        async function update(types) {
            var data = props.buildingsData

            for (let j = 0; j < data.length; j++) {
                if (data[j].small_building === true) {
                    var type = types.find(type => type.ID === data[j].building_type)
                    data[j].building_type = type.smallBuildingId
                }
            }

            for (let i = 0; i < types.length; i++) {
                types[i].inbezit = data.filter(building => building.building_type === types[i].ID).length

                if (types[i].LevelCountAsBuilding === true) {
                    types[i].inbezit += data.filter(building => building.building_type === types[i].ID).reduce((n, { level }) => n + level, 0)
                }
            }

            types.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setBuildingTypes(types)
        }

        updateExtensions(lists_BuildingExtensionsOverview)
        async function updateExtensions(data) {
            var buildingData = props.buildingsData

            for (let k = 0; k < data.length; k++) {
                data[k].amount = 0
                for (let l = 0; l < buildingData.length; l++) {
                    data[k].amount += buildingData[l].extensions.filter(extension => extension.caption === data[k].name).length
                }
            }
            setExtensions(data)
        }

    }, [props.buildingsData,]);


    return (
        <div id="Container">
            Je bevind je nu op de gebouwen pagina.

            <h2> Gebouwen ({buildingTypes.reduce(function (prev, cur) {
                return prev + cur.inbezit;
            }, 0).toLocaleString()})</h2>
            <table className="table" id="Tabel">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Aantal</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        var buildingsinbezit = buildingTypes.filter(building => building.inbezit > 0)
                        return (
                            buildingsinbezit.map((building) => {
                                return (
                                    <tr key={building.ID}>
                                        <td>{building.name}</td>
                                        <td>{building.inbezit.toLocaleString()}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>

            <h2> Uitbreidingen ({extensions.reduce(function (prev, cur) {
                return prev + cur.amount;
            }, 0).toLocaleString()})</h2>
            <table className="table" id="Tabel">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Aantal</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {
                        extensions.sort((a, b) => (a.name > b.name) ? 1 : -1)
                        var extensionsinbezit = extensions.filter(ex => ex.amount > 0)

                        return (
                            extensionsinbezit.map((ex) => {
                                return (
                                    <tr key={ex.name}>
                                        <td>{ex.name}</td>
                                        <td>{ex.amount.toLocaleString()}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>
        </div>
    )
}

export default Buildings
