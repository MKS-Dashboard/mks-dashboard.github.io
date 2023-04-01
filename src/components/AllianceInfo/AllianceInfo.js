import React, { useState, useEffect } from 'react'
import Loading from "../Default/Loading";

function AllianceInfo(props) {

    const [alliancedata, setAlliancedata] = useState({})
    const [allianceUsers, setAllianceUsers] = useState([])
    const [allianceUsersOrdered, setAllianceUsersOrdered] = useState([])
    const [orderby, setOrderBy] = useState("name")
    const [orderDesc, setOrderDesc] = useState(false)

    function UpdateOrder(column) {
        if (orderby !== column) {
            setOrderBy(column)
            setOrderDesc(true)
        }
        else if (orderby === column) {
            setOrderDesc(!orderDesc)
        }
        OrderUsers()
    }

    function OrderUsers() {
        if (!orderDesc) {
            setAllianceUsersOrdered(allianceUsers.sort((a, b) => (a[orderby] > b[orderby]) ? 1 : -1))
        }
        else {
            setAllianceUsersOrdered(allianceUsers.sort((a, b) => (a[orderby] < b[orderby]) ? 1 : -1))
        }
    }

    useEffect(() => {
        if (props.allianceInfoData.hasOwnProperty('id')) {
            selectUsers()
        }

        function selectUsers() {
            setAlliancedata(props.allianceInfoData)
            var users = props.allianceInfoData.users
            setAllianceUsers(users)
            if (users.length > 0) {
                if (!orderDesc) {
                    setAllianceUsersOrdered(users.sort((a, b) => (a[orderby] > b[orderby]) ? 1 : -1))
                }
                else {
                    setAllianceUsersOrdered(users.sort((a, b) => (a[orderby] < b[orderby]) ? 1 : -1))
                }
            }
        }

    }, [props.allianceInfoData, orderDesc, orderby]);

    return (
        <div id="Container">
            {(() => {
                if (alliancedata.hasOwnProperty('id')) {

                    return (
                        <>
                            Naam: {alliancedata.name} ({alliancedata.id.toLocaleString()}) <br />
                            Plaats in ranglijst: {alliancedata.rank.toLocaleString()} <br />
                            Totaal verdiende credits: {alliancedata.credits_total.toLocaleString()} <br />
                            Teamkas ingeschakeld: {alliancedata.finance_active ? 'Ja' : 'Nee'} <br />
                            Actuele inhoud teamkas: {alliancedata.credits_current.toLocaleString()} <br /> <br />
                            {(() => {
                                return (
                                    <>
                                        <h2> Teamleden ({allianceUsersOrdered.length.toLocaleString()})</h2>
                                        <table className="table" id="Tabel">
                                            <thead>
                                                <tr>
                                                    <th onClick={() => UpdateOrder("name")}>Naam</th>
                                                    <th>Bijnaam</th>
                                                    <th>Rollen</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {(() => {
                                                    return (
                                                        allianceUsersOrdered.map((user) => {
                                                            return (
                                                                <tr key={user.id}>
                                                                    <td>{user.name}</td>
                                                                    <td>{user.caption}</td>
                                                                    <td>{user.roles.join(', ')}</td>
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

export default AllianceInfo