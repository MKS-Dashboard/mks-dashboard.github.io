import React, { useState, useEffect } from "react";
import axios from "axios";

function Vehicles(props) {

    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleGroups, setVehicleGroups] = useState([]);

    useEffect(() => {
        fetchVehicleTemplate()

        async function fetchVehicleTemplate() {
            const fetchVehicleTemplate = async () => {
                const result = await axios("https://mks-dashboard.github.io/datafiles/vehicles.json");
                return result.data;
            };
            fetchVehicleTemplate().then((r) => update(r));
        }

        async function update(types) {
            var data = props.vehicleData

            for (let i = 0; i < types.length; i++) {
                types[i].inbezit = data.filter(vehicle => vehicle.vehicle_type === types[i].ID).length
            }

            types.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setVehicleTypes(types)
            fetchVehicleGroups()
        }

        async function fetchVehicleGroups() {
            const fetchGroups = async () => {
                const result = await axios("https://mks-dashboard.github.io/datafiles/vehiclegroups.json");
                return result.data;
            };
            fetchGroups().then((r) => updateGroups(r));
        }

        async function updateGroups(groups) {
            var data = props.vehicleData
            for (let i = 0; i < groups.length; i++) {
                //types[i].inbezit = data.filter(vehicle => vehicle.vehicle_type === types[i].ID).length
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
        }


    }, [props.vehicleData, vehicleTypes]);

    return (
        <div id="Container">
            Je bevind je nu op de voertuigen pagina

            <h2> Brandweer </h2>
            <table className="table" id="Brandweer">
                <thead>
                    <tr>
                        <th>Afkorting</th>
                        <th>Omschrijving</th>
                        <th>Aantal</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        var vehicleinbezit = vehicleTypes.filter(vehicle => vehicle.inbezit > 0 && vehicle.categorie === "Brandweer")
                        return (
                            vehicleinbezit.map((vehicle) => {
                                return (
                                    <tr key={vehicle.ID}>
                                        <td>{vehicle.name}</td>
                                        <td>{vehicle.namelong}</td>
                                        <td>{vehicle.inbezit}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>
            <br />
            <table className="table" id="Brandweer">
                <thead>
                    <tr>
                        <th>Groep</th>
                        <th>Voertuigen</th>
                        <th>Aantal</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        var groepen = vehicleGroups.filter(groep => groep.count > 0 && groep.type === "Brandweer")
                        return (
                            groepen.map((groep) => {
                                return (
                                    <tr key={groep.name}>
                                        <td>{groep.name}</td>
                                        <td>{groep.types}</td>
                                        <td>{groep.count}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>

            <h2> Politie </h2>
            <table className="table" id="Politie">
                <thead>
                    <tr>
                        <th>Afkorting</th>
                        <th>Omschrijving</th>
                        <th>Aantal</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        var vehicleinbezit = vehicleTypes.filter(vehicle => vehicle.inbezit > 0 && vehicle.categorie === "Politie")
                        return (
                            vehicleinbezit.map((vehicle) => {
                                return (
                                    <tr key={vehicle.ID}>
                                        <td>{vehicle.name}</td>
                                        <td>{vehicle.namelong}</td>
                                        <td>{vehicle.inbezit}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>
            <br />
            <table className="table" id="Politie">
                <thead>
                    <tr>
                        <th>Groep</th>
                        <th>Voertuigen</th>
                        <th>Aantal</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        var groepen = vehicleGroups.filter(groep => groep.count > 0 && groep.type === "Politie")
                        return (
                            groepen.map((groep) => {
                                return (
                                    <tr key={groep.name}>
                                        <td>{groep.name}</td>
                                        <td>{groep.types}</td>
                                        <td>{groep.count}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>

            <h2> Ambulance </h2>
            <table className="table" id="Ambulance">
                <thead>
                    <tr>
                        <th>Afkorting</th>
                        <th>Omschrijving</th>
                        <th>Aantal</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        var vehicleinbezit = vehicleTypes.filter(vehicle => vehicle.inbezit > 0 && vehicle.categorie === "Ambulance")
                        return (
                            vehicleinbezit.map((vehicle) => {
                                return (
                                    <tr key={vehicle.ID}>
                                        <td>{vehicle.name}</td>
                                        <td>{vehicle.namelong}</td>
                                        <td>{vehicle.inbezit}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>
            <br />
            <table className="table" id="Ambulance">
                <thead>
                    <tr>
                        <th>Groep</th>
                        <th>Voertuigen</th>
                        <th>Aantal</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        var groepen = vehicleGroups.filter(groep => groep.count > 0 && groep.type === "Ambulance")
                        return (
                            groepen.map((groep) => {
                                return (
                                    <tr key={groep.name}>
                                        <td>{groep.name}</td>
                                        <td>{groep.types}</td>
                                        <td>{groep.count}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>

            <h2> KNRM/RB </h2>
            <table className="table" id="Waterredding">
                <thead>
                    <tr>
                        <th>Afkorting</th>
                        <th>Omschrijving</th>
                        <th>Aantal</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        var vehicleinbezit = vehicleTypes.filter(vehicle => vehicle.inbezit > 0 && vehicle.categorie === "Waterredding")
                        return (
                            vehicleinbezit.map((vehicle) => {
                                return (
                                    <tr key={vehicle.ID}>
                                        <td>{vehicle.name}</td>
                                        <td>{vehicle.namelong}</td>
                                        <td>{vehicle.inbezit}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>
            <br />
            <table className="table" id="Waterredding">
                <thead>
                    <tr>
                        <th>Groep</th>
                        <th>Voertuigen</th>
                        <th>Aantal</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        var groepen = vehicleGroups.filter(groep => groep.count > 0 && groep.type === "Waterredding")
                        return (
                            groepen.map((groep) => {
                                return (
                                    <tr key={groep.name}>
                                        <td>{groep.name}</td>
                                        <td>{groep.types}</td>
                                        <td>{groep.count}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>

            <br /><br />
        </div>
    )
}

export default Vehicles
