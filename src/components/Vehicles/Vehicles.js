import React, { useState, useEffect } from "react";
import { lists_Load_Vehicles } from "../../Lists/loadfiles";
import { lists_additionalVehicleValues, lists_vehicleGroups, lists_Vehicles } from "../../Lists/vehicles";
import Loading from '../Default/Loading';

function Vehicles(props) {

    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleGroups, setVehicleGroups] = useState([]);
    const [additionalValues, setAdditionalvValues] = useState([])

    useEffect(() => {
        update(lists_Vehicles)

        async function update(types) {
            var data = props.vehicleData

            for (let i = 0; i < types.length; i++) {
                types[i].inbezit = data.filter(vehicle => vehicle.vehicle_type === types[i].ID).length
            }

            types.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setVehicleTypes(types)
        }
    }, [props.vehicleData]);

    useEffect(() => {
        updateGroups(lists_vehicleGroups)

        async function updateGroups(groups) {
            var data = props.vehicleData
            for (let i = 0; i < groups.length; i++) {
                let count = 0;
                var types = ""

                for (let j = 0; j < groups[i].vehicles.length; j++) {
                    count += data.filter(vehicle => vehicle.vehicle_type === groups[i].vehicles[j]).length;
                    types += `${vehicleTypes.find(vehicle => vehicle.ID === groups[i].vehicles[j]).name}, `
                }

                groups[i].count = count
                groups[i].types = types

            }

            groups.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setVehicleGroups(groups)
            updateadditionalvalues(lists_additionalVehicleValues)
        }

        async function updateadditionalvalues(additionalvalues) {
            var data = props.vehicleData

            for (var k = 0; k < additionalvalues.length; k++) {
                var amount = 0;

                for (var l = 0; l < additionalvalues[k].Voertuigen.length; l++) {
                    // eslint-disable-next-line
                    var count = data.filter(vehicle => vehicle.vehicle_type === additionalvalues[k].Voertuigen[l].id).length;
                    if (count > 0) {
                        amount += count * additionalvalues[k].Voertuigen[l].amount
                    }
                }

                additionalvalues[k].total = amount
            }

            setAdditionalvValues(additionalvalues)
        }

    }, [props.vehicleData, vehicleTypes])

    return (
        <div id="Container">
            Je bevind je nu op de voertuigen pagina

            {(() => {
                if (vehicleTypes.length > 0 && vehicleGroups.length > 0 && additionalValues.length > 0) {
                    return (
                        <>
                            <h2>Je hebt {props.vehicleData.length.toLocaleString()} voertuigen in totaal.</h2>
                            {(() => {
                                return (
                                    lists_Load_Vehicles.map((load) => {
                                        return (
                                            <>
                                                {(() => {
                                                    var vehicleinbezit = vehicleTypes.filter(vehicle => vehicle.inbezit > 0 && vehicle.categorie === load.vehicle_category)
                                                    if (vehicleinbezit.length > 0) {
                                                        return (
                                                            <>
                                                                <h2> {load.name} ({vehicleTypes.filter(vehicle => vehicle.categorie === load.vehicle_category).reduce(function (prev, cur) {
                                                                    return prev + cur.inbezit;
                                                                }, 0).toLocaleString()}) </h2>
                                                                <table className="table" id={load.table}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Afkorting</th>
                                                                            <th>Omschrijving</th>
                                                                            <th>Aantal</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        {(() => {
                                                                            return (
                                                                                vehicleinbezit.map((vehicle) => {
                                                                                    return (
                                                                                        <tr key={vehicle.ID}>
                                                                                            <td>{vehicle.name}</td>
                                                                                            <td>{vehicle.namelong}</td>
                                                                                            <td>{vehicle.inbezit.toLocaleString()}</td>
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
                                                })()}

                                                {(() => {
                                                    var groepen = vehicleGroups.filter(groep => groep.count > 0 && groep.type === load.vehicle_category)
                                                    if (groepen.length > 0) {
                                                        return (
                                                            <>
                                                                <br />
                                                                <table className="table" id={load.table}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Groep</th>
                                                                            <th>Voertuigen</th>
                                                                            <th>Aantal</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        {(() => {

                                                                            return (
                                                                                groepen.map((groep) => {
                                                                                    return (
                                                                                        <tr key={groep.name}>
                                                                                            <td>{groep.name}</td>
                                                                                            <td>{groep.types}</td>
                                                                                            <td>{groep.count.toLocaleString()}</td>
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
                                                })()}

                                                {(() => {
                                                    var values = additionalValues.filter(value => value.total > 0 && value.type === load.vehicle_category)
                                                    if (values.length > 0) {
                                                        return (
                                                            <>
                                                                <br />
                                                                <table className="table" id={load.table}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Waarde</th>
                                                                            <th>Aantal</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {(() => {
                                                                            return (
                                                                                values.map((value) => {
                                                                                    return (
                                                                                        <tr key={value.name}>
                                                                                            <td>{value.name}</td>
                                                                                            <td>{value.total.toLocaleString()}</td>
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
                                                })()}
                                            </>
                                        )
                                    }))
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

export default Vehicles
