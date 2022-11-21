import React, { useState, useEffect } from 'react'
import axios from "axios"
import Loading from '../Default/Loading';

const Suggestions = (props) => {

    const [Issues, setIssues] = useState([]);

    useEffect(() => {
        Issues()

        async function Issues() {
            const fetch = async () => {
                const result = await axios("https://api.github.com/repos/MKS-Dashboard/mks-dashboard.github.io/issues");
                return result.data;
            };
            fetch().then((r) => setIssues(r.filter(i => !i.hasOwnProperty('pull_request'))));
        }
    }, []);

    return (
        <div id="Container">
            Hieronder zie je een overzicht van alle github issue's.
            Deze bevatten zowel functie aanvragen als fout meldingen. <br />

            {(() => {
                if (Issues.length > 0) {
                    return (
                        <>
                            <table className="table" id="Tabel">
                                <thead>
                                    <tr>
                                        <th>Nummer</th>
                                        <th>Titel</th>
                                        <th>Labels</th>
                                        <th>Info/reageren</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {(() => {

                                        let IssuesSorted = Issues.sort((a, b) => (a.number > b.number) ? 1 : -1)
                                        return (
                                            IssuesSorted.map((issue) => {
                                                return (
                                                    <tr key={issue.number}>
                                                        <td>{issue.number}</td>
                                                        <td>{issue.title}</td>
                                                        <td>{issue.labels.map(({ name }) => name).join(', ')}</td>
                                                        <td><a href={`https://github.com/MKS-Dashboard/mks-dashboard.github.io/issues/${issue.number}`} target="_blank" rel="noopener noreferrer">Meer info over {issue.number}</a></td>
                                                    </tr>
                                                )
                                            }
                                            ))
                                    })()}
                                </tbody>
                            </table>
                            <br />
                            Mis je nog iets in deze lijst? Meld deze dan <a href="https://github.com/MKS-Dashboard/mks-dashboard.github.io/issues/new" target="_blank" rel="noopener noreferrer">hier.</a>

                            <h3>De volgende punten uit bovenstaande lijst komen live met de volgende update</h3>
                            <table className="table" id="Tabel">
                                <thead>
                                    <tr>
                                        <th>Nummer</th>
                                        <th>Titel</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {(() => {
                                        let nextUpdate = Issues.filter(issue => issue.labels.some(label => label.name === "Next Update"))
                                        return (
                                            nextUpdate.map((issue) => {
                                                return (
                                                    <tr key={issue.number}>
                                                        <td>{issue.number}</td>
                                                        <td>{issue.title}</td>
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
                else {
                    return (
                        <Loading />
                    )
                }

            })()}


        </div>
    )
}

export default Suggestions
