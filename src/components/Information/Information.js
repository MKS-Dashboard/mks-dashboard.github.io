import React, { useState, useEffect } from "react";
import { lists_vehicleGroups, lists_Vehicles } from "../../Lists/vehicles";

function Information() {
    const [alarmgroups, setAlarmgroups] = useState([])

    useEffect(() => {
        updateGroups(lists_vehicleGroups.filter(g => g.ignoreByAlarmoverview !== true))

        async function updateGroups(groups) {
            for (let i = 0; i < groups.length; i++) {
                var types = ""

                for (let j = 0; j < groups[i].vehicles.length; j++) {
                    types += `${lists_Vehicles.find(vehicle => vehicle.ID === groups[i].vehicles[j]).name}, `
                }

                groups[i].types = types

            }

            groups.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setAlarmgroups(groups)
        }
    }, [])

    return (
        <div id="Container">
            Welkom in het informatie gedeelte. In de dropdown kunnen verschillende vormen van informatie worden gevonden.<br />
            Heb je bepaalde informatie die je hier graag wilt zien? Meld deze via de suggestiebox en misschien voegen we de informatie spoedig toe.


            {(() => {
                if (alarmgroups.length > 0) {
                    return (
                        <>
                            <h2>Te alarmeren voertuigen:</h2>
                            <br />
                            <table className="table" id={"Rood"}>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Mogelijke teksten missende voertuigen</th>
                                        <th>Voertuigen</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {(() => {

                                        return (
                                            alarmgroups.map((groep) => {
                                                return (
                                                    <tr key={groep.name}>
                                                        <td>{groep.name}</td>
                                                        <td>{groep.texts.join(', ')}</td>
                                                        <td>{groep.types}</td>

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

        </div>
    )
}

export default Information
