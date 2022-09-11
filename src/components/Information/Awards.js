import React from 'react'
import { lists_awards } from '../../Lists/awards'

function Awards() {
    return (
        <div id="Container">
            Hieronder vind je alle awards in het spel en welke doelen er aan verbonden zitten.
            <br />
            <h1>Doorlopende Awards</h1>
            <table className="table" id="Tabel">
                <thead>
                    <tr>
                        <th>Award</th>
                        <th>Brons</th>
                        <th>Zilver</th>
                        <th>Goud</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {
                        let doorlopend = lists_awards.filter(award => award.type === "Doorlopend")
                        doorlopend.sort((a, b) => (a.naam > b.naam) ? 1 : -1)
                        return (
                            doorlopend.map((award) => {
                                return (
                                    <tr key={award.naam}>
                                        <td>{award.naam.toLocaleString()}</td>
                                        <td>{award.brons.toLocaleString()}</td>
                                        <td>{award.zilver.toLocaleString()}</td>
                                        <td>{award.goud.toLocaleString()}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>

            <h1>Eenmalige Awards</h1>
            <table className="table" id="Tabel">
                <thead>
                    <tr>
                        <th>Award</th>
                        <th>Brons</th>
                        <th>Zilver</th>
                        <th>Goud</th>
                    </tr>
                </thead>
                <tbody>

                    {(() => {
                        let doorlopend = lists_awards.filter(award => award.type === "Eenmalig")
                        doorlopend.sort((a, b) => (a.naam > b.naam) ? 1 : -1)
                        return (
                            doorlopend.map((award) => {
                                return (
                                    <tr key={award.naam}>
                                        <td>{award.naam.toLocaleString()}</td>
                                        <td>{award.brons.toLocaleString()}</td>
                                        <td>{award.zilver.toLocaleString()}</td>
                                        <td>{award.goud.toLocaleString()}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>
        </div>
    )
}

export default Awards