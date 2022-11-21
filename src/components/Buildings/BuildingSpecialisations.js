import React, { useState, useEffect } from "react";
import { lists_BuildingSpecialisations } from "../../Lists/buildings";
import Loading from "../Default/Loading";

function BuildingSpecialisations(props) {

    const [specialisations, setSpecialisations] = useState([])

    useEffect(() => {
        updateSpecialisations(lists_BuildingSpecialisations)
        async function updateSpecialisations(data) {
            var buildingData = props.buildingsData.filter(b => b.hasOwnProperty('specialization'))

            for (let m = 0; m < data.length; m++) {
                data[m].buildings = buildingData.filter(building => building.specialization.type === data[m].type)
            }
            setSpecialisations(data)
        }

    }, [props.buildingsData,]);

    return (
        <div id="Container">
            Je bevind je nu op de specialisaties pagina.
            {(() => {
                if (specialisations.length > 0) {
                    var specialisatiesinbezit = specialisations.filter(s => s.buildings.length > 0)
                    return (
                        <>
                            {(() => {
                                return (
                                    specialisatiesinbezit.map((specialisation) => {
                                        return (
                                            <>
                                                <h2> {specialisation.name} ({specialisation.buildings.length.toLocaleString()})</h2>
                                                <table className="table" id="Tabel">
                                                    <thead>
                                                        <tr>
                                                            <th>Gebouw ID</th>
                                                            <th>Naam</th>
                                                            <th>Actief</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {(() => {
                                                            return (
                                                                specialisation.buildings.map((building) => {
                                                                    return (
                                                                        <tr key={building.id}>
                                                                            <td>{building.id}</td>
                                                                            <td>{building.caption}</td>
                                                                            <td>{building.specialization.active? 'Ja' : 'Nee'}</td>
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
                            })()}

                        </>
                    )
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

export default BuildingSpecialisations
