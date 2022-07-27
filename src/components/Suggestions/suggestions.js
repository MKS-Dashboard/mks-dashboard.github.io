import React, { useState, useEffect } from 'react'
import axios from "axios"

const Suggestions = (props) => {

    const [Issues, setIssues] = useState([{ "number": 0, "title": "Placeholder", "labels": [{ "name": "default" }] }]);

    useEffect(() => {
        Issues()

        async function Issues() {
            const fetch = async () => {
                const result = await axios("https://api.github.com/repos/MKS-Dashboard/mks-dashboard.github.io/issues");
                return result.data;
            };
            fetch().then((r) => setIssues(r));
        }
    }, []);

    return (
        <div id="Container">
            Hieronder zie je een overzicht van alle github issue's.
            Deze bevatten zowel functie aanvragen als fout meldingen. <br />

            <table className="table" id="Tabel">
                <thead>
                    <tr>
                        <th>Nummer</th>
                        <th>Titel</th>
                        <th>Labels</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {

                        Issues.sort((a, b) => (a.number > b.number) ? 1 : -1)
                        return (
                            Issues.map((issue) => {
                                return (
                                    <tr key={issue.number}>
                                        <td>{issue.number}</td>
                                        <td>{issue.title}</td>
                                        <td>{issue.labels.map(({ name }) => name).join(', ')}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>
            <br />
            Mis je nog iets in deze lijst? Meld deze dan <a href="https://github.com/MKS-Dashboard/mks-dashboard.github.io/issues/new" onClick="javascript:window.open('https://github.com/MKS-Dashboard/mks-dashboard.github.io/issues/new','Windows','width=650,height=350,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,directories=no,status=no');return false")">hier.</a>
        </div>
    )
}

export default Suggestions
