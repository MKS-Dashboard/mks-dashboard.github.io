import React, { useState, useEffect } from 'react'
import Loading from "../Default/Loading";

function AllianceCells(props) {
    const [cells, setCells] = useState([])
    const [cellsOrdered, setCellsOrdered] = useState([])
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
        OrderCells()
    }

    function OrderCells() {
        if (!orderDesc) {
            setCellsOrdered(cells.sort((a, b) => (a[orderby] > b[orderby]) ? 1 : -1))
        }
        else {
            setCellsOrdered(cells.sort((a, b) => (a[orderby] < b[orderby]) ? 1 : -1))
        }
    }

    useEffect(() => {
        selectCells()

        function selectCells() {
            var CellList = props.allianceBuildingsData.filter(b => b.building_type === 12)
            for (let i = 0; i < CellList.length; i++) {
                CellList[i].cells = CellList[i].extensions.filter(ex => (ex.caption === "Gevangeniscel" || ex.caption === "Extra cel") && ex.available === true).length
            }
            setCells(CellList)
            if (CellList.length > 0) {
                if (!orderDesc) {
                    setCellsOrdered(CellList.sort((a, b) => (a[orderby] > b[orderby]) ? 1 : -1))
                }
                else {
                    setCellsOrdered(CellList.sort((a, b) => (a[orderby] < b[orderby]) ? 1 : -1))
                }
            }
        }

    }, [props.allianceBuildingsData, orderDesc, orderby]);

    return (
        <div id="Container">
            {(() => {
                if (cells.length > 0) {

                    return (
                        <>
                            {(() => {
                                return (
                                    <>
                                        <h2> Team Cellencomplex ({cellsOrdered.length.toLocaleString()})</h2>
                                        <table className="table" id="Tabel">
                                            <thead>
                                                <tr>
                                                    <th onClick={() => UpdateOrder("caption")}>Naam</th>
                                                    <th onClick={() => UpdateOrder("cells")}>Cellen</th>
                                                    <th onClick={() => UpdateOrder("prisoner_count")}>Bedden bezet</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {(() => {
                                                    return (
                                                        cellsOrdered.map((building) => {
                                                            return (
                                                                <tr key={building.id}>
                                                                    <td>{building.caption}</td>
                                                                    <td>{building.cells}</td>
                                                                    <td>{building.prisoner_count}</td>
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

export default AllianceCells;