import React, { useState, useEffect } from "react";
import axios from "axios";

function Buildings(props) {

    const [buildingTypes, setBuildingTypes] = useState([]);

    useEffect(() => {
        fetchBuildingTemplate()

        async function fetchBuildingTemplate() {
            const fetchBuildings = async () => {
                const result = await axios("https://mks-dashboard.github.io/datafiles/buildings.json");
                return result.data;
            };
            fetchBuildings().then((r) => update(r));
        }

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
            }

            types.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setBuildingTypes(types)
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
        </div>
    )
}

export default Buildings
