import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiInformationCircle } from "react-icons/hi";

const Home = (props) => {

    const [GitInfo, setGitInfo] = useState({
        "homepage": "homepage",
        "owner": {
            "login": "login"
        }
    });
    const [GitInfoMaster, setGitInfomaster] = useState({
        "commit": {
            "commit": {
                "author": {
                    "date": "2022-06-30T19:12:06Z"
                }
            }
        }
    });
    const [GitInfoDev, setGitInfoDev] = useState({
        "commit": {
            "commit": {
                "author": {
                    "date": "2022-06-30T19:12:06Z"
                }
            }
        }
    });
    const [GitInfoDatafiles, setGitInfoDatafiles] = useState({
        "commit": {
            "commit": {
                "author": {
                    "date": "2022-06-30T19:12:06Z"
                }
            }
        }
    });
    const [Contributors, setContributors] = useState([{ "login": "Piet2001" }])
    const [Stars, setStars] = useState([{ "login": "Piet2001" }])
    const [Code, setCode] = useState({
        "JavaScript": 0,
    })

    useEffect(() => {
        gitInfo()

        async function gitInfo() {
            const fetch = async () => {
                const result = await axios("https://api.github.com/repos/MKS-Dashboard/mks-dashboard.github.io");
                return result.data;
            };
            fetch().then((r) => setGitInfo(r));
        }

        fetchLastUpdate()

        async function fetchLastUpdate() {
            const fetch = async () => {
                const result = await axios("https://api.github.com/repos/MKS-Dashboard/mks-dashboard.github.io/branches/gh-pages");
                return result.data;
            };
            fetch().then((r) => setGitInfomaster(r));
        }

        fetchLastUpdateDEV()

        async function fetchLastUpdateDEV() {
            const fetch = async () => {
                const result = await axios("https://api.github.com/repos/MKS-Dashboard/mks-dashboard.github.io/branches/dev");
                return result.data;
            };
            fetch().then((r) => setGitInfoDev(r));
        }

        fetchLastUpdateDatafiles()

        async function fetchLastUpdateDatafiles() {
            const fetch = async () => {
                const result = await axios("https://api.github.com/repos/MKS-Dashboard/datafiles/branches/main");
                return result.data;
            };
            fetch().then((r) => setGitInfoDatafiles(r));
        }

        fetchContributors()

        async function fetchContributors() {
            const fetch = async () => {
                const result = await axios("https://api.github.com/repos/MKS-Dashboard/mks-dashboard.github.io/contributors");
                return result.data;
            };
            fetch().then((r) => setContributors(r));
        }

        fetchStars()

        async function fetchStars() {
            const fetch = async () => {
                const result = await axios("https://api.github.com/repos/MKS-Dashboard/mks-dashboard.github.io/stargazers");
                return result.data;
            };
            fetch().then((r) => setStars(r));
        }

        fetchCode()

        async function fetchCode() {
            const fetch = async () => {
                const result = await axios("https://api.github.com/repos/MKS-Dashboard/mks-dashboard.github.io/languages");
                return result.data;
            };
            fetch().then((r) => setCode(r));
        }
    }, []);

    return (
        <div id="Container">
            Welkom in het mks-dashboard.<br />
            <br />
            Op deze pagina kun je verschillende gegevens over meldkamerspel vinden.<br />
            Momenteel zijn wij nog bezig met de ontwikkeling hierdoor is het mogelijk dat niet alles werkt zoals het zou moeten.
            En zijn er weinig opties beschikbaar.<br />
            Wanneer meer functies beschikbaar komen ze op deze site.
            <br />
            <br />

            <label>
                <input type="checkbox"
                    defaultChecked={props.agree}
                    onChange={() => props.setAgree(!props.agree)}
                />
                Ik ga akkoord met de <a href="/voorwaarden">Algemene Voorwaarden</a> en <a href="/privacy">Privacyverklaring</a>
            </label>
            <br /><br />
            Uw SessionID van <a href="https://meldkamerspel.com">Meldkamerspel.com</a>:<HiInformationCircle size={15} title={`Chrome/Edge: F12(element inspecteren) --> Application --> Cookies --> _session_id\nFirefox: F12(element inspecteren) --> Storage --> Cookies --> _session_id`} /><br />
            <input name='sessionId' type='password' value={props.template} onChange={e => props.setInputValue(e.target.value)} disabled={!props.agree} />
            <input name='submit' type='submit' value='Gegevens ophalen' onClick={() => props.GetData()} disabled={!props.agree} />

            <br /> <br /> <br /> <br /> <br />

            <h2>Project informatie:</h2>
            Eigenaar: {GitInfo.owner.login} <br />
            URL: {GitInfo.homepage}<br />
            Aangemaakt: {new Date(GitInfo.created_at).toLocaleString()}<br />
            Laatste Live Update: {new Date(GitInfoMaster.commit.commit.author.date).toLocaleString()} <br />
            Laatste Development Update: {new Date(GitInfoDev.commit.commit.author.date).toLocaleString()} <br />
            Laatste Databestanden Update: {new Date(GitInfoDatafiles.commit.commit.author.date).toLocaleString()} <br />
            <br />
            Bijdragers: {Contributors.map(({ login }) => login).join(', ')}<br />
            Supporters (github ster): {Stars.map(({ login }) => login).join(', ')} <br />
            <br />
            Code: <br />
            <table className="table" id="TabelSmall">
                <thead>
                    <tr>
                        <th>Programmeertaal</th>
                        <th>Aantal Regels</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {

                        let array = [];
                        for (var key in Code) {
                            var value = Code[key];
                            array.push({ a: key, b: value })
                        }

                        return (
                            array.map((code) => {
                                return (
                                    <tr key={code.a}>
                                        <td>{code.a}</td>
                                        <td>{code.b.toLocaleString()}</td>
                                    </tr>
                                )
                            }
                            ))
                    })()}
                </tbody>
            </table>


            <br />
        </div >
    )
}

export default Home
