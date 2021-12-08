import React, { useState, useEffect } from "react";
import axios from "axios";
import "./tabellen.css"

function Vehicles(props) {

    const [vehicleTypes, setVehicleTypes] = useState([]);

    useEffect(() => {
        fetchVehicleTemplate()

        async function fetchVehicleTemplate() {
            const fetchVersions = async () => {
                const result = await axios("https://mks-dashboard.github.io/datafiles/vehicles.json");
                return result.data;
            };
            fetchVersions().then((r) => update(r));
        }

        async function update(types) {
            var data = props.vehicleData

            for (let i = 0; i < types.length; i++) {
                types[i].inbezit = data.filter(vehicle => vehicle.vehicle_type === types[i].ID).length
            }

            types.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setVehicleTypes(types)
        }
    }, [props.vehicleData,]);

    return (
        <div id="Container">
            <p>Je bevind je nu op de voertuigen pagina</p>

            <h2> Brandweer </h2>
            <table class="table" id="Brandweer">
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
                                    <tr>
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
                                    <tr>
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
                                    <tr>
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
                                    <tr>
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

            <br /><br />
        </div>
    )
}

export default Vehicles
