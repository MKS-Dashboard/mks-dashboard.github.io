import React, { useState, useEffect } from 'react'
import Loading from "../Default/Loading";

function Hospitals(props) {
    const [hospitals, setHospitals] = useState([])
    const [hospitalsOrdered, setHospitalsOrdered] = useState([])
    const [orderby, setOrderBy] = useState("caption")
    const [orderDesc, setOrderDesc] = useState(false)

    function UpdateOrder(column) {
        if (orderby !== column) {
            setOrderBy(column)
            setOrderDesc(true)
        }
        else if (orderby === column) {
            setOrderDesc(!orderDesc)
        }
        OrderHospitals()
    }

    function OrderHospitals() {
        if (!orderDesc) {
            setHospitalsOrdered(hospitals.sort((a, b) => (a[orderby] > b[orderby]) ? 1 : -1))
        }
        else {
            setHospitalsOrdered(hospitals.sort((a, b) => (a[orderby] < b[orderby]) ? 1 : -1))
        }
    }

    useEffect(() => {
        selectHospitals()

        function selectHospitals() {
            var hospitalList = props.buildingsData.filter(b => b.building_type === 2)
            for (let i = 0; i < hospitalList.length; i++) {
                hospitalList[i].beds = 10 +
                    (hospitalList[i].level ?? 0) +
                    (hospitalList[i].extensions.filter(ex => (ex.caption === "Groot ziekenhuis") && ex.available === true).length * 10)
            }
            setHospitals(hospitalList)
            if (hospitalList.length > 0) {
                if (!orderDesc) {
                    setHospitalsOrdered(hospitalList.sort((a, b) => (a[orderby] > b[orderby]) ? 1 : -1))
                }
                else {
                    setHospitalsOrdered(hospitalList.sort((a, b) => (a[orderby] < b[orderby]) ? 1 : -1))
                }
            }
        }

    }, [props.buildingsData, orderDesc, orderby]);

    return (
        <div id="Container">
            {(() => {
                if (hospitals.length > 0) {

                    return (
                        <>
                            {(() => {
                                return (
                                    <>
                                        <h2> Ziekenhuizen ({hospitalsOrdered.length.toLocaleString()})</h2>
                                        <table className="table" id="Tabel">
                                            <thead>
                                                <tr>
                                                    <th onClick={() => UpdateOrder("caption")}>Naam</th>
                                                    <th onClick={() => UpdateOrder("beds")}>Bedden</th>
                                                    <th onClick={() => UpdateOrder("patient_count")}>Bedden bezet</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {(() => {
                                                    return (
                                                        hospitalsOrdered.map((building) => {
                                                            return (
                                                                <tr key={building.id}>
                                                                    <td>{building.caption}</td>
                                                                    <td>{building.beds}</td>
                                                                    <td>{building.patient_count}</td>
                                                                </tr>
                                                            )
                                                        }
                                                        ))
                                                })()}
                                            </tbody>
                                        </table>

                                    </>
                                )
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

export default Hospitals