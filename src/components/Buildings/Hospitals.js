import React, { useState, useEffect } from 'react'
import Loading from "../Default/Loading";

function Hospitals(props) {
    const [hospitals, setHospitals] = useState([])
    const [orderby, setOrderBy] = useState("caption")
    const [orderDesc, setOrderDesc] = useState(false)

    function UpdateOrder(column) {
        console.log("Update")
        if (orderby !== column) {
            setOrderBy(column)
            setOrderDesc(true)
        }
        else if (orderby === column) {
            setOrderDesc(!orderDesc)
        }
    }

    useEffect(() => {
        selectHospitals()

        function selectHospitals() {
            var hospitalList = props.buildingsData.filter(b => b.building_type === 2)
            for (let i = 0; i < hospitalList.length; i++) {
                hospitalList[i].beds = 10 + (hospitalList[i].level ?? 0)
            }
            setHospitals(hospitalList)
        }

    }, [props.buildingsData,]);

    return (
        <div id="Container">
            {(() => {
                if (hospitals.length > 0) {

                    return (
                        <>
                            {(() => {
                                return (
                                    <>
                                        <h2> Ziekenhuizen ({hospitals.length.toLocaleString()})</h2>
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

                                                    if (!orderDesc) {
                                                        hospitals.sort((a, b) => (a[orderby] > b[orderby]) ? 1 : -1)
                                                    }
                                                    else {
                                                        hospitals.sort((a, b) => (a[orderby] < b[orderby]) ? 1 : -1)
                                                    }

                                                    return (
                                                        hospitals.map((building) => {
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